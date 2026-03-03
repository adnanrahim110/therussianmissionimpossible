# Operation Stream 3.0 — Website Project Plan

---

## 1. Project Overview

A cinematic, content-rich promotional website for the non-fiction war book **"Operation Stream 3.0, or the Russian Mission Impossible"** by Angela Khachaturyan, Maria Voronina, and Victoria Kataeva. The site will serve as a book landing page, author showcase, and lead-generation tool with multiple CTAs (pre-order, newsletter signup, contact).

---

## 2. Tech Stack

| Tool | Purpose |
| --- | --- |
| **Next.js @latest** | App Router, JSX (no TypeScript) |
| **pnpm** | Package manager |
| **Tailwind CSS v4** | Utility-first styling, `@theme` config |
| **motion** (framer-motion) | Page transitions, scroll reveals, complex animations |
| **Swiper** | Testimonial carousels, author cards |
| **Lenis** | Smooth scroll (wraps entire app) |
| **lucide-react** | Icon system |
| **next/font/google** | Font loading (optimized) |

---

## 3. Design Direction

### 3.1 Visual Concept — "War Documentary Light"

A **light, warm-toned** aesthetic inspired by archival war documentary films, museum exhibitions, and editorial war photography books. The feeling should be reverent and cinematic — not dark/gritty, but dignified and luminous, as if sunlight is breaking through after a long night underground.

**Key visual metaphors drawn from the book:**
- Light emerging from darkness (the pipeline exit)
- Paper, parchment, archival documents (documentary prose genre)
- Earth, stone, steel (the pipeline, the terrain, the soldiers)
- Warmth of human connection against cold backdrop of war

### 3.2 Color Palette

Built on warm stone/parchment light backgrounds with military-earth accents and crimson for emotional weight.

```
Primary: "stone" — warm gray-beige
  50:  #FAF9F7  (page background)
  100: #F5F3EF
  200: #E8E4DD
  300: #D4CEC4
  400: #B5ADA1
  500: #968C7E
  600: #7A7067
  700: #635B53
  800: #4A443E
  900: #33302B
  950: #1C1A17  (primary text)

Accent: "crimson" — blood red / sacrifice
  50:  #FEF2F2
  100: #FEE2E2
  200: #FECACA
  300: #F9A8A8
  400: #F07171
  500: #DC2626  (primary accent)
  600: #B91C1C
  700: #991B1B
  800: #7F1D1D
  900: #611616
  950: #3B0A0A

Secondary: "olive" — military earth
  50:  #F7F8F1
  100: #EEF0E1
  200: #DBE0C1
  300: #C2CA98
  400: #A6B06E
  500: #8A9650
  600: #6D763F
  700: #545A32
  800: #44482B
  900: #3A3D27
  950: #1E2013

Neutral: "slate" — cool neutral for UI elements
  50:  #F8FAFC
  100: #F1F5F9
  200: #E2E8F0
  300: #CBD5E1
  400: #94A3B8
  500: #64748B
  600: #475569
  700: #334155
  800: #1E293B
  900: #0F172A
  950: #020617

Gold: "medal" — honor / awards / CTAs
  50:  #FFFBEB
  100: #FEF3C7
  200: #FDE68A
  300: #FCD34D
  400: #FBBF24
  500: #D4A012
  600: #B8860B
  700: #92690A
  800: #78550A
  900: #5C410A
  950: #362508
```

### 3.3 Typography

**Font Pairing:**

| Role | Font | Weight(s) | Rationale |
| --- | --- | --- | --- |
| **Heading** | **Playfair Display** | 400, 500, 600, 700, 800, 900 | High-contrast serif — evokes editorial war journalism, gravitas, literary prestige |
| **Body** | **Source Sans 3** | 300, 400, 500, 600, 700 | Humanist sans-serif — excellent readability, slightly warm character, pairs well with Playfair |

**Type Scale (8px grid aligned):**

