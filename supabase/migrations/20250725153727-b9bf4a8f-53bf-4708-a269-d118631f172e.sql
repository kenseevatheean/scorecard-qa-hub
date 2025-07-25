-- Insert Yakshinee Bhewa as a QA Officer in employees table
INSERT INTO employees (name, department, position, status) 
VALUES ('BHEWA Yakshinee', 'Quality', 'QA Officer', 'active');

-- Create auth user for Yakshinee Bhewa
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'bhewa.yakshinee@company.com',
  crypt('qa123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "BHEWA Yakshinee", "department": "Quality", "role": "qa_officer"}'::jsonb
);

-- The trigger will automatically create the profile entry