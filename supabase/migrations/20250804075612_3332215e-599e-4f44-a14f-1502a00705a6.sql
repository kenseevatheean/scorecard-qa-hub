-- Fix infinite recursion in profiles table RLS policies
-- Drop all existing policies first
DROP POLICY IF EXISTS "users_can_insert_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_can_view_own_profile" ON public.profiles;  
DROP POLICY IF EXISTS "users_can_update_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users and admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create simple, non-recursive policies
-- Allow users to view all profiles (needed for the app to function)
CREATE POLICY "Allow viewing all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Allow users to insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow users to update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Allow admins to manage all profiles (using auth.users metadata to avoid recursion)
CREATE POLICY "Allow admins to manage all profiles" 
ON public.profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Fix the role_audit_log policy to use auth.users instead of profiles
DROP POLICY IF EXISTS "Only admins can access role audit log" ON public.role_audit_log;
CREATE POLICY "Only admins can access role audit log" 
ON public.role_audit_log 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);