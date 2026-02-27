# Intégration Paiement – Monetico

## Vue d’ensemble

Monetico est intégré par redirection : le frontend appelle l’Edge Function “monetico-init” qui renvoie une `actionUrl` et un ensemble de champs cachés. Le navigateur POSTe ces champs vers Monetico (page de paiement). Une fois le paiement effectué, Monetico appelle notre “Interface Retour” (webhook) et l’utilisateur est redirigé vers /payment/success ou /payment/error.

## Paramètres fixes (dans le code)

- VERSION : "3.0"
- DEVISE : "EUR"
- CODE_SOCIETE : "boucheries"
- TPE : "7675540"
- lgue : "FR"

## Cryptographie et signature

- Algorithme : HMAC‑SHA1
- Clé : `MONETICO_SECRET_KEY` (fournie par Monetico) – nettoyer en retirant toute mention "VERSION X", "HMAC-SHA1" et espaces avant usage.
- Chaîne à signer (format V3) :
  - Mettre `TPE` en premier, puis **toutes les autres clés triées alphabétiquement**.
  - Exemple (init) : `TPE=...*contexte_commande=...*date=...*lgue=...*mail=...*montant=...*reference=...*societe=...*texte-libre=...*version=...`
- MAC attendu : hex string en minuscule.

## Initialisation paiement (monetico-init)

Entrée (JSON) :

- orderId : UUID de la commande
- amount : chaîne "12.50"
- email : e‑mail client
- origin : ex `window.location.origin` (sert pour URL retour)
- formData : { address, city, postalCode, ... } pour `contexte_commande`

Traitement :

- Construit `contexte_commande` en Base64 d’un JSON minimal: `{ billing: { addressLine1, city, postalCode, country: "FR" } }`
- Formate la date `dd/mm/yyyy:HH:mm:ss`
- Construit `montant` au format `12.50EUR`
- Génère `reference` (max 12 chars, alphanum, uppercase) à partir de l’orderId.
- Calcule `MAC` avec HMAC‑SHA1.
- Retourne :
  - `actionUrl` : `https://p.monetico-services.com/paiement.cgi` (PRODUCTION)
  - `fields` : TPE, contexte_commande, date, montant, reference, texte-libre, version, lgue, societe, mail, MAC

Soumission côté frontend :

- Crée un `<form method="POST" action={actionUrl}>` caché avec tous les `fields` et auto‑soumet.

## Webhook (monetico-webhook)

Réception :

- `Content-Type: application/x-www-form-urlencoded`
- Champs : TPE, date, montant, reference, texte-libre, version, code-retour, cvx, vld, brand, status3ds, numauto, motifrefus, originecb, bincb, hpancb, ipclient, originetr, veres, pares, MAC

Vérification :

- Recomposer la chaîne `TPE=...*<autres clés triées>` en excluant `MAC`.
- Calculer HMAC‑SHA1 avec `MONETICO_SECRET_KEY` et comparer en minuscule.

Mise à jour commande :

- `code-retour` = `paiement` → `orders.payment_status = 'paid'` et `status = 'confirmed'`
- Sinon marquer l’échec (`failed`). La réponse à Monetico doit rester "OK" si le message est bien reçu pour éviter des renvois.

Réponse :

- Succès : `version=2\ncdr=0\n`
- Erreur : `version=2\ncdr=1\n`

## Environnements

- Production : `https://p.monetico-services.com/paiement.cgi`
- Test : `https://p.monetico-services.com/test/paiement.cgi`

Notes importantes :

- Le back‑office Monetico doit être **en production** (désactiver Sandbox) sinon la plateforme peut considérer l’appel comme test.
- Après modification de l’URL côté fonction, **redeploy** la fonction dans Supabase.

## Variables d’environnement (Supabase Functions)

- `MONETICO_SECRET_KEY` : clé HMAC fournie par la banque
- `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` : utilisés par le webhook pour mettre à jour la base

## Tests et sandbox

- Pour tester en sandbox, basculer l’actionUrl de l’init vers `/test/paiement.cgi` et s’assurer que le back‑office est en mode TEST (ou utiliser un TPE/test dédié).
- Utiliser des cartes de test fournies par Monetico (voir leur documentation). En production, revenir à l’URL de production et au mode production du back‑office.

