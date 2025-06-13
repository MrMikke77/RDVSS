# Système de prise de rendez-vous – Node.js + Vercel

## Fonctionnalités

- Prise de RDV par formulaire web
- Validation/refus/commentaire par l’admin (interface `/admin`)
- Notification par email au client
- Synchronisation Google Agenda si accepté

## Déploiement

1. **Créer un repo GitHub, push ce code**
2. **Importer sur [Vercel](https://vercel.com/import/git)**
3. **Définir ces variables d’environnement sur Vercel** :
   - SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM
   - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN

## Usage

- Accès client : `/`
- Accès admin : `/admin`
- Pour intégrer sur ton site ou Google My Business, utilise le lien affiché en bas de la page d’accueil.
