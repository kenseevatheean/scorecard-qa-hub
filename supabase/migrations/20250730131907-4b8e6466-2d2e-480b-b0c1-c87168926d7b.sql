-- Temporarily modify the audit function to handle NULL changed_by
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.role_audit_log (user_id, old_role, new_role, changed_by)
    VALUES (NEW.id, OLD.role::text, NEW.role::text, COALESCE(auth.uid(), NEW.id));
  END IF;
  RETURN NEW;
END;
$function$;

-- Update Ken Seevatheean's role to admin
UPDATE public.profiles 
SET role = 'admin'
WHERE name = 'Ken Seevatheean';

-- Restore the original audit function
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.role_audit_log (user_id, old_role, new_role, changed_by)
    VALUES (NEW.id, OLD.role::text, NEW.role::text, auth.uid());
  END IF;
  RETURN NEW;
END;
$function$;