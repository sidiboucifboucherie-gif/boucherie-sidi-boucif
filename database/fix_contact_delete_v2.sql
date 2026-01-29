-- ==========================================
-- BOUCHERIE SIDI BOUCIF - FORCE FIX CONTACT PERMISSIONS (V2)
-- ==========================================
-- This script resets ALL permissions for contact messages to ensure deletion works.
-- Run this in Supabase SQL Editor.
-- ==========================================

-- 1. Ensure RLS is enabled
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop ALL existing policies to avoid conflicts (clean slate)
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete contact messages" ON public.contact_messages;

-- 3. Re-create Policy: ANYONE can send a message
CREATE POLICY "Public can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- 4. Re-create Policy: ONLY ADMINS can view messages
CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 5. Re-create Policy: ONLY ADMINS can delete messages
CREATE POLICY "Admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 6. Safety Check: Ensure your user is definitely an admin
-- (This updates all users to admin again, just to be sure)
UPDATE public.profiles SET role = 'admin';
