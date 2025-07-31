-- Add user management functionality for admins
-- Add status column to profiles table to enable/disable users
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled'));

-- Create function to disable/enable users (only admins)
CREATE OR REPLACE FUNCTION public.manage_user_status(target_user_id UUID, new_status TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_user_role TEXT;
BEGIN
  -- Check if current user is admin
  SELECT role INTO current_user_role 
  FROM public.profiles 
  WHERE id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can manage user status';
  END IF;
  
  -- Prevent admins from disabling themselves
  IF target_user_id = auth.uid() AND new_status = 'disabled' THEN
    RAISE EXCEPTION 'Cannot disable your own account';
  END IF;
  
  -- Update user status
  UPDATE public.profiles 
  SET status = new_status, updated_at = now()
  WHERE id = target_user_id;
  
  RETURN TRUE;
END;
$$;