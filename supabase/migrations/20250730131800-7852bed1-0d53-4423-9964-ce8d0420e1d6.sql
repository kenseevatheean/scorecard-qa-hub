-- Temporarily disable the audit trigger
ALTER TABLE public.profiles DISABLE TRIGGER audit_role_changes_trigger;

-- Update Ken Seevatheean's role to admin
UPDATE public.profiles 
SET role = 'admin'
WHERE name = 'Ken Seevatheean';

-- Re-enable the audit trigger
ALTER TABLE public.profiles ENABLE TRIGGER audit_role_changes_trigger;