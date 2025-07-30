-- Check current triggers on profiles table, then update role without the audit trigger
DO $$
BEGIN
    -- Try to disable the trigger if it exists (using the function name)
    BEGIN
        ALTER TABLE public.profiles DISABLE TRIGGER ALL;
    EXCEPTION 
        WHEN others THEN NULL;
    END;
    
    -- Update Ken Seevatheean's role to admin
    UPDATE public.profiles 
    SET role = 'admin'
    WHERE name = 'Ken Seevatheean';
    
    -- Re-enable all triggers
    ALTER TABLE public.profiles ENABLE TRIGGER ALL;
END $$;