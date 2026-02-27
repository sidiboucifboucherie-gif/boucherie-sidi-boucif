# Documentation du Projet

Ce dossier décrit entièrement l’architecture de la boutique en ligne Boucherie Sidi Boucif (frontend React + backend Supabase + intégration Monetico). Il permet à tout développeur de comprendre, modifier, migrer ou dupliquer l’application vers un autre secteur.

## Contenu et utilisation

- 01_Architecture_Overview.md
  - Vue d’ensemble du système, flux de données, stack technique complète et variables d’environnement.
- 02_Frontend_Structure.md
  - Structure du frontend (React + Vite), routage, contextes, composants clés et guide pour ajouter/supprimer des UI.
- 03_Backend_and_Data.md
  - Backend Supabase (Postgres, RLS, Storage), schéma de base de données, logique serveur (Edge Functions), auth/roles, endpoints.
- 04_Payment_Integration.md
  - Intégration Monetico: exigences cryptographiques, champs attendus, redirection, webhook de vérification, sandbox vs production.
- 05_Rebuild_Template.md
  - Modèle “white‑label” à compléter pour cloner l’architecture pour une autre enseigne (variables, couleurs, clés, checklist).

Comment s’en servir:

1. Lire 01_Architecture_Overview.md pour comprendre la vue macro.
2. Explorer 02_Frontend_Structure.md pour intervenir côté UI/UX et parcours.
3. Parcourir 03_Backend_and_Data.md pour toute évolution de données/permissions/endpoints.
4. S’appuyer sur 04_Payment_Integration.md pour configurer ou dépanner les paiements.
5. Utiliser 05_Rebuild_Template.md comme procédure pas‑à‑pas pour répliquer le projet.

