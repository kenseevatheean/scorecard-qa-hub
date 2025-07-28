-- Insert Ken Seevatheean's profile
INSERT INTO public.profiles (id, name, role, department, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Ken Seevatheean',
  'admin',
  'Administration',
  now(),
  now()
);