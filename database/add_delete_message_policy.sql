-- ==========================================
-- BOUCHERIE SIDI BOUCIF - ADD DELETE MESSAGE PERMISSIONS
-- ==========================================
-- Run this script in the Supabase SQL Editor to allow admins to delete messages.
-- ==========================================

-- Allow ADMINS to delete messages
CREATE POLICY "Admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
