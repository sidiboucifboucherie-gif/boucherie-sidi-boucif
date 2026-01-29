-- ==========================================
-- BOUCHERIE SIDI BOUCIF - INSERT VOLAILLES & SAUCISSES
-- ==========================================
-- This script adds the poultry and sausage items.
-- It automatically deletes these specific items first to prevent duplicates.
-- ==========================================

DO $$
DECLARE
  v_cat_id bigint;
  s_cat_id bigint;
BEGIN
  -- Get Category IDs (automatically finds the ID for 'volailles' and 'saucisses')
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'volailles';
  SELECT id INTO s_cat_id FROM categories WHERE slug = 'saucisses';

  -- 1. CLEANUP: Delete these specific products if they already exist (to avoid duplicates)
  DELETE FROM products WHERE name IN (
    'Escalope de poulet', 
    'Escalope de dinde', 
    'Brochette de dinde', 
    'Lapin entier',
    'Cuisse de poulet jaune', 
    'Pilon de poulet', 
    'Ailes de dinde',
    'Poulet Pack (Petit)', 
    'Poulet Pack (Grand)',
    'Saucisse Chorizo', 
    'Saucisse au Fromage', 
    'Saucisse Nature'
  );

  -- 2. INSERT VOLAILLES
  INSERT INTO products (name, description, price_cents, category_id, image_url) VALUES
  ('Escalope de poulet', 'Tendre et sans os. Prix au kg.', 1200, v_cat_id, '/images/poulet-fermier.png'),
  ('Escalope de dinde', 'Idéal pour les panures. Prix au kg.', 1200, v_cat_id, '/images/poulet-fermier.png'),
  ('Brochette de dinde', 'Marinées et prêtes à cuire. Prix au kg.', 1500, v_cat_id, '/images/poulet-fermier.png'),
  ('Lapin entier', 'Lapin fermier. Prix à la pièce.', 1500, v_cat_id, '/images/poulet-fermier.png'),
  ('Cuisse de poulet jaune', 'Savoureuse et charnue. Prix au kg.', 600, v_cat_id, '/images/poulet-fermier.png'),
  ('Pilon de poulet', 'Idéal pour le four ou barbecue. Prix au kg.', 700, v_cat_id, '/images/poulet-fermier.png'),
  ('Ailes de dinde', 'Ailes de dinde (Ail). Prix au kg.', 600, v_cat_id, '/images/poulet-fermier.png'),
  ('Poulet Pack (Petit)', 'Poulet entier (900g - 1kg). Prix à la pièce.', 550, v_cat_id, '/images/poulet-fermier.png'),
  ('Poulet Pack (Grand)', 'Poulet entier (1.4kg - 1.5kg). Prix à la pièce.', 950, v_cat_id, '/images/poulet-fermier.png');

  -- 3. INSERT SAUCISSES (Assigned to Saucisses category)
  INSERT INTO products (name, description, price_cents, category_id, image_url) VALUES
  ('Saucisse Chorizo', 'Saucisse épicée. Prix au kg.', 1400, s_cat_id, '/images/Saucisses Maison.png'),
  ('Saucisse au Fromage', 'Saucisse fourrée au fromage. Prix au kg.', 1400, s_cat_id, '/images/Saucisses Maison.png'),
  ('Saucisse Nature', 'Saucisse classique. Prix au kg.', 1400, s_cat_id, '/images/Saucisses Maison.png');

END $$;