```
--font-size-xs:    0.75rem   / 12px  → line-height: 1rem    / 16px
--font-size-sm:    0.875rem  / 14px  → line-height: 1.25rem / 20px
--font-size-base:  1rem      / 16px  → line-height: 1.5rem  / 24px
--font-size-lg:    1.125rem  / 18px  → line-height: 1.75rem / 28px
--font-size-xl:    1.25rem   / 20px  → line-height: 1.75rem / 28px
--font-size-2xl:   1.5rem    / 24px  → line-height: 2rem    / 32px
--font-size-3xl:   2rem      / 32px  → line-height: 2.5rem  / 40px
--font-size-4xl:   2.5rem    / 40px  → line-height: 3rem    / 48px
--font-size-5xl:   3rem      / 48px  → line-height: 3.5rem  / 56px
--font-size-6xl:   4rem      / 64px  → line-height: 4.5rem  / 72px
--font-size-hero:  5rem      / 80px  → line-height: 5.5rem  / 88px
```

### 3.4 Spacing System — 8px Grid

All spacing, padding, margins, and sizing snap to the **8px base grid** (4px for micro-adjustments like icon gaps, borders, fine padding).

```
4px   → 0.25rem   (micro: icon-text gaps, badge padding)
8px   → 0.5rem    (tight: inline spacing)
16px  → 1rem      (base: paragraph gaps, card padding-sm)
24px  → 1.5rem    (comfortable: section inner padding)
32px  → 2rem      (generous: card padding, component gaps)
40px  → 2.5rem    (between related sections)
48px  → 3rem      (section padding mobile)
64px  → 4rem      (section padding tablet)
80px  → 5rem      (section padding desktop)
96px  → 6rem      (hero padding)
120px → 7.5rem    (major section breaks)
160px → 10rem     (hero/full-bleed sections)
```

### 3.5 Grid & Layout

- **Max content width:** 1280px (80rem)
- **Narrow content:** 768px (48rem) — for long-read text
- **Wide bleed:** 1440px (90rem) — for hero/feature sections
- **Column grid:** 12-column on desktop, 6 on tablet, 4 on mobile
- **Gutter:** 24px mobile / 32px desktop

---

## 4. Animation Strategy

### 4.1 Philosophy
Cinematic and immersive — the site should feel like navigating through a documentary film. Every animation serves the narrative.

### 4.2 Core Animation Patterns

| Pattern | Tool | Usage |
| --- | --- | --- |
| **Smooth Scroll** | Lenis | Global — wraps app in `<LenisProvider>` |
| **Scroll Reveals** | motion `useInView` + `useScroll` | Every section entrance |
| **Staggered Text** | motion `variants` with `staggerChildren` | Headlines, lists, author cards |
| **Parallax Layers** | motion `useTransform` + `useScroll` | Hero backgrounds, section dividers |
| **Page Transitions** | motion `AnimatePresence` + layout | Route changes (fade + slide) |
| **Number Counters** | motion `useMotionValue` + `animate` | Stats (800 soldiers, 16km, 215 days) |
| **Carousel** | Swiper + motion | Testimonials, chapter previews |
| **Hover Micro-interactions** | motion `whileHover` / `whileTap` | Buttons, cards, nav links |
| **Reveal Lines** | motion + CSS `clip-path` | Section dividers, horizontal rules |
| **Text Mask Reveal** | motion + `overflow: hidden` per line | Hero headline cinematic entrance |

### 4.3 Reduced Motion

**Every single animation** is wrapped in a reduced-motion check:

```jsx
// Hook: useReducedMotion.js
import { useReducedMotion } from 'motion';

// In components:
const prefersReducedMotion = useReducedMotion();

const variants = prefersReducedMotion
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }         // no animation
  : { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };  // full animation
```

Additionally in `global.css`:
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

Lenis will also be disabled when `prefers-reduced-motion: reduce` is active.

---

