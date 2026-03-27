# Prompt Claude Code — Correctifs P3 (Mobile, SEO, Analytics) — thenextevent.fr

## Contexte
Site Next.js 14 (App Router) déployé sur Vercel. Domain : thenextevent.fr.
Stack : TypeScript, Tailwind, Framer Motion, Resend (email), HubSpot CRM.
Fonts : Playfair Display + Outfit. Design : dark theme luxe (#0A0A0A).

---

## TÂCHE 1 — Font-size inputs ≥ 16px (empêcher zoom iOS)

### Problème
Les inputs et textareas utilisent `text-[13px]` — sur iOS Safari, tout input < 16px déclenche un zoom automatique au focus, cassant le layout mobile.

### Action

**a) `src/components/ui/Input.tsx` ligne 19 :**
Remplacer `text-[13px]` par `text-base` (= 16px) dans le className de l'input.

**b) `src/components/ui/Textarea.tsx` ligne 20 :**
Remplacer `text-[13px]` par `text-base` dans le className du textarea.

**c) `src/components/sections/Contact.tsx` :**
Chercher TOUTES les occurrences de `text-[13px]` sur les inputs, textareas et selects. Remplacer par `text-base`.
Cela inclut :
- L'input date (~ligne 402)
- Le textarea message (~ligne 543)
- Tous les champs du formulaire step 2

---

## TÂCHE 2 — Touch targets ≥ 44x44px

### Problème
Plusieurs éléments interactifs sont trop petits pour le tactile mobile (norme WCAG : minimum 44x44px).

### Action

**a) `src/components/layout/Header.tsx` — Hamburger menu :**
Trouver le bouton hamburger (probablement `w-10 h-10` = 40x40px).
Remplacer par `w-11 h-11` (= 44x44px). S'assurer que la zone cliquable fait bien 44px minimum.

**b) `src/components/sections/Contact.tsx` — Boutons event type, location, budget :**
Ces boutons utilisent `py-2.5` ou `py-3` avec des paddings insuffisants.
Ajouter `min-h-[44px]` à tous les boutons interactifs du formulaire :
- Les cartes de sélection d'événement (event type cards)
- Les boutons de localisation
- Les boutons de budget

Chercher les patterns `px-3.5 py-3` et `px-4 py-2.5` dans Contact.tsx et ajouter `min-h-[44px]` à chacun.

---

## TÂCHE 3 — Support `prefers-reduced-motion`

### Problème
Toutes les animations Framer Motion dans `src/lib/animations.ts` ignorent la préférence utilisateur `prefers-reduced-motion: reduce`. Les utilisateurs sensibles (vestibulaire, migraines) subissent les animations.

### Action

**a) `src/lib/animations.ts` :**
Créer un helper qui désactive les animations si l'utilisateur préfère le mouvement réduit. Modifier CHAQUE variant (fadeInUp, slideInLeft, slideInRight, scaleIn, staggerContainer, etc.) :

```tsx
import { Variants } from "framer-motion";

// Variants statiques pour reduced motion
const noMotion = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

// Helper pour créer des variants respectant prefers-reduced-motion
function createVariant(animated: Variants): Variants {
  if (typeof window === "undefined") return animated;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return prefersReduced ? noMotion : animated;
}
```

**Alternative plus propre (recommandée)** — Ne pas toucher animations.ts, mais ajouter globalement dans le CSS (`globals.css`) :
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

ET dans les composants qui utilisent `<motion.div>`, ajouter le hook Framer Motion :
```tsx
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
// Puis utiliser shouldReduceMotion pour conditionner les variants
```

Choisis l'approche CSS globale (plus simple, couvre tout) + le hook Framer Motion dans les composants principaux qui ont des animations lourdes (Hero, Contact, Expertises).

---

## TÂCHE 4 — Compléter event tracking (Analytics)

### Problème
60% des interactions utilisateur ne sont pas trackées. Il manque des trackEvent sur les sélections du formulaire, les onglets expertises, les réalisations, les métiers et la navigation.

### Action

Importer `trackEvent` depuis `@/components/layout/Analytics` dans chaque fichier concerné, puis ajouter les appels suivants :

**a) `src/components/sections/Contact.tsx` — Sélections formulaire :**

Au clic sur un event type card :
```tsx
trackEvent("form_field_select", { field: "event_type", value: card.label });
```

Au clic sur un bouton location :
```tsx
trackEvent("form_field_select", { field: "location", value: loc });
```

Au clic sur un bouton budget :
```tsx
trackEvent("form_field_select", { field: "budget", value: opt });
```

Au changement de la date :
```tsx
trackEvent("form_field_change", { field: "event_date" });
```

En cas d'erreur de soumission (dans le catch du fetch) :
```tsx
trackEvent("form_submission_error", { error: errorMessage });
```

Enrichir le trackEvent("Lead") existant avec location et event_date :
```tsx
trackEvent("Lead", {
  event_type: formData.event_type,
  budget: formData.budget,
  location: formData.location,
  event_date: formData.event_date,
});
```

**b) `src/components/sections/Expertises.tsx` — Clics onglets :**
Au clic sur un onglet de service :
```tsx
trackEvent("expertise_tab_click", { service: titreduservice });
```

Au clic sur le CTA "Demander un devis" dans une expertise :
```tsx
trackEvent("expertise_cta_click", { service: titreduservice });
```

