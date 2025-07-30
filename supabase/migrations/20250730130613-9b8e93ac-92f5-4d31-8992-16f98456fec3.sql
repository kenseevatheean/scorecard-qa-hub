-- Insert profile data for system users
-- Note: These UUIDs are temporary and will need to be updated when actual users are created through authentication

INSERT INTO public.profiles (id, name, role, department) VALUES
-- Managers
(gen_random_uuid(), 'Yudish Purrnissur', 'manager', 'Senior Management'),
(gen_random_uuid(), 'Ryan Marden', 'manager', 'Senior Management'),
(gen_random_uuid(), 'Nafy Ghunnut', 'manager', 'Senior Management'),
(gen_random_uuid(), 'Roukshar Mayghun', 'manager', 'Senior Management'),
(gen_random_uuid(), 'Amee Mirjane', 'manager', 'Financial Reviews'),
(gen_random_uuid(), 'Atish Aubeeluck', 'manager', 'Customer Support'),
(gen_random_uuid(), 'Yuddish Raghoonundun', 'manager', 'Customer Relations'),
(gen_random_uuid(), 'Kavish Sookatoo', 'manager', 'Trust Deed'),
(gen_random_uuid(), 'Naviyam Mamoodee', 'manager', 'Retentions'),
(gen_random_uuid(), 'Yashiin Bundhoo', 'manager', 'Supervision'),
(gen_random_uuid(), 'Soraj Urjoon', 'manager', 'Customer Support'),
(gen_random_uuid(), 'Sandy Permall', 'manager', 'Variation'),
(gen_random_uuid(), 'Nasima Joomun', 'manager', 'Supervision'),
(gen_random_uuid(), 'Abdur Hosenatly', 'manager', 'Creditor Services'),
(gen_random_uuid(), 'Ashwanee Kurnauth', 'manager', 'Creditor Services'),
(gen_random_uuid(), 'Heydar LALLMAHOMED', 'manager', 'Closures'),

-- QA Officers
(gen_random_uuid(), 'Zakkiyya Jaaruth', 'qa_officer', 'Quality Assurance'),
(gen_random_uuid(), 'Dooshan Hoollah', 'qa_officer', 'Quality Assurance'),
(gen_random_uuid(), 'Yakshineebye Bhewa', 'qa_officer', 'Quality Assurance'),
(gen_random_uuid(), 'Raksha Rambaruth-Emrith', 'qa_officer', 'Quality Assurance'),

-- Admin
(gen_random_uuid(), 'Ken Seevatheean', 'admin', 'Senior Management')

ON CONFLICT (id) DO NOTHING;