## 5. Project Structure

```
/
├── app/
│   ├── layout.jsx              ← Root layout (fonts, Lenis, SiteShell)
│   ├── page.jsx                ← Home page
│   ├── book/
│   │   └── page.jsx            ← Book page
│   ├── authors/
│   │   └── page.jsx            ← Authors page
│   ├── contact/
│   │   └── page.jsx            ← Contact page
│   ├── globals.css             ← Theme config, base styles, common patterns
│   └── favicon.ico
│
├── components/
│   ├── layouts/
│   │   ├── Header.jsx          ← Sticky/reveal nav with mobile menu
│   │   ├── Footer.jsx          ← Site footer
│   │   ├── SiteShell.jsx       ← Wraps Header + children + Footer
│   │   └── PageTransition.jsx  ← AnimatePresence wrapper for routes
│   │
│   ├── ui/
│   │   ├── Button.jsx          ← Primary, secondary, outline, ghost variants
│   │   ├── SectionHeading.jsx  ← Reusable heading + subtitle + ornament
│   │   ├── Container.jsx       ← Max-width wrapper (default, narrow, wide)
│   │   ├── Badge.jsx           ← Small label tags
│   │   ├── Divider.jsx         ← Animated section divider (line/ornament)
│   │   ├── AnimatedText.jsx    ← Line-by-line or word-by-word reveal
│   │   ├── ScrollReveal.jsx    ← Generic scroll-triggered reveal wrapper
│   │   ├── ParallaxLayer.jsx   ← Scroll-linked parallax wrapper
│   │   ├── CountUp.jsx         ← Animated number counter
│   │   ├── TestimonialCard.jsx ← Single testimonial display
│   │   ├── AuthorCard.jsx      ← Author photo + name + short bio
│   │   ├── Logo.jsx            ← Text-based logo (no asset needed)
│   │   └── FormInput.jsx       ← Styled input/textarea
│   │
│   ├── home/
│   │   ├── HomeHero.jsx        ← Full-viewport cinematic hero
│   │   ├── AuthorIntro.jsx     ← 3-author brief intro grid
│   │   ├── BookIntro.jsx       ← Book teaser with key facts
│   │   ├── StatsBar.jsx        ← Animated counters (800 soldiers, 16km, etc.)
│   │   ├── Testimonials.jsx    ← Swiper carousel
│   │   ├── CTABanner.jsx       ← Pre-order + newsletter dual CTA
│   │   └── ContactPreview.jsx  ← Compact contact form / info
│   │
│   ├── book/
│   │   ├── BookHero.jsx        ← Book-specific hero
│   │   ├── BookDetails.jsx     ← Full synopsis, chapter overview, key themes
│   │   ├── BookExcerpt.jsx     ← Styled excerpt block from the manuscript
│   │   ├── BookTimeline.jsx    ← Interactive timeline from the PDF data
│   │   ├── BookStats.jsx       ← Key numbers with animated counters
│   │   ├── BookTestimonials.jsx
│   │   └── BookContact.jsx
│   │
│   ├── authors/
│   │   ├── AuthorsHero.jsx     ← Authors page hero
│   │   ├── AuthorProfile.jsx   ← Detailed single-author section (reused x3)
│   │   ├── AuthorsCTA.jsx      ← CTA specific to author page
│   │   ├── AuthorsTestimonials.jsx
│   │   └── AuthorsContact.jsx
│   │
│   └── contact/
│       ├── ContactHero.jsx     ← Contact page hero
│       └── ContactSection.jsx  ← Full form + publisher info + social links
│
├── lib/
│   ├── constants.js            ← Site-wide data (nav links, social links, CTAs)
│   ├── content.js              ← All placeholder text content (extracted from manuscript)
│   ├── animations.js           ← Shared motion variants & transition presets
│   └── utils.js                ← Helper functions (cn, formatDate, etc.)
│
├── hooks/
│   ├── useScrollProgress.js    ← Scroll progress for parallax
│   ├── useLenis.js             ← Lenis instance access
│   └── useMediaQuery.js        ← Responsive breakpoint detection
│
├── public/
│   └── images/
│       └── .gitkeep            ← Placeholder for future assets
│
├── package.json
├── pnpm-lock.yaml
├── next.config.mjs
├── jsconfig.json               ← Path aliases (@/components, @/lib, etc.)
├── postcss.config.mjs
└── tailwind.config.js          ← (if needed for plugins, otherwise v4 CSS-only config)
```

