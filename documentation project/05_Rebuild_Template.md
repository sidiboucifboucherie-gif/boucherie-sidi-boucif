# Modèle de Rebuild “White‑label”

Remplacer les variables entre ☐ par vos valeurs. Suivre la checklist pas‑à‑pas.

## Variables de marque et SEO

- ☐ Nom de l’enseigne : __________________________
- ☐ Domaine principal : __________________________
- ☐ Adresse complète : __________________________
- ☐ Téléphone : __________________________
- ☐ Horaires (schema.org) : __________________________
- ☐ Mots‑clés SEO principaux : __________________________
- ☐ Couleurs :
  - burgundy.700 = ☐
  - burgundy.800 = ☐
  - burgundy.900 = ☐
  - gold.400 = ☐
  - gold.500 = ☐
  - gold.600 = ☐
  - dark.900 = ☐
- ☐ Logo URL : __________________________

Où les renseigner :

- index.html : meta tags, OpenGraph, schema.org (LocalBusiness + FAQ), config Tailwind (couleurs, fonts), favicon/manifest

## Supabase – Projet

- ☐ Créer un projet Supabase
- ☐ Exécuter database/schema.sql pour créer tables/rls/triggers
- ☐ Créer bucket Storage “products” (public en lecture)
- ☐ Créer un utilisateur admin ou promouvoir un profil (role = 'admin')

Variables côté frontend (.env.local) :

- ☐ VITE_SUPABASE_URL = __________________________
- ☐ VITE_SUPABASE_ANON_KEY = __________________________

## Edge Functions – Paiement

Fonctions à déployer :

- monetico-init
- monetico-webhook

Variables d’environnement (Supabase → Functions) :

- ☐ MONETICO_SECRET_KEY = __________________________
- ☐ SUPABASE_URL = __________________________
- ☐ SUPABASE_SERVICE_ROLE_KEY = __________________________

Paramètres Monetico (dans le code) :

- ☐ TPE = __________________________
- ☐ CODE_SOCIETE = __________________________
- VERSION = "3.0", DEVISE = "EUR", lgue = "FR"

URLs de retour :

- OK : https://☐DOMAINE/payment/success
- ERR : https://☐DOMAINE/payment/error

Checklist déploiement paiements :

1. ☐ Renseigner MONETICO_SECRET_KEY (format propre, sans préfixes/espaces)
2. ☐ Vérifier l’`actionUrl` de monetico-init → production
3. ☐ Basculer l’environnement du back‑office Monetico en PRODUCTION (désactiver Sandbox)
4. ☐ Déployer/Redéployer les Edge Functions
5. ☐ Tester un paiement réel à faible montant

## Données – Catégories & Produits

- ☐ Créer les catégories (table categories)
- ☐ Importer/ajouter les produits (table products) via Admin > Produits
- ☐ Uploader les images dans Storage “products” (ou URLs externes)

## Authentification et rôles

- ☐ Vérifier la création automatique des profils (trigger handle_new_user)
- ☐ Assigner le rôle 'admin' au compte de gestion
- ☐ Protéger l’accès admin côté UI (isAdmin) et via RLS (déjà dans schema.sql)

## Rebuild pas‑à‑pas

1. ☐ Cloner ce dépôt et installer les dépendances (`npm install`).
2. ☐ Mettre à jour la marque et le SEO dans `index.html` (meta, couleurs, fonts, schema.org).
3. ☐ Créer `.env.local` avec `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
4. ☐ Créer le projet Supabase et exécuter `database/schema.sql`.
5. ☐ Créer le bucket `products` et vérifier les policies (lecture publique).
6. ☐ Déployer les Edge Functions dans Supabase : `monetico-init` et `monetico-webhook`.
7. ☐ Définir les variables d’environnement des fonctions (MONETICO_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
8. ☐ Mettre à jour TPE/CODE_SOCIETE si nécessaire dans `monetico-init`.
9. ☐ Lancer l’appli en local (`npm run dev`) et tester : produits, panier, checkout.
10. ☐ Tester un paiement (sandbox ou prod selon votre back‑office).
11. ☐ Mettre à jour `robots.txt` et `sitemap.xml` pour votre domaine.
12. ☐ Déployer le frontend (hébergement de votre choix) et configurer le domaine.
13. ☐ Ajouter le site à Google Search Console et soumettre le sitemap.

Notes:

- Le panier est stocké côté client (localStorage). Si vous voulez un panier serveur, ajoutez une table `cart_items` + sync dans CartContext.
- Les couleurs sont centralisées dans la config Tailwind du `index.html` (CDN).

