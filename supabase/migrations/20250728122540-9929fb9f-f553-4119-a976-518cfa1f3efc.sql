-- Fix the handle_new_user function to work with string role values
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Insert a new record in public.profiles when a new user is created in auth.users
    INSERT INTO public.profiles (id, name, role, department, created_at, updated_at)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 
        COALESCE(NEW.raw_user_meta_data->>'role', 'employee'), 
        COALESCE(NEW.raw_user_meta_data->>'department', 'General'),
        now(),
        now()
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
END;
$$;