---

## 6. File-by-File Breakdown

### 6.1 `app/globals.css`

```
@import "tailwindcss";

@theme {
  /* ---- Colors ---- */
  --color-stone-50 through --color-stone-950
  --color-crimson-50 through --color-crimson-950
  --color-olive-50 through --color-olive-950
  --color-medal-50 through --color-medal-950

  /* ---- Fonts ---- */
  --font-heading: var(--font-playfair-display);
  --font-body: var(--font-source-sans-3);

  /* ---- Spacing (custom tokens if needed beyond Tailwind defaults) ---- */
  /* Tailwind's default scale already uses 4px increments, so mostly native */

  /* ---- Border radius ---- */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}

@layer base {
  html        → font-family, antialiased, text color, bg color, scroll-behavior
  body        → font-body, base text size/line-height
  h1–h6      → font-heading, font weights, letter-spacing
  ::selection → crimson-100 bg, crimson-900 text
  focus-visible → crimson-500 ring
  reduced-motion media query (global kill switch)
}

@layer components {
  .section-padding   → responsive vertical padding (py-12 md:py-16 lg:py-20)
  .prose-content     → max-w-prose, text styles for long-read
  .container-default → max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  .container-narrow  → max-w-3xl mx-auto px-4 sm:px-6
  .container-wide    → max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8
}

@layer utilities {
  .text-balance → text-wrap: balance
  .text-pretty  → text-wrap: pretty
}
```

### 6.2 `app/layout.jsx`

```
- Import Playfair_Display, Source_Sans_3 from next/font/google
- Configure with subsets: ['latin', 'cyrillic'] (book has Russian references)
- Apply CSS variables via font.variable to <html>
- Wrap children in <SiteShell> (which includes Header, Footer, Lenis, PageTransition)
- Metadata: title, description, openGraph (from book synopsis)
```

### 6.3 `lib/constants.js`

```js
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'The Book', href: '/book' },
  { label: 'Authors', href: '/authors' },
  { label: 'Contact', href: '/contact' },
];

export const CTA_LINKS = {
  preorder: { label: 'Pre-Order Now', href: '#preorder' },
  newsletter: { label: 'Join the Newsletter', href: '#newsletter' },
  contact: { label: 'Get in Touch', href: '/contact' },
};

export const STATS = [
  { value: 800, suffix: '+', label: 'Soldiers in the Pipeline' },
  { value: 16, suffix: 'km', label: 'Underground Traversal' },
  { value: 215, suffix: ' days', label: 'Of Occupation' },
  { value: 22, suffix: '', label: 'Chapters of Testimony' },
];

export const SOCIAL_LINKS = [ /* placeholder */ ];
```

### 6.4 `lib/content.js`

All placeholder content extracted/adapted from the manuscript:

