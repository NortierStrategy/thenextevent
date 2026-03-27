# Prompt Claude Code — Correctifs P0 Sécurité + P1 Anti-spam — thenextevent.fr

## Contexte
Site Next.js 14 (App Router) déployé sur Vercel. Domain : thenextevent.fr.
Stack : TypeScript, Tailwind, Framer Motion, Resend (email), HubSpot CRM, Make.com webhook.

## Tâches à exécuter (dans cet ordre)

### 1. Security headers dans `next.config.mjs`

Le fichier `next.config.mjs` est actuellement vide (`const nextConfig = {};`).

Ajoute les headers de sécurité suivants appliqués à toutes les routes (`source: "/(.*)"`) :

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://snap.licdn.com https://t.contentsquare.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://api.resend.com https://api.hubapi.com https://hook.eu2.make.com https://t.contentsquare.net https://snap.licdn.com; frame-src 'self' https://calendly.com; object-src 'none'; base-uri 'self'
```

Ajoute aussi le caching des assets statiques :
```js
{
  source: "/images/(.*)",
  headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
},
{
  source: "/_next/static/(.*)",
  headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
}
```

### 2. XSS protection dans `/src/app/api/contact/route.ts`

Les données utilisateur (name, email, phone, company, event_type, event_date, location, budget, message) sont injectées directement dans le HTML des emails Resend sans échappement.

**Action** : Crée une fonction `escapeHtml(str: string): string` en haut du fichier qui échappe `& < > " '`. Applique-la à TOUTES les interpolations `${data.xxx}` dans les deux blocs `html:` (email notification + email confirmation). Aussi appliquer à `firstName`.

### 3. Supprimer les console.log sensibles dans `/src/app/api/contact/route.ts`

Supprime ces lignes qui loguent des infos sensibles en production :
- `console.log("🔵 HubSpot — Token présent:", !!HUBSPOT_ACCESS_TOKEN);` (ligne ~111)
- `console.log("🔵 HubSpot — Envoi:", JSON.stringify(hubspotBody));` (ligne ~126)
- `console.log("🔵 HubSpot — Status:", hubspotResponse.status);` (ligne ~138)
- `console.log("✅ Contact HubSpot créé — ID:", hubspotData.id);` (ligne ~143)

Garde les `console.error` et `console.warn` — ils sont utiles pour le debug.

### 4. Rate limiting sur `/api/contact`

Implémente un rate limiter in-memory simple (pas de dépendance externe) directement dans `/src/app/api/contact/route.ts` :

- Map `IP → { count, resetTime }` en mémoire
- Limite : 5 requêtes par IP par minute
- Fenêtre glissante de 60 secondes
- Réponse 429 si dépassé : `{ success: false, error: "Trop de requêtes. Réessayez dans 1 minute." }`
- Récupérer l'IP depuis les headers Vercel : `req.headers.get("x-forwarded-for")` ou `req.ip`
- Nettoyage automatique des entrées expirées à chaque requête

### 5. Vérification

Après toutes les modifications :
- Lance `npx tsc --noEmit` pour vérifier qu'il n'y a aucune erreur TypeScript
- Lance `npm run build` pour vérifier que le build passe
- Corrige tout ce qui casse

## Fichiers concernés
- `next.config.mjs` (tâche 1)
- `src/app/api/contact/route.ts` (tâches 2, 3, 4)

## Contraintes
- Ne touche à aucun autre fichier
- Ne change pas le comportement fonctionnel (emails, HubSpot, Make.com doivent continuer de fonctionner)
- Pas de nouvelle dépendance npm
- Garde le code propre et typé TypeScript
- Commit à la fin avec message : "fix(security): add headers, XSS protection, rate limiting, remove sensitive logs"
