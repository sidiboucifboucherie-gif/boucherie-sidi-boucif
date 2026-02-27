# Architecture – Vue d’ensemble

## Vision globale

Application e‑commerce monopage construite avec React + Vite (TypeScript), stylée via Tailwind CSS (CDN et thème custom), connectée à Supabase pour l’authentification, la base Postgres, le stockage d’images et des Edge Functions. Les paiements sont traités via Monetico (CM‑CIC) avec une fonction d’initialisation et un webhook de confirmation.

Flux principal:

1. Client navigue sur l’UI (React Router).
2. Produits et catégories chargés depuis Supabase (Postgres).
3. Panier géré côté client via localStorage + Context.
4. À la commande, création de l’ordre et de ses lignes dans Postgres.
5. Appel de l’Edge Function “monetico-init” qui calcule le MAC, renvoie une actionUrl + champs de formulaire, puis redirection vers Monetico.
6. Après paiement, Monetico envoie un “Interface Retour” (webhook) vers “monetico-webhook” qui vérifie la signature et met à jour le statut de paiement.
7. Le client revient sur /payment/success ou /payment/error.

## Stack technique

- Frontend
  - React 19 + TypeScript
  - React Router DOM 7
  - Vite 6 (dev/build)
  - Icons: lucide-react
  - Tailwind CSS via CDN, thème étendu dans index.html
  - Recharts (analytique basique côté admin)
- Backend / Data
  - Supabase:
    - Postgres géré, RLS activé
    - Auth Supabase (profiles liés à auth.users)
    - Storage bucket “products” (images produits, accès public en lecture)
    - Edge Functions (Deno) “monetico-init” et “monetico-webhook”
  - SQL d’initialisation: database/schema.sql (+ scripts utilitaires)
- Paiement
  - Monetico (CM‑CIC): HMAC‑SHA1, Version 3.0, devise EUR, redirection serveur → page de paiement Monetico.

## Arborescence clé

- components/: Navigation, CartDrawer, Products, FAQSection…
- context/: CartContext, AuthContext
- pages/: pages publiques et admin
- supabase/functions/: monetico-init, monetico-webhook
- database/: schema.sql et correctifs
- lib/: supabaseClient.ts (initialisation client)

## Variables d’environnement

Frontend (.env.local):

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Edge Functions (Supabase → Project Settings → Functions → Environment):

- MONETICO_SECRET_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Notes:

- Le frontend lit VITE_* via import.meta.env.
- Le webhook nécessite la clé service role pour mettre à jour les commandes côté serveur.
- La clé Monetico doit être fournie au format attendu (voir 04_Payment_Integration.md).

## Démarrage

- npm install
- npm run dev

Build/preview:

- npm run build
- npm run preview