```js
export const BOOK = {
  title: 'Operation Stream 3.0',
  subtitle: 'Or the Russian Mission Impossible',
  genre: 'Documentary War Prose • Non-Fiction',
  publisher: 'CGG International W.L.L.',
  year: 2026,
  dedication: 'This book is dedicated to the defenders of Sudzha...',
  synopsis: '...', // 2-3 paragraph adapted from prologue
  excerpt: '...', // Select passage from Chapter 3 (the pipe)
  themes: ['Underground Warfare', 'Human Endurance', 'Civilian Resistance', ...],
  chapters: [ /* 22 chapter titles from TOC */ ],
};

export const AUTHORS = [
  {
    name: 'Angela Khachaturyan',
    role: 'Lead Author',
    bio: '...', // placeholder bio
    quote: '...', // pull from epilogue
  },
  {
    name: 'Maria Voronina',
    role: 'Co-Author',
    bio: '...',
    quote: '...',
  },
  {
    name: 'Victoria Kataeva',
    role: 'Co-Author',
    bio: '...',
    quote: '...',
  },
];

export const TESTIMONIALS = [
  // Placeholder testimonials styled as if from military historians,
  // reviewers, early readers — clearly marked as placeholder
];

export const TIMELINE = [
  // Chronological entries extracted from the PDF
  { date: 'August 6, 2024', event: 'AFU crosses border near Sudzha', type: 'invasion' },
  { date: 'March 13, 2025', event: 'Sudzha liberated', type: 'liberation' },
  // ... all entries
];
```

### 6.5 `lib/animations.js`

Centralized motion variants:

```js
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = { ... };
export const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
export const slideInLeft = { ... };
export const slideInRight = { ... };
export const scaleIn = { ... };
export const lineReveal = { ... };  // clip-path based
export const textMaskReveal = { ... }; // overflow-hidden line reveal
export const parallaxSlow = { ... };  // useTransform helper config

// Reduced-motion-safe wrapper
export function safeVariants(variants, prefersReducedMotion) {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  return variants;
}

// Shared transition presets
export const TRANSITION = {
  spring: { type: 'spring', stiffness: 100, damping: 20 },
  smooth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  slow: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  stagger: { staggerChildren: 0.08, delayChildren: 0.1 },
};
```

---

## 7. Page-by-Page Section Breakdown

### 7.1 HOME (`/`)

| # | Section | Component | Description | Animation |
| --- | --- | --- | --- | --- |
| 1 | **Hero** | `HomeHero` | Full-viewport. Large headline "Operation Stream 3.0" with text-mask reveal. Subtitle fades in. Dual CTA buttons (Pre-order + Read More). Subtle parallax on background texture. Scroll indicator at bottom. | Text mask line-by-line, parallax BG, floating scroll arrow |
| 2 | **Book Intro** | `BookIntro` | Split layout — left: book synopsis text, right: book cover placeholder (styled card with title typography). Badge: "Documentary War Prose". | Scroll reveal, stagger text |
| 3 | **Stats Bar** | `StatsBar` | Full-width band with 4 key stats in a row. Numbers animate (count up) when scrolled into view. | CountUp on intersection, slight scale |
| 4 | **Author Intro** | `AuthorIntro` | 3-column grid. Each author: avatar placeholder (initials in circle), name, role, 1-line bio, "Read more →" link to /authors. | Stagger cards left to right |
| 5 | **Testimonials** | `Testimonials` | Swiper carousel, 1 card visible on mobile, 2 on tablet, 3 on desktop. Autoplay with pause on hover. | Fade per slide, subtle parallax on quote marks |
| 6 | **CTA Banner** | `CTABanner` | Split: left side "Pre-order the Book" with button, right side "Join the Newsletter" with email input + submit. Warm stone-100 background. | Scroll reveal, hover animations on buttons |
| 7 | **Contact Preview** | `ContactPreview` | Compact section: heading + short text + "Get in Touch" button linking to /contact. Publisher info. | Simple fade up |

### 7.2 BOOK (`/book`)

