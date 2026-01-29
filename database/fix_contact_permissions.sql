-- ==========================================
-- BOUCHERIE SIDI BOUCIF - FIX CONTACT PERMISSIONS
-- ==========================================
-- Run this script in the Supabase SQL Editor to fix the "Permission Denied" error
-- when sending contact messages.
-- ==========================================

-- 1. Ensure the table has RLS enabled (it should already, but to be safe)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;

-- 3. Allow ANYONE (including guests) to insert messages
CREATE POLICY "Public can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- 4. Allow ADMINS only to view messages
CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 5. Ensure phone column exists (if not already there)
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS phone text;

-- 6. Grant sequence permissions just in case
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
