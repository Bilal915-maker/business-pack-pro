# Déploiement Business Pack Pro — 15 minutes

## Étape 1 — Stripe (5 min)
1. Va sur https://stripe.com → crée un compte gratuit
2. Dashboard → "Développeurs" → "Clés API"
3. Copie :
   - Clé publique (pk_live_...) → remplace REMPLACER_PAR_CLE_PUBLIQUE_STRIPE dans index.html
   - Clé secrète (sk_live_...) → variable d'env STRIPE_SECRET_KEY

## Étape 2 — Gmail App Password (3 min)
1. Va sur myaccount.google.com → Sécurité → Validation en 2 étapes
2. En bas : "Mots de passe des applications" → crée un mot de passe pour "Mail"
3. Copie le code 16 caractères → variable d'env GMAIL_APP_PASSWORD
4. Variable d'env GMAIL_USER = ton adresse Gmail

## Étape 3 — Vercel (5 min)
1. Va sur vercel.com → "Add New Project"
2. Upload ce dossier (ou connecte GitHub)
3. Dans "Environment Variables", ajoute :
   - STRIPE_SECRET_KEY = sk_live_...
   - STRIPE_WEBHOOK_SECRET = (voir étape 4)
   - GMAIL_USER = ton@gmail.com
   - GMAIL_APP_PASSWORD = xxxx xxxx xxxx xxxx
4. Deploy

## Étape 4 — Webhook Stripe (2 min)
1. Stripe Dashboard → Développeurs → Webhooks → "Add endpoint"
2. URL : https://VOTRE-DOMAINE.vercel.app/api/webhook
3. Événement : payment_intent.succeeded
4. Copie le "Signing secret" → variable STRIPE_WEBHOOK_SECRET dans Vercel
5. Redéploye

## C'est tout.
Quand quelqu'un paie → Stripe déclenche le webhook → email envoyé automatiquement avec le lien Notion.
