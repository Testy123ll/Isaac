-- ==========================================================
-- SUPABASE ANALYTICS DATABASE SCHEMA
-- ==========================================================
-- Paste this entire script into your Supabase Dashboard -> SQL Editor and click RUN.
-- This will:
--   1. Create 'page_views' and 'analytics_events' tables.
--   2. Configure Row-Level Security (RLS) policies allowing public write (insert/update)
--      and authenticated admin read access.

-- 1. Create page_views Table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  url TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  duration_seconds INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create analytics_events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  event_name TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Page Views (Insert & Update by anyone, Select only by Authenticated Admin)
DROP POLICY IF EXISTS "Allow public insert to page_views" ON page_views;
CREATE POLICY "Allow public insert to page_views" 
  ON page_views FOR INSERT TO anon 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to page_views" ON page_views;
CREATE POLICY "Allow public update to page_views" 
  ON page_views FOR UPDATE TO anon 
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated select to page_views" ON page_views;
CREATE POLICY "Allow authenticated select to page_views" 
  ON page_views FOR SELECT TO authenticated 
  USING (true);

-- 5. Create Policies for Analytics Events (Insert by anyone, Select only by Authenticated Admin)
DROP POLICY IF EXISTS "Allow public insert to analytics_events" ON analytics_events;
CREATE POLICY "Allow public insert to analytics_events" 
  ON analytics_events FOR INSERT TO anon 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated select to analytics_events" ON analytics_events;
CREATE POLICY "Allow authenticated select to analytics_events" 
  ON analytics_events FOR SELECT TO authenticated 
  USING (true);

-- 6. Add Indexing for Performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