| # | Section | Component | Description | Animation |
| --- | --- | --- | --- | --- |
| 1 | **Hero** | `BookHero` | Book title large, subtitle, genre badge, "Pre-order" CTA. Visual: abstract pipeline/tunnel motif using CSS gradients. | Text mask, gradient shift |
| 2 | **Book Details** | `BookDetails` | 3 subsections: Synopsis (long text), Key Themes (tag grid), Chapter Overview (expandable list of 22 chapters). | Stagger, accordion expand |
| 3 | **Timeline** | `BookTimeline` | Interactive vertical timeline built from PDF data. Alternating left/right cards. Color-coded: red for invasion events, olive for liberation. Scroll-linked progress line. | Line draws on scroll, cards reveal on intersection |
| 4 | **Excerpt** | `BookExcerpt` | Styled blockquote from Chapter 3 (the pipe traverse). Large italic serif text. Attribution. | Slow fade, parallax quote marks |
| 5 | **Stats** | `BookStats` | Reuse of StatsBar pattern with book-specific numbers. | CountUp |
| 6 | **Testimonials** | `BookTestimonials` | Same carousel component, book-specific reviews. | Swiper fade |
| 7 | **Contact** | `BookContact` | Same as ContactPreview. "Want to discuss the book? Get in touch." | Fade up |

### 7.3 AUTHORS (`/authors`)

| # | Section | Component | Description | Animation |
| --- | --- | --- | --- | --- |
| 1 | **Hero** | `AuthorsHero` | "Meet the Authors" — large heading. Subtext about the collaborative nature of the book. | Text mask reveal |
| 2 | **Author Profiles** | `AuthorProfile` ×3 | Each author gets a full-width alternating section (left-right-left). Avatar placeholder, full bio, personal quote from book, their specific contribution/perspective. Dividers between each. | Scroll reveal per section, image parallax |
| 3 | **CTA** | `AuthorsCTA` | "Their story, their words. Read the book." with pre-order button. | Fade up |
| 4 | **Testimonials** | `AuthorsTestimonials` | Author-focused testimonials. | Swiper |
| 5 | **Contact** | `AuthorsContact` | "Connect with the authors through the publisher." | Fade up |

### 7.4 CONTACT (`/contact`)

| # | Section | Component | Description | Animation |
| --- | --- | --- | --- | --- |
| 1 | **Hero** | `ContactHero` | "Get in Touch" — clean, minimal hero. | Simple fade |
| 2 | **Contact Section** | `ContactSection` | Two-column: Left — contact form (name, email, subject dropdown, message, submit). Right — publisher info (CGG International W.L.L.), email, social links, mailing address placeholder. Map placeholder. | Form fields stagger in, hover states on inputs |

---

## 8. Component Specifications

### 8.1 UI Components (Reusable)

#### `Button.jsx`
```
Props: variant ('primary'|'secondary'|'outline'|'ghost'), size ('sm'|'md'|'lg'), href, children, icon, iconPosition, disabled, loading, className, fullWidth

Primary   → bg-crimson-600 text-white hover:bg-crimson-700
Secondary → bg-stone-900 text-stone-50 hover:bg-stone-800
Outline   → border-2 border-stone-300 text-stone-900 hover:bg-stone-100
Ghost     → text-stone-700 hover:text-crimson-600 hover:bg-stone-100

All: rounded-lg (--radius-lg: 16px), px-6 py-3 (md), font-body font-semibold
     motion whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
     focus-visible:ring-2 ring-crimson-500 ring-offset-2
     transition-colors duration-200

Renders <a> if href, <button> otherwise.
```

#### `Container.jsx`
```
Props: size ('default'|'narrow'|'wide'), as (HTML tag), className, children

default → max-w-7xl (1280px)
narrow  → max-w-3xl (768px)
wide    → max-w-[90rem] (1440px)

All: mx-auto px-4 sm:px-6 lg:px-8
```

#### `SectionHeading.jsx`
```
Props: title, subtitle, align ('left'|'center'), ornament (boolean), tag (HTML heading level), className

Renders heading (font-heading) + optional subtitle (font-body, text-stone-600) + optional decorative line/ornament below.
Wrapped in ScrollReveal.
```

#### `ScrollReveal.jsx`
```
Props: children, variants (default: fadeUp), className, delay, once (boolean, default true)

Wrapper using motion.div + useInView. Respects reduced motion.
```