**c) `src/components/sections/Metiers.tsx` — CTA métier :**
Au clic sur "Sélectionner ce profil" :
```tsx
trackEvent("metier_cta_click", { metier: titredumétier });
```

**d) `src/components/sections/Realisations.tsx` — Clic/hover réalisation :**
Au clic ou interaction sur un projet :
```tsx
trackEvent("realisation_click", { project: titreduprojet });
```

**e) `src/components/layout/Header.tsx` — Navigation mobile :**
Au clic sur un lien dans le menu hamburger/drawer mobile (pas le phone_click qui est déjà tracké) :
```tsx
trackEvent("nav_link_click", { link: labelDuLien });
```

---

## TÂCHE 5 — Fixer format LinkedIn dans trackEvent

### Problème
Dans `src/components/layout/Analytics.tsx` ligne 209, LinkedIn reçoit `conversion_id: eventName` (ex: "Lead") au lieu d'un vrai conversion ID numérique LinkedIn.

### Action
Remplacer dans la fonction `trackEvent()` :
```tsx
if (w.lintrk) w.lintrk("track", { conversion_id: eventName });
```
Par :
```tsx
if (w.lintrk && eventName === "Lead") {
  w.lintrk("track", { conversion_id: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID || "" });
}
```

⚠️ Si `NEXT_PUBLIC_LINKEDIN_CONVERSION_ID` n'existe pas encore dans le code, ajouter la variable en haut du fichier :
```tsx
const LINKEDIN_CONVERSION_ID = process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID || "";
```

Et l'utiliser : `w.lintrk("track", { conversion_id: LINKEDIN_CONVERSION_ID });`

Note : Nicola devra ensuite ajouter le vrai conversion ID dans Vercel (il le trouvera dans LinkedIn Campaign Manager → Conversions).

---

## TÂCHE 6 — Supprimer le doublon Hotjar

### Problème
`Analytics.tsx` charge Hotjar ET Contentsquare. Hotjar a été remplacé par Contentsquare — le bloc Hotjar est du dead code.

### Action
Dans `src/components/layout/Analytics.tsx` :
- Supprimer la constante `HOTJAR_ID` (ligne 17)
- Supprimer `hasHotjar` (ligne 29)
- Retirer `hasHotjar` du calcul de `hasAny` (ligne 31)
- Supprimer tout le bloc JSX `{/* ── Hotjar (legacy) ── */}` (lignes 170-184)

---

## TÂCHE 7 — Metadata EN sur les pages internes

### Problème
Les pages internes (services, realisations, contact, a-propos, rejoindre, blog) n'ont pas toutes des metadata traduites en anglais.

### Action
Vérifier chaque fichier `layout.tsx` ou `page.tsx` dans `src/app/[locale]/` :
- `services/layout.tsx`
- `realisations/layout.tsx`
- `contact/layout.tsx`
- `a-propos/layout.tsx`
- `rejoindre/layout.tsx`

Pour chacun, si la metadata `generateMetadata()` ne fait pas de switch FR/EN comme dans le layout principal (`[locale]/layout.tsx`), ajouter la détection de locale et fournir title + description en anglais.

Pattern à suivre (copier celui de `[locale]/layout.tsx`) :
```tsx
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "Our Services | The Next Event" : "Nos Services | The Next Event",
    description: isEn
      ? "Discover our premium event management services..."
      : "Découvrez nos services de régie événementielle premium...",
    alternates: {
      canonical: `https://thenextevent.fr/${locale}/services`,
      languages: { fr: "https://thenextevent.fr/fr/services", en: "https://thenextevent.fr/en/services" },
    },
  };
}
```

---

## TÂCHE 8 — Vérification finale

Après toutes les modifications :
1. `npx tsc --noEmit` → 0 erreurs TypeScript
2. `npm run build` → build réussi
3. Vérifier que les imports `trackEvent` sont corrects dans chaque composant modifié
4. Vérifier que les animations ne cassent pas avec `prefers-reduced-motion`
5. Corrige tout ce qui casse

---

## Fichiers concernés
- `src/components/ui/Input.tsx` (tâche 1)
- `src/components/ui/Textarea.tsx` (tâche 1)
- `src/components/sections/Contact.tsx` (tâches 1, 2, 4)
- `src/components/layout/Header.tsx` (tâches 2, 4)
- `src/lib/animations.ts` (tâche 3)
- `src/app/globals.css` (tâche 3)
- `src/components/sections/Expertises.tsx` (tâche 4)
- `src/components/sections/Metiers.tsx` (tâche 4)
- `src/components/sections/Realisations.tsx` (tâche 4)
- `src/components/layout/Analytics.tsx` (tâches 5, 6)
- `src/app/[locale]/services/layout.tsx` (tâche 7)
- `src/app/[locale]/realisations/layout.tsx` (tâche 7)
- `src/app/[locale]/contact/layout.tsx` (tâche 7)
- `src/app/[locale]/a-propos/layout.tsx` (tâche 7)
- `src/app/[locale]/rejoindre/layout.tsx` (tâche 7)

## Contraintes
- Ne change pas le design visuel (couleurs, layout, spacing général)
- Pas de nouvelle dépendance npm
- Code propre et typé TypeScript strict
- Ne casse pas les animations existantes — les rendre juste respectueuses de prefers-reduced-motion
- Commit à la fin : "fix(mobile/seo/analytics): input sizes, touch targets, reduced-motion, tracking, metadata EN"
