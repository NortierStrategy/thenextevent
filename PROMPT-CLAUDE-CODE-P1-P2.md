# Prompt Claude Code — Correctifs P1/P2 (Performance, SEO, Analytics, Forms) — thenextevent.fr

## Contexte
Site Next.js 14 (App Router) déployé sur Vercel. Domain : thenextevent.fr.
Stack : TypeScript, Tailwind, Framer Motion, Resend (email), HubSpot CRM, Make.com webhook.
Fonts utilisés : Playfair Display (headings) + Outfit (body), chargés via @import Google Fonts dans globals.css.
Images : 15 JPG dans public/images/projet/ (50-84 Ko chacune), logos SVG dans public/images/clients/.

---

## TÂCHE 1 — Migrer Google Fonts vers next/font (Performance critique)

### Problème
`globals.css` ligne 5 charge les fonts via un `@import url("https://fonts.googleapis.com/css2?...")` — c'est **render-blocking** et ajoute ~800ms au LCP.

### Action

**a) Modifier `src/app/layout.tsx` :**
```tsx
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${outfit.variable} bg-black`} style={{ backgroundColor: "#0A0A0A" }}>
      <body className="font-outfit antialiased bg-black text-text">{children}</body>
    </html>
  );
}
```

**b) Supprimer la ligne @import dans `src/app/globals.css` :**
Supprimer : `@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@200;300;400;500;600;700&display=swap");`

**c) Mettre à jour les font-family dans `globals.css` pour utiliser les CSS variables :**
Remplacer `font-family: "Outfit", "Helvetica Neue", sans-serif;` par `font-family: var(--font-outfit), "Helvetica Neue", sans-serif;`
Remplacer `font-family: "Playfair Display", serif;` par `font-family: var(--font-playfair), serif;`

**d) Mettre à jour `tailwind.config.ts` :**
```ts
fontFamily: {
  playfair: ["var(--font-playfair)", "serif"],
  outfit: ["var(--font-outfit)", "Helvetica Neue", "sans-serif"],
},
```

---

## TÂCHE 2 — Renommer MAKE_WEBHOOK_URL (Sécurité)

### Problème
`NEXT_PUBLIC_MAKE_WEBHOOK_URL` est exposé côté client (NEXT_PUBLIC_ = visible dans le bundle JS). N'importe qui peut voir et spammer le webhook Make.com.

### Action
**a) Dans `src/app/api/contact/route.ts` ligne 5 :**
Remplacer : `const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || "";`
Par : `const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";`

**b) Sur Vercel** (à faire manuellement après) : renommer la variable d'env de `NEXT_PUBLIC_MAKE_WEBHOOK_URL` en `MAKE_WEBHOOK_URL`.

⚠️ Vérifier qu'aucun autre fichier côté client ne référence `NEXT_PUBLIC_MAKE_WEBHOOK_URL`. Si oui, supprimer ces références (le webhook ne doit JAMAIS être appelé côté client).

---

## TÂCHE 3 — Connecter ContactForm.tsx et RecruitForm.tsx à l'API (Dead code fix)

### Problème
`src/components/forms/ContactForm.tsx` et `src/components/forms/RecruitForm.tsx` sont du **dead code** :
- `onSubmit` fait juste `console.log(data)` + `setTimeout(1000)` + `setIsSubmitted(true)`
- Les données ne sont JAMAIS envoyées au serveur

### Action

**a) `src/components/forms/ContactForm.tsx` — remplacer onSubmit :**
```tsx
const onSubmit = async (data: ContactFormData) => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.nom,
        email: data.email,
        phone: data.telephone,
        company: data.societe,
        event_type: data.typeEvent,
        event_date: data.date,
        location: data.lieu,
        budget: data.nbPersonnel,
        message: data.message,
      }),
    });
    if (!res.ok) throw new Error("Erreur serveur");
    setIsSubmitted(true);
  } catch (err) {
    console.error("Form submission error:", err);
    // Optionnel : ajouter un state d'erreur pour afficher un message à l'utilisateur
  }
};
```

**b) `src/components/forms/RecruitForm.tsx` — remplacer onSubmit :**

Deux options :
- **Option A (recommandée)** : Créer une route `/api/recruit` similaire à `/api/contact` mais pour les candidatures (envoie un email à recrutement@thenextevent.fr via Resend)
- **Option B (rapide)** : Réutiliser `/api/contact` avec un champ `source: "recrutement"` pour différencier

Implémente l'**option A** :
1. Crée `src/app/api/recruit/route.ts` qui :
   - Reçoit les données du formulaire (nom, email, telephone, ville, experience, message)
   - Envoie un email de notification à `recrutement@thenextevent.fr` via Resend
   - Envoie un email de confirmation au candidat
   - Applique les mêmes protections que /api/contact (escapeHtml, rate limiting)

2. Mets à jour `RecruitForm.tsx` pour POST vers `/api/recruit`

