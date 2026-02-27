# Frontend – Structure et pratiques

## Framework et outils

- React 19 + TypeScript
- Vite (dev/build)
- React Router DOM 7 (SPA)
- Tailwind CSS via CDN avec thème étendu dans index.html
- Context API pour Auth et Cart

## Routage

Déclaré dans App.tsx via Routes:

- Public: /, /products, /about, /delivery, /recipes, /recipes/:id, /contact, /checkout, /payment/:status, /legal, /privacy, /terms, /login, /register, /dashboard, /orders
- Admin: /admin, /admin/products, /admin/categories, /admin/orders, /admin/messages, /admin/users

MainLayout injecte Navigation, CartDrawer et Footer autour des pages.

## Contexte et état

- AuthContext
  - Initialise la session Supabase si configurée
  - Charge profil (table profiles) quand disponible
  - Expose user, session, profile, isAdmin, signOut
- CartContext
  - Stocke le panier en localStorage
  - addToCart, removeFromCart, updateQuantity, clearCart, toggleCart
  - Expose totalItems, total (nombre et somme)

## Style

- Tailwind via CDN
- Couleurs custom: burgundy, gold, dark (config dans index.html)
- Fonts: Playfair Display (titres), Lato (texte)

## Composants clés

- Navigation
  - Desktop: liens + bouton Panier + accès compte/admin
  - Mobile: icône panier + bouton menu + bouton Panier dans le menu
- CartDrawer
  - Affiche contenu du panier, permet modification des quantités et redirection checkout
- Products
  - Charge catégories et produits depuis Supabase, filtre par catégorie, ajout au panier
- FAQSection
  - Section FAQ réutilisable avec accordéon
- CheckoutPage
  - Étapes: livraison → paiement
  - Crée la commande et les items, invoque monetico-init, auto‑soumet le formulaire caché

## Ajouter ou supprimer un composant UI

Ajouter:

1. Créer le composant dans components/ (ex: components/MyWidget.tsx).
2. Respecter la convention React FC + props typées.
3. Utiliser les classes Tailwind existantes et couleurs du thème.
4. Importer et référencer le composant dans la page cible.
5. Si c’est une page: créer pages/MyPage.tsx et ajouter la route dans App.tsx.

Supprimer:

1. Retirer l’import et son usage dans les pages/layouts.
2. Supprimer le fichier composant.
3. Nettoyer les routes si c’était une page.

## Bonnes pratiques

- Garder la logique d’accès données dans les pages/composants de haut niveau.
- Centraliser l’état global dans les Contexts.
- Utiliser les helpers du thème (classes, couleurs) pour cohérence visuelle.

