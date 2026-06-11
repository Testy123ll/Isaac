-- ==========================================================
-- SUPABASE SCHEMA FIX & MANUAL ADMIN USER CREATION FOR PORTFOLIO
-- ==========================================================
-- Paste this entire script into your Supabase Dashboard -> SQL Editor and click RUN.
-- This will:
--   1. Add all missing columns to projects and blog_posts tables.
--   2. Manually register 'admin@testimony.com' with password 'IsaacTestimonyAdmin2026!'
--      (Bypassing email confirmations and rate limits entirely).

-- ==========================================
-- Part 1: Fix Database Tables Schema
-- ==========================================

-- 1. FIX 'projects' TABLE:
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "techStack" TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "liveUrl" TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "caseStudy" JSONB DEFAULT '{}'::jsonb;

-- Sync existing columns if there was any data:
UPDATE projects SET "liveUrl" = live_url WHERE "liveUrl" IS NULL AND live_url IS NOT NULL;
UPDATE projects SET "imageUrl" = image_url WHERE "imageUrl" IS NULL AND image_url IS NOT NULL;
UPDATE projects SET category = niche WHERE category IS NULL AND niche IS NOT NULL;

-- 2. FIX 'blog_posts' TABLE:
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS "readTime" TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;


-- ==========================================
-- Part 2: Manually Create Admin User Account
-- ==========================================

-- 1. Insert user into auth.users (Bypassing SMTP / Email signup flow)
-- Credentials:
--   Email: admin@testimony.com
--   Password: IsaacTestimonyAdmin2026!
INSERT INTO auth.users (
  instance_id,
  id,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'admin@testimony.com',
  crypt('IsaacTestimonyAdmin2026!', gen_salt('bf')),
  now(),
  null,
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- 2. Link identity for the user so login functions properly
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  id,
  json_build_object('sub', id, 'email', email),
  'email',
  now(),
  now(),
  now()
FROM auth.users
WHERE email = 'admin@testimony.com'
ON CONFLICT DO NOTHING;
