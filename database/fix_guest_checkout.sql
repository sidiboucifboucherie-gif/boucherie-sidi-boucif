-- ==========================================
-- BOUCHERIE SIDI BOUCIF - FIX GUEST CHECKOUT
-- ==========================================

-- 1. Orders Table: Allow guests to insert
DROP POLICY IF EXISTS "Users create orders" ON public.orders;
CREATE POLICY "Public create orders" ON public.orders FOR INSERT WITH CHECK (true);

-- 2. Order Items Table: Allow guests to insert
DROP POLICY IF EXISTS "Users create order items" ON public.order_items;
CREATE POLICY "Public create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- 3. Ensure guests can see the products they just ordered (optional, but good for confirmation if we redirect)
-- Actually, for security, we usually don't let guests "SELECT" their orders unless we have a token. 
-- But for INSERT it must be open.

-- 4. Grant usage on sequences (vital for SERIAL/IDENTITY)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
