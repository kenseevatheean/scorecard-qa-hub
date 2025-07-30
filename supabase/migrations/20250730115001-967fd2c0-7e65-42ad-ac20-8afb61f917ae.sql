-- Update RLS policies to remove employee access and give admins full permissions

-- Update audit_results policies to include admin with qa_officer and manager permissions
DROP POLICY IF EXISTS "audit_results_basic_access" ON public.audit_results;
CREATE POLICY "audit_results_basic_access" 
ON public.audit_results 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('qa_officer', 'manager', 'admin')
  )
);

-- Update employees policies to include admin with qa_officer and manager permissions
DROP POLICY IF EXISTS "employees_basic_access" ON public.employees;
CREATE POLICY "employees_basic_access" 
ON public.employees 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('qa_officer', 'manager', 'admin')
  )
);

-- Update scorecards policies to include admin permissions
DROP POLICY IF EXISTS "scorecards_delete_policy" ON public.scorecards;
DROP POLICY IF EXISTS "scorecards_insert_policy" ON public.scorecards;
DROP POLICY IF EXISTS "scorecards_update_policy" ON public.scorecards;

CREATE POLICY "scorecards_delete_policy" 
ON public.scorecards 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('qa_officer', 'admin')
  )
);

CREATE POLICY "scorecards_insert_policy" 
ON public.scorecards 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('qa_officer', 'admin')
  )
);

CREATE POLICY "scorecards_update_policy" 
ON public.scorecards 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('qa_officer', 'admin')
  )
);

-- Update the can_edit_scorecards function to include admin
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