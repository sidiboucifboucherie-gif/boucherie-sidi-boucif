-- ==========================================
-- ADMIN ORDER PERMISSIONS (UPDATE & DELETE)
-- ==========================================

-- 1. Allow Admins to UPDATE orders (Change status, payment status)
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 2. Allow Admins to DELETE orders
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
CREATE POLICY "Admins can delete orders" ON public.orders FOR DELETE USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 3. Allow Admins to DELETE order items (Required for Cascade Delete)
DROP POLICY IF EXISTS "Admins can delete order items" ON public.order_items;
CREATE POLICY "Admins can delete order items" ON public.order_items FOR DELETE USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
