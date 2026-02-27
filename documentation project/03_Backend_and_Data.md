# Backend et Données

## Architecture serveur

Backend sans serveur via Supabase :

- Postgres géré (schéma dans database/schema.sql)
- Row Level Security activé avec politiques par table
- Storage bucket “products” (images publiques)
- Edge Functions Deno :
  - monetico-init : crée les champs signés pour la redirection paiement
  - monetico-webhook : vérifie la signature Monetico et met à jour la commande

## Schéma de base de données

Tables principales :

- profiles
  - id (uuid, PK, = auth.users.id)
  - email, full_name, phone, role ('user'|'admin')
- categories
  - id (bigint), name, slug (unique), description
- products
  - id (bigint), name, description, price_cents, image_url, category_id, is_active, badges[]
- orders
  - id (uuid), user_id, status ('pending','confirmed','shipped','cancelled'), payment_status ('pending','paid','refunded'), total_cents, customer_name, delivery_address, contact_email, contact_phone, notes
- order_items
  - id (bigint), order_id → orders.id, product_id → products.id, quantity, price_cents, product_name
- contact_messages
  - id (bigint), name, email, phone, subject, message, read

Relations clés :

- products.category_id → categories.id
- order_items.order_id → orders.id
- orders.user_id → auth.users.id

RLS (extraits) :

- categories/products visibles par tous, gestion réservée aux admins
- orders : l’utilisateur voit ses propres commandes, les admins voient tout
- contact_messages : insertion publique, lecture admins

## Authentification et rôles

- Auth Supabase standard (email/password, etc.).
- Trigger handle_new_user crée le profil à l’inscription (role par défaut : user).
- isAdmin côté app = profile.role === 'admin' (contrôle d’UI/UX).

## Endpoints (Edge Functions)

1) POST monetico-init

- Chemin : Supabase Edge Function “monetico-init”
- Entrée (JSON) :
  - orderId (uuid), amount (string, ex "12.50"), email, origin (ex window.location.origin), formData (adresse pour contexte_commande)
- Traitement :
  - Construit la chaîne à signer : TPE en premier, puis clés triées alphabétiquement
  - HMAC‑SHA1 avec MONETICO_SECRET_KEY
  - Retourne actionUrl (prod) et fields (TPE, montant, date, reference, texte-libre, societe, version, lgue, mail, contexte_commande, MAC)
- Sortie (JSON) :
  - { success: true, actionUrl, fields: {...}, debug: {...} }

2) POST monetico-webhook (Interface Retour)

- Chemin : Supabase Edge Function “monetico-webhook”
- Entrée : application/x-www-form-urlencoded (TPE, date, montant, reference, texte-libre, version, code-retour, …, MAC)
- Vérification :
  - Recompose la chaîne (TPE puis autres champs triés)
  - HMAC‑SHA1 et comparaison MAC
- Mise à jour :
  - code-retour 'paiement' → orders.payment_status = 'paid', status = 'confirmed'
  - échec → orders.payment_status = 'failed'
- Réponse texte :
  - "version=2\ncdr=0\n" si OK, sinon "version=2\ncdr=1\n"

## Accès aux données côté client

- @supabase/supabase-js utilisé dans lib/supabaseClient.ts
- Lecture catégories/produits dans components/Products.tsx (jointure catégories)
- Création orders + order_items dans pages/CheckoutPage.tsx

## Ajouter/modifier un modèle ou endpoint

Ajouter une table/modèle :

1. Éditer database/schema.sql (ou créer un script dédié) : CREATE TABLE, clés étrangères.
2. Définir les politiques RLS adaptées (SELECT/INSERT/UPDATE/DELETE).
3. Déployer le SQL dans Supabase (SQL editor ou CLI).
4. Mettre à jour le code client (types/affichages/api).

Ajouter/modifier un endpoint (Edge Function) :

1. Créer supabase/functions/<nom>/index.ts avec serve().
2. Utiliser Deno std/crypto si nécessaire, définir CORS.
3. Renseigner les variables d’environnement requises dans Supabase.
4. Déployer via le Dashboard Supabase ou la CLI (supabase functions deploy <nom>).
5. Consommer côté client via supabase.functions.invoke('<nom>', { body }).