#### `AnimatedText.jsx`
```
Props: text, as ('h1'|'h2'|'p'|etc), splitBy ('line'|'word'|'char'), className, delay

Splits text and animates each segment with stagger.
Uses overflow-hidden mask technique for cinematic line reveals.
```

#### `CountUp.jsx`
```
Props: end, suffix, duration, className

Uses motion useMotionValue + useInView to animate from 0 to end.
Respects reduced motion (shows final value immediately).
```

#### `TestimonialCard.jsx`
```
Props: quote, author, role, className

Styled card with large quote marks (Playfair italic), text, attribution.
```

#### `AuthorCard.jsx`
```
Props: name, role, bio, quote, imageUrl (optional), className

Initials-based avatar fallback, name, role badge, short bio.
```

#### `Divider.jsx`
```
Props: variant ('line'|'ornament'|'dots'), className

Animated horizontal rule. Line variant uses scaleX from 0 to 1 on scroll.
```

#### `FormInput.jsx`
```
Props: label, type, name, placeholder, required, error, textarea (boolean), className

Floating label or top-label input with focus ring, error state.
```

### 8.2 Layout Components

#### `Header.jsx`
```
- Sticky header that hides on scroll-down, reveals on scroll-up (useScroll + useMotionValueEvent)
- Desktop: Logo (text-based) left, nav links center, CTA button right
- Mobile: Logo left, hamburger right → full-screen overlay menu with staggered link animation
- Background: transparent on hero → bg-white/90 backdrop-blur on scroll (via scroll threshold)
- Active link: crimson-600 underline
```

#### `Footer.jsx`
```
- 4-column grid: Brand/description, Quick Links, Book Info, Contact/Social
- Bottom bar: copyright + "CGG International W.L.L."
- Background: stone-950 with stone-400 text
- Subtle top border with crimson accent
```

#### `SiteShell.jsx`
```
- Wraps app in LenisProvider (with reduced-motion check — disabled if prefers-reduced-motion)
- Includes Header + main + Footer
- Handles PageTransition (AnimatePresence) at the route level
```

#### `PageTransition.jsx`
```
- AnimatePresence with mode="wait"
- Each page wrapped in motion.main with fade + subtle Y slide
- Key derived from pathname
```

---

## 9. Responsive Breakpoints

Following Tailwind defaults, mobile-first:

| Breakpoint | Width | Layout Notes |
| --- | --- | --- |
| **Default** (mobile) | < 640px | Single column, stacked everything, 48px section padding |
| **sm** | ≥ 640px | Minor adjustments, 2-col where appropriate |
| **md** | ≥ 768px | 2-column layouts activate, 64px section padding |
| **lg** | ≥ 1024px | Full layouts, 3-col grids, side-by-side hero, 80px section padding |
| **xl** | ≥ 1280px | Max container kicks in, generous whitespace |
| **2xl** | ≥ 1536px | Comfortable scaling |

---

## 10. Semantic HTML5 Structure

Every page follows this semantic skeleton:

```html
<body>
  <header role="banner">
    <nav aria-label="Main navigation">...</nav>
  </header>

  <main id="main-content">
    <article> <!-- for book/author content pages -->
      <section aria-labelledby="section-heading-id">
        <h2 id="section-heading-id">...</h2>
        ...
      </section>
    </article>
  </main>

  <footer role="contentinfo">...</footer>
</body>
```

Additional semantic elements used throughout:
- `<figure>` + `<figcaption>` for images/quotes
- `<blockquote>` + `<cite>` for excerpts/testimonials
- `<time datetime="">` for timeline dates
- `<address>` for contact info in footer
- `<dl>`, `<dt>`, `<dd>` for stats/key-value displays where appropriate
- `<ol>` for timeline, `<ul>` for chapter lists
- Skip-to-content link as first focusable element
- Proper heading hierarchy (single h1 per page, sequential h2→h3→h4)
- ARIA labels on interactive elements (carousel controls, mobile menu toggle)

---

## 11. Content Strategy (Placeholder)

All content is derived from the uploaded manuscript and timeline PDF. Clearly marked as placeholder where fabricated.

| Content Block | Source | Notes |
| --- | --- | --- |
| Book title/subtitle | Manuscript title page | Verbatim |
| Book synopsis | Adapted from Prologue | 2-3 paragraphs, rewritten for marketing |
| Book excerpt | Chapter 3 (pipe traverse) | ~200 words, the most visceral passage |
| Chapter list | Table of Contents | All 22 titles |
| Timeline data | PDF chronology | All dates/events, categorized |
| Author names/roles | Manuscript credits | Verbatim |
| Author bios | Placeholder | Realistic but marked as placeholder |
| Author quotes | Selected from Epilogue/Epigraph | Attributed |
| Stats | Manuscript + PDF | 800 soldiers, 16km, 215 days, 142cm diameter, etc. |
| Testimonials | Fabricated placeholder | Clearly marked, from fictional "reviewers" |
| Dedication | Manuscript | Verbatim |
| Publisher info | Manuscript copyright page | CGG International W.L.L., 2026 |

---

## 12. Performance Considerations

- **Images**: No real images yet — use CSS-generated placeholders (gradient cards, initial-based avatars). When assets arrive, use `next/image` with proper sizing and blur placeholders.
- **Fonts**: Load only needed weights via `next/font/google` with `display: 'swap'`.
- **Motion**: Use `LazyMotion` + `domAnimation` features for reduced bundle. Only load full `domMax` features where needed.
- **Swiper**: Import only required modules (Navigation, Pagination, Autoplay, EffectFade).
- **Lenis**: Lightweight (~3KB), no concern.
- **Code splitting**: Next.js App Router handles this automatically per route.

---

## 13. Accessibility Checklist

- [x] Skip-to-content link
- [x] Proper heading hierarchy
- [x] ARIA labels on all interactive elements
- [x] `prefers-reduced-motion` respected everywhere
- [x] Color contrast ≥ 4.5:1 for all text (verified against palette)
- [x] Focus indicators on all interactive elements
- [x] Form labels associated with inputs
- [x] Carousel: keyboard navigable, pause controls, live region announcements
- [x] Mobile menu: focus trap, escape to close
- [x] Semantic landmarks (header, main, footer, nav)
- [x] `alt` text strategy ready for when images are added

---

## 14. Implementation Order

| Phase | Tasks | Priority |
| --- | --- | --- |
| **Phase 1: Foundation** | Project init, Tailwind config, fonts, globals.css, layout.jsx, SiteShell, Header, Footer | 🔴 Critical |
| **Phase 2: UI Kit** | Button, Container, SectionHeading, ScrollReveal, AnimatedText, Divider, CountUp | 🔴 Critical |
| **Phase 3: Home Page** | HomeHero → BookIntro → StatsBar → AuthorIntro → Testimonials → CTABanner → ContactPreview | 🔴 Critical |
| **Phase 4: Book Page** | BookHero → BookDetails → BookTimeline → BookExcerpt → BookStats → BookTestimonials → BookContact | 🟡 High |
| **Phase 5: Authors Page** | AuthorsHero → AuthorProfile ×3 → AuthorsCTA → AuthorsTestimonials → AuthorsContact | 🟡 High |
| **Phase 6: Contact Page** | ContactHero → ContactSection (form + info) | 🟡 High |
| **Phase 7: Polish** | Page transitions, Lenis fine-tuning, animation timing refinement, responsive QA, a11y audit | 🟢 Important |
| **Phase 8: Content Swap** | Replace placeholders with real content/images when provided | 🔵 When Ready |

---

*Plan created: February 28, 2026*
*For: Operation Stream 3.0 Book Website*
*Client: CGG International W.L.L.*