---

## TÂCHE 4 — Compléter le event tracking (Analytics)

### Problème
Seuls ~40% des interactions sont trackées. Manquent : navigation, onglets expertises, réalisations, erreurs formulaire, switch langue.

### Action
Ajouter des appels `trackEvent()` dans les composants suivants (importer depuis `@/components/layout/Analytics`) :

**a) `src/components/sections/Expertises.tsx`** — au clic sur un onglet d'expertise :
```tsx
trackEvent("expertise_tab_click", { service: titre_du_service });
```

**b) `src/components/sections/Realisations.tsx`** — au clic/hover sur un projet :
```tsx
trackEvent("realisation_click", { project: titre_du_projet });
```

**c) `src/components/sections/Metiers.tsx`** — au clic sur "Sélectionner ce profil" ou lien CTA :
```tsx
trackEvent("metier_cta_click", { metier: titre_du_metier });
```

**d) `src/components/layout/Header.tsx`** — au clic sur un lien de navigation :
```tsx
trackEvent("nav_link_click", { link: label_du_lien });
```

**e) `src/components/sections/Contact.tsx`** — en cas d'erreur de soumission (quand le fetch échoue) :
```tsx
trackEvent("form_submission_error", { error: error_message });
```

**f) `src/components/layout/Analytics.tsx`** — corriger le format Meta Pixel pour le Lead :
Remplacer dans `trackEvent()` :
```tsx
if (w.fbq) w.fbq("trackCustom", eventName, params);
```
Par :
```tsx
if (w.fbq) {
  if (eventName === "Lead") {
    w.fbq("track", "Lead", params);  // Standard event, pas custom
  } else {
    w.fbq("trackCustom", eventName, params);
  }
}
```

---

## TÂCHE 5 — Ajouter cache headers images dans next.config.mjs

### Problème
Les images JPG dans /public/images/ n'ont aucun cache header custom. Vercel met un cache par défaut mais on peut l'optimiser.

### Action
Vérifier que les headers suivants sont bien dans `next.config.mjs` (si la tâche P0 a déjà été exécutée, ils y sont peut-être déjà) :
```js
{
  source: "/images/(.*)",
  headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
}
```

---

## TÂCHE 6 — Paralléliser Resend + HubSpot + Make dans /api/contact

### Problème
Dans `src/app/api/contact/route.ts`, les 3 services (Resend notification, Resend confirmation, HubSpot, Make.com) sont appelés en **séquentiel**. Si HubSpot met 3s à répondre, tout le monde attend.

### Action
Wrapper les 3 blocs (email Resend, HubSpot, Make) dans un `Promise.allSettled()` :
```tsx
const results = await Promise.allSettled([
  // 1. Emails Resend (notification + confirmation)
  sendEmails(data),
  // 2. HubSpot CRM
  pushToHubSpot(data),
  // 3. Make.com webhook
  forwardToMake(data),
]);

// Log les erreurs silencieusement
results.forEach((r, i) => {
  if (r.status === "rejected") {
    console.error(`[Contact API] Service ${i} failed:`, r.reason);
  }
});
```

Extraire chaque bloc dans sa propre fonction async (sendEmails, pushToHubSpot, forwardToMake) pour clarté.

---

## TÂCHE 7 — Vérification finale

Après toutes les modifications :
1. `npx tsc --noEmit` → 0 erreurs TypeScript
2. `npm run build` → build réussi
3. Vérifier que les fonts se chargent correctement (pas de FOUT)
4. Vérifier que les imports trackEvent sont corrects dans chaque composant modifié
5. Corrige tout ce qui casse

---

## Fichiers concernés
- `src/app/layout.tsx` (tâche 1)
- `src/app/globals.css` (tâche 1)
- `tailwind.config.ts` (tâche 1)
- `src/app/api/contact/route.ts` (tâches 2, 6)
- `src/components/forms/ContactForm.tsx` (tâche 3)
- `src/components/forms/RecruitForm.tsx` (tâche 3)
- `src/app/api/recruit/route.ts` (tâche 3 — NOUVEAU FICHIER)
- `src/components/sections/Expertises.tsx` (tâche 4)
- `src/components/sections/Realisations.tsx` (tâche 4)
- `src/components/sections/Metiers.tsx` (tâche 4)
- `src/components/layout/Header.tsx` (tâche 4)
- `src/components/sections/Contact.tsx` (tâche 4)
- `src/components/layout/Analytics.tsx` (tâche 4)
- `next.config.mjs` (tâche 5)

## Contraintes
- Ne change pas le design visuel (couleurs, layout, animations)
- Pas de nouvelle dépendance npm (sauf si absolument nécessaire)
- Code propre et typé TypeScript strict
- Tous les console.log de debug doivent être supprimés dans les nouveaux fichiers
- Commit à la fin : "feat: fonts optimization, form fix, analytics tracking, API parallelization"
