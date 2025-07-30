-- Phase 2: Fix database security issues

-- Enable RLS on backup tables (if they exist and don't have RLS enabled)
ALTER TABLE public.employees_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_results_backup ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies for backup tables
CREATE POLICY "Only admins can access employees_backup" 
ON public.employees_backup 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can access profiles_backup" 
ON public.profiles_backup 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can access audit_results_backup" 
ON public.audit_results_backup 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Fix database functions by adding proper search_path configuration
CREATE OR REPLACE FUNCTION public.can_edit_scorecards(user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
    user_role text;
BEGIN
    SELECT role INTO user_role 
    FROM public.profiles 
    WHERE id = user_id;
    
    RETURN user_role IN ('qa_officer', 'admin');
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
    -- Insert a new record in public.profiles when a new user is created in auth.users
    INSERT INTO public.profiles (id, name, role, department, created_at, updated_at)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 
        COALESCE(NEW.raw_user_meta_data->>'role', 'employee')::public.user_role,
        COALESCE(NEW.raw_user_meta_data->>'department', 'General'),
        now(),
        now()
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
END;
$function$;

-- Create security definer function for role checking to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 STABLE
 SET search_path = ''
AS $function$
  SELECT role::text FROM public.profiles WHERE id = user_id;
$function$;

-- Create audit log table for role changes
CREATE TABLE IF NOT EXISTS public.role_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  old_role text,
  new_role text NOT NULL,
  changed_by uuid NOT NULL,
  changed_at timestamp with time zone NOT NULL DEFAULT now(),
  reason text
);

-- Enable RLS on audit log
ALTER TABLE public.role_audit_log ENABLE ROW LEVEL SECURITY;

-- Create policy for audit log (admins only)
CREATE POLICY "Only admins can access role audit log" 
ON public.role_audit_log 
FOR ALL 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create trigger function for role change auditing
CREATE OR REPLACE FUNCTION public.audit_role_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.role_audit_log (user_id, old_role, new_role, changed_by)
    VALUES (NEW.id, OLD.role::text, NEW.role::text, auth.uid());
  END IF;
  RETURN NEW;
END;
$function$;

-- Create trigger for role change auditing
DROP TRIGGER IF EXISTS audit_profile_role_changes ON public.profiles;
CREATE TRIGGER audit_profile_role_changes
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_role_changes();