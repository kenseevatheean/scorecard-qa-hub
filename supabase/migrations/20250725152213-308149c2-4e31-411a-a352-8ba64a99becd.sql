-- Create initial admin user
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
  'admin@company.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "Admin User", "department": "IT", "role": "admin"}'::jsonb
);

-- Create some initial managers and QA officers
INSERT INTO auth.users (
  id, 
  email, 
  encrypted_password, 
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES 
(
  gen_random_uuid(),
  'john.manager@company.com',
  crypt('manager123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "John Manager", "department": "Sales", "role": "manager"}'::jsonb
),
(
  gen_random_uuid(),
  'sarah.qa@company.com',
  crypt('qa123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "Sarah QA", "department": "Quality", "role": "qa_officer"}'::jsonb
),
(
  gen_random_uuid(),
  'mike.employee@company.com',
  crypt('emp123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "Mike Employee", "department": "Sales", "role": "employee"}'::jsonb
);