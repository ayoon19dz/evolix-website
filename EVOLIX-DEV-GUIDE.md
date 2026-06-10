# EVOLIX AI — Development Reference Guide

> **Version:** 1.0  
> **Stack:** React 19 · TypeScript 6.0 · Vite 8 · Tailwind 3.4 · Framer Motion 12.38 · React Router v7  
> **Last updated:** 2026-06-10

---

## 1. Project Overview

EVOLIX AI is an AI services landing page offering:

- **AI Services** — Custom ML models, NLP pipelines, computer vision, LLM integrations
- **Automation** — End-to-end workflow automation
- **AI Agents** — Autonomous multi-step task agents

**Target audience:** Businesses seeking AI-powered scaling solutions.  
**Languages:** English (LTR) + Arabic (RTL).  
**Theme:** Dark-first with OLED-optimized dark mode + light mode toggle.

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19 | UI rendering |
| Language | TypeScript 6.0 | Type safety |
| Bundler | Vite 8 | Dev server + build |
| Routing | React Router DOM v7 | SPA routing |
| Styling | Tailwind CSS 3.4 | Utility-first CSS |
| Animations | Framer Motion 12.38 | Declarative animations |
| Icons | Lucide React 1.14 | SVG icon library |
| Testing | Vitest 4 + Playwright | Unit + E2E tests |
| Linting | ESLint + typescript-eslint | Code quality |
| Formatting | Prettier 3.8 | Code formatting |

---

## 3. Architecture & Data Flow

### Provider Hierarchy (wrapping order matters)

```
<LanguageProvider>         ← i18n dictionary + RTL direction
  <ThemeProvider>          ← dark/light CSS variables + localStorage
    <IntroAnimation />     ← pre-mount splash before showing UI
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route layout={<Layout />}>
          <Navbar />
          <Outlet />       ← animated via <PageTransition>
          <Footer />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
</LanguageProvider>
```

### State Management

- **No global state library** — Two React Contexts (`useLanguage`, `useTheme`) are sufficient.
- **No server state** — All data is static (hardcoded locale objects + `services.ts`).
- **Component-local state** — `useState`/`useMotionValue` for animations, sliders, etc.

### Data Flow

```
data/locales/en.ts  ──> useLanguage().t ──> components use t("hero.title")
data/locales/ar.ts  ──> useLanguage().t ──> components use t("hero.title")
data/services.ts    ──> imported directly in ServicesSection
```

---

## 4. Complete Project Structure

```
evolix-website/
├── .agents/
│   └── skills/
│       ├── seo-audit/SKILL.md           # Full SEO audit framework
│       ├── page-cro/SKILL.md            # Conversion rate optimization
│       ├── copywriting/SKILL.md         # AIDA, PAS, BAB copywriting
│       ├── marketing-expert/SKILL.md    # Master marketing agent
│       └── ai-seo/SKILL.md              # AEO/GEO/LLMO optimization
├── public/
│   ├── assets/                          # Service images (agents.png, automation.png, predictive.png)
│   ├── contact-bg.png
│   ├── favicon.svg
│   ├── hero-bg.png
│   └── icons.svg
├── src/
│   ├── main.tsx                         # Entry point
│   ├── App.tsx                          # Root component, routing, providers
│   ├── App.css                          # Legacy template CSS (minimal usage)
│   ├── assets/                          # Static imports (react.svg, vite.svg, hero.png)
│   ├── hooks/
│   │   ├── useLanguage.tsx              # i18n context (en/ar, RTL dir)
│   │   └── useTheme.tsx                 # Dark/light context
│   ├── data/
│   │   ├── services.ts                  # Service definitions array
│   │   └── locales/
│   │       ├── en.ts                    # English dictionary (158 keys)
│   │       └── ar.ts                    # Arabic dictionary (mirrors en.ts)
│   ├── styles/
│   │   ├── theme-tokens.css             # CSS custom properties (dark + light)
│   │   └── global.css                   # Tailwind directives + global styles
│   ├── pages/
│   │   ├── HomePage.tsx                 # Composes 6 sections
│   │   ├── ContactPage.tsx              # Contact hero + ContactCards
│   │   └── NotFound.tsx                 # 404 page
│   └── components/
│       ├── layout/
│       │   ├── Layout.tsx               # Outlet wrapper + scroll progress
│       │   ├── Navbar.tsx               # Sticky nav, mobile menu, lang/theme toggles
│       │   └── Footer.tsx               # 4-column footer, social links
│       ├── sections/
│       │   ├── HeroSection.tsx          # Animated words, terminal widget, CTAs, stats
│       │   ├── ServicesSection.tsx      # 3D tilt cards, bento grid
│       │   ├── AboutSection.tsx         # Animated counters, mission/values
│       │   ├── HowItWorksSection.tsx    # 3-step process (Analyze → Automate → Scale)
│       │   ├── ROICalculatorSection.tsx  # Interactive ROI calculator
│       │   ├── CTASection.tsx           # Final CTA glass card
│       │   └── ContactCards.tsx         # WhatsApp + Email contact cards
│       └── ui/
│           ├── CustomCursor.tsx         # Mouse-following dot + ring
│           ├── IntroAnimation.tsx       # 3-phase splash animation
│           ├── MagneticButton.tsx       # Mouse-tracking magnetic effect
│           ├── PageTransition.tsx       # Fade-up + blur page wrapper
│           └── SmoothScroll.tsx         # Custom smooth scroll container
├── marketingskills-main/                # External: 40+ marketing tool integrations
├── ui-ux-pro-max-skill-main/            # External: UI/UX design data for 18 stacks
├── index.html                           # HTML shell with font preconnects
├── vite.config.ts                       # Vite config (React plugin)
├── tailwind.config.ts                   # Extended Tailwind theme
├── tsconfig.json                        # Project references
├── tsconfig.app.json                    # App TypeScript config
├── tsconfig.node.json                   # Node TypeScript config
├── postcss.config.js                    # PostCSS (Tailwind + Autoprefixer)
├── eslint.config.js                     # Flat ESLint config
├── package.json                         # Scripts + dependencies
└── check-build.js                       # Build validation script
```

---

## 5. Component Tree

```
<App>
  ├── <LanguageProvider>
  │   └── <ThemeProvider>
  │       ├── <IntroAnimation />              (if !introComplete)
  │       ├── <div>                            (hidden until introComplete)
  │       │   └── <BrowserRouter>
  │       │       ├── <CustomCursor />
  │       │       └── <Routes>
  │       │           └── <Route path="/" element={<Layout />}>
  │       │               ├── <Navbar />
  │       │               │   ├── Logo
  │       │               │   ├── Desktop nav links
  │       │               │   ├── Language toggle (EN/AR)
  │       │               │   ├── Theme toggle (🌙/☀️)
  │       │               │   ├── CTA button
  │       │               │   └── Mobile hamburger menu
  │       │               ├── <Outlet />       ← wrapped in <PageTransition>
  │       │               │   ├── <HomePage>
  │       │               │   │   ├── <HeroSection />
  │       │               │   │   │   ├── AnimatedWord cycler
  │       │               │   │   │   ├── TerminalWidget
  │       │               │   │   │   ├── AiBadge
  │       │               │   │   │   ├── Parallax stats row
  │       │               │   │   │   └── CTAs (gradient + glass)
  │       │               │   │   ├── <HowItWorksSection />
  │       │               │   │   │   └── 3 Steps (Analyze → Automate → Scale)
  │       │               │   │   ├── <ServicesSection />
  │       │               │   │   │   ├── TiltCard × 3
  │       │               │   │   │   └── Bento grid layout
  │       │               │   │   ├── <ROICalculatorSection />
  │       │               │   │   │   ├── Sliders (team size, hours)
  │       │               │   │   │   └── AnimatedNumber results
  │       │               │   │   ├── <AboutSection />
  │       │               │   │   │   ├── AnimatedCounter × 3 (Projects, ROI, Satisfaction)
  │       │               │   │   │   └── Value pills
  │       │               │   │   └── <CTASection />
  │       │               │   │       └── Glass card + shimmer CTA
  │       │               │   ├── <ContactPage />
  │       │               │   │   └── <ContactCards />
  │       │               │   │       ├── WhatsApp card
  │       │               │   │       └── Email card
  │       │               │   └── <NotFound />
  │       │               └── <Footer />
  │       │                   ├── Brand + mission
  │       │                   ├── Company links
  │       │                   ├── Legal links
  │       │                   ├── Social links
  │       │                   └── Bottom aurora
```

---

## 6. Routing

### Route Table

| Path | Component | Layout | Notes |
|------|-----------|--------|-------|
| `/` | `HomePage` | `Layout` | 6-section landing page |
| `/contact` | `ContactPage` | `Layout` | Contact info + cards |
| `*` | `NotFound` | `Layout` | 404 catch-all |

### Anchor Scroll Behavior

Navbar links use `/#services`, `/#about` etc.

Handled in `Navbar.tsx` via `scrollIntoView({ behavior: 'smooth' })` with a `setTimeout(100)` to let the route render first. Only triggers when already on `/`.

### Adding a New Route

1. Create page in `src/pages/YourPage.tsx`
2. Import in `App.tsx`
3. Add `<Route path="/your-path" element={<YourPage />} />` inside the `<Route path="/" element={<Layout />}>` parent
4. Add nav link in `Navbar.tsx` (if needed)
5. Add locale keys in `en.ts` / `ar.ts`

---

## 7. Styling System

### 7.1 Tailwind Config (`tailwind.config.ts`)

**Key customizations:**

| Category | Tokens |
|----------|--------|
| Fonts | `sans` → Inter, `heading` → Space Grotesk, `mono` → JetBrains Mono |
| Colors | `brand` (#7c3aed), `brand-dark` (#5b21b6), `brand-light` (#a78bfa), `accent-cyan` (#06b6d4), `accent-indigo` (#6366f1), `accent-green` (#10b981) |
| Gradients | `aurora-gradient`, `brand-gradient`, `cyan-gradient` |
| Animations | `aurora`, `glow-pulse`, `float`, `spin-slow`, `fade-in-up` |
| Shadows | `brand`, `brand-lg`, `glass`, `card-hover` |
| Radius | `4xl` (2rem), `5xl` (2.5rem) |

### 7.2 CSS Custom Properties (`theme-tokens.css`)

Two themes toggled by `html[data-theme="dark"]` / `html[data-theme="light"]`:

```css
/* Dark (default) */
html[data-theme="dark"] {
  --bg-primary: #020203;
  --bg-secondary: #070711;
  --text-primary: #f1f5f9;
  --glass-bg: rgba(255, 255, 255, 0.03);
  /* ... */
}

/* Light */
html[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --text-primary: #0f172a;
  --glass-bg: rgba(0, 0, 0, 0.03);
  /* ... */
}
```

Use these tokens in components via `var(--bg-primary)`, `var(--text-primary)`, etc.

### 7.3 Global Styles (`global.css`)

**Major sections (506 lines total):**

| Section | Lines | What it does |
|---------|-------|-------------|
| Tailwind directives | 1-3 | `@tailwind base/components/utilities` |
| Base resets | 4-40 | Box-sizing, body (bg/text from CSS vars), RTL-aware font |
| Selection + scrollbar | 41-60 | Brand-colored selection, custom scrollbar |
| Grain noise overlay | 61-70 | `body::after` with SVG noise filter |
| Accessibility | 71-90 | Skip-link, `prefers-reduced-motion`, focus-visible |
| Aurora mesh | 91-115 | Animated gradient blob background |
| Glass card | 116-134 | Glassmorphism with border glow |
| Dot pattern | 135-148 | Background dot grid overlay |
| Gradient text | 149-154 | `.gradient-text` utility |
| AI typing dots | 155-175 | Animated typing indicator |
| Terminal window | 176-215 | `.terminal-window` chrome + line styling |
| Cyber grid | 216-235 | Perspective grid background |
| Bento box grid | 236-275 | 12-column responsive grid system |
| Shimmer effects | 276-310 | `.shimmer`, `.glow-pulse`, `.border-glow`, `.pulse-ring` |
| Range inputs | 311-330 | Styled slider tracks/thumbs |
| Scroll progress | 331-346 | Top progress bar |
| Nav indicators | 347-360 | Active section dot |
| Stagger animations | 361-390 | `.stagger-1` through `.stagger-8` |

### 7.4 RTL Support

Handled via attribute `html[dir="rtl"]`:

```css
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
html[dir="rtl"] .space-x-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
/* RTL-aware transforms, margins, paddings throughout */
```

When adding new components, always include RTL overrides for `left`/`right`, `translateX`, margins, and flexbox directions.

---

## 8. Internationalization

### Context: `useLanguage()`

```tsx
import { useLanguage } from '../hooks/useLanguage'

function MyComponent() {
  const { lang, toggleLang, t } = useLanguage()
  // lang: 'en' | 'ar'
  // toggleLang(): switches language
  // t: Dictionary (the active locale object)
  return <h1>{t("hero.title")}</h1>
}
```

### Dictionary Structure (`en.ts` / `ar.ts`)

```ts
export type Dictionary = {
  nav:     { services: string; about: string; contact: string; ... }
  common:  { getStarted: string; talkToExpert: string; ... }
  hero:    { title: string; subtitle: string; ... }
  services: { title: string; subtitle: string; items: Array<{ title: string; desc: string }> }
  howItWorks: { title: string; steps: Array<{ title: string; desc: string }> }
  roi:     { title: string; ... }
  about:   { title: string; stats: Array<{ value: string; label: string }> }
  cta:     { title: string; button: string }
  contactPage: { title: string; description: string }
  footer:  { company: { title: string; links: Array<{ label: string; href: string }> }; ... }
  notFound: { title: string; description: string; button: string }
}
```

### Adding a New Locale Key

1. Add the key-value to `en.ts` and `ar.ts` (both must match)
2. Update the `Dictionary` type in `en.ts` if adding new nested structure
3. Use `t("your.key")` in components (dot notation for nesting)

### Arabic RTL Considerations

- All `translateX` animations should check `lang === 'ar'` and reverse direction
- Flexbox `justify`/`align` styles may need toggling
- Text alignment defaults to RTL via CSS, but numbers/emails/phone stay LTR

---

## 9. Theming

### Context: `useTheme()`

```tsx
import { useTheme } from '../hooks/useTheme'

function MyComponent() {
  const { theme, toggle } = useTheme()
  // theme: 'dark' | 'light'
  // toggle(): switches theme
}
```

### How it works

- Stores preference in `localStorage` key `evolix-theme`
- Sets `html[data-theme="dark|light"]` on change
- CSS custom properties in `theme-tokens.css` respond to the attribute
- Defaults to `dark` on first visit

### Adding a New Theme-Aware Component

- Use CSS variable references: `color: var(--text-primary)`, `background: var(--bg-primary)`
- Use Tailwind dark prefix sparingly (CSS vars are preferred for consistency)
- Test in both themes before merging

---

## 10. Feature Deep Dives

### 10.1 IntroAnimation (`ui/IntroAnimation.tsx`)

A 3-phase splash screen shown once per session:

| Phase | Duration | Visual |
|-------|----------|--------|
| 1. Logo | ~2s | Letter-by-letter 3D reveal of "EVOLIX AI" |
| 2. Expand | ~2.5s | Logo expands, aurora blobs animate |
| 3. Done | ~0.5s | Fades out, main UI fades in |

**Props:** `onComplete: () => void` — called when all phases finish.

**State management:** `localStorage.setItem('evolix-intro-seen', 'true')` prevents re-show on refresh. Cleared if user hasn't visited in 24h.

**Contains:** Orbital ring animation, scanning line effect, loading progress bar, corner decorative lines, `AnimatePresence` for exit.

### 10.2 CustomCursor (`ui/CustomCursor.tsx`)

- Two elements: white dot (8px, `mix-blend-difference`) + purple ring (40px)
- Only activates on `matchMedia('(pointer: fine)')` (no touch devices)
- Detects hover over `a, button, input, textarea, [data-cursor-hover]` → scales ring to 1.5x, dot to 0.5x
- Uses `mousemove` listener on `window` with refs

### 10.3 MagneticButton (`ui/MagneticButton.tsx`)

- Wraps children and tracks mouse position relative to element center
- Applies spring-animated translateX/translateY via framer-motion `useSpring`
- Spring config: `damping: 15, stiffness: 150, mass: 0.1`
- Resets to (0,0) on mouse leave

### 10.4 SmoothScroll (`ui/SmoothScroll.tsx`)

- Fixed-position scroll container using framer-motion
- `useResizeObserver` on content to get total height
- `useScroll` from framer-motion provides `scrollYProgress`
- Spring-animated Y transform on inner container

**Usage:** Not currently wrapped in Layout — available as an opt-in wrapper.

### 10.5 PageTransition (`ui/PageTransition.tsx`)

```
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### 10.6 ROI Calculator (`ROICalculatorSection.tsx`)

- Two range sliders: Team Size (1-100), Manual Hours/Week (1-40)
- Uses CSS-styled `<input type="range">` + custom thumb
- Computation: `hoursSaved = teamSize * hoursPerWeek * 0.6`; `monthlySavings = hoursSaved * 25 * 4.33`
- Results displayed via `AnimatedNumber` component (spring-animated integer)
- CTA button at bottom

### 10.7 Terminal Widget (`HeroSection.tsx` — internal component)

- Simulated terminal with 5 lines of animated output
- Lines appear sequentially with typing effect (delays: 500ms, 1500ms, 2500ms, etc.)
- Shows mock AI commands: `analyze_workflow()`, `identify_bottlenecks()`, etc.
- Styled with `terminal-window` class from global.css

### 10.8 TiltCard (`ServicesSection.tsx` — internal component)

- Uses `onMouseMove` → `onMouseLeave` pattern
- Calculates rotateX/rotateY based on mouse position relative to card center
- Applied via framer-motion `style={{ transform: ... }}` with spring physics
- Contains corner accent lines that shift on hover
- Backdrop glow follows cursor

### 10.9 AnimatedCounter (`AboutSection.tsx` — internal component)

- Uses framer-motion `useMotionValue(0)` + `useSpring(value, { damping: 20, stiffness: 50 })`
- `useSpring` pipes into `useTransform` for integer rounding
- `useEffect` with `on()`, listener calls `value.set(targetNum)` once
- Counters: Projects (50+), ROI (10x), Satisfaction (99%)

---

## 11. Recipe: Add a New Page

```bash
npm run dev   # Start development server
```

**Step-by-step:**

1. **Create the page file** at `src/pages/YourPage.tsx`:
   ```tsx
   import { useLanguage } from '../hooks/useLanguage'
   import PageTransition from '../components/ui/PageTransition'

   export default function YourPage() {
     const { t } = useLanguage()
     return (
       <PageTransition>
         <section className="min-h-screen ...">
           <h1>{t("yourPage.title")}</h1>
         </section>
       </PageTransition>
     )
   }
   ```

2. **Register the route** in `src/App.tsx`:
   ```tsx
   import YourPage from './pages/YourPage'
   // Inside the layout route:
   <Route path="your-path" element={<YourPage />} />
   ```

3. **Add nav link** in `src/components/layout/Navbar.tsx`:
   ```tsx
   { navLinks.push({ path: '/your-path', label: t('nav.yourPage') }) }
   ```

4. **Add locale keys** in `src/data/locales/en.ts` and `src/data/locales/ar.ts`:
   ```ts
   yourPage: { title: 'Your Page Title', desc: 'Description' }
   ```

---

## 12. Recipe: Add a New Section to Home Page

1. **Create section component** at `src/components/sections/YourSection.tsx`:
   - Import `useLanguage()` for text
   - Use Tailwind + CSS vars for styling
   - Export as default function component

2. **Add to HomePage** in `src/pages/HomePage.tsx`:
   ```tsx
   import YourSection from '../components/sections/YourSection'
   // Add between existing sections:
   <>
     <HeroSection />
     <HowItWorksSection />
     <YourSection />  {/* new */}
     <ServicesSection />
     {/* ... */}
   </>
   ```

3. **Add locale keys** for any text used.

---

## 13. Recipe: Add a New Service

1. **Add service data** in `src/data/services.ts`:
   ```ts
   {
     id: 'your-service',
     icon: 'Zap',         // Lucide icon name (string)
     title: 'Your Service',
     desc: 'Description...',
   }
   ```

2. **Add locale keys** in `en.ts` / `ar.ts` under `services.items`:
   ```ts
   items: [
     { title: 'Existing', desc: '...' },
     { title: 'Your Service', desc: '...' }
   ]
   ```

3. **Update ServicesSection** if the layout (bento grid) needs adjustment. Currently handles 3 services — adding more may require changing the grid columns.

---

## 14. Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (hot reload) |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | ESLint across all `.ts`/`.tsx` files |
| `npm run preview` | Preview production build locally |
| `npx vitest` | Run unit tests |
| `npx playwright test` | Run E2E tests |
| `npx prettier --check src/` | Check formatting |

**Build output:** `dist/` directory.

---

## 15. Agent Skills Directory (`.agents/skills/`)

Skills for AI-assisted content/marketing workflows. Each is a markdown file loadable by AI coding agents:

| Skill File | Description |
|-----------|-------------|
| `seo-audit/SKILL.md` | Complete SEO audit framework (346 lines) |
| `page-cro/SKILL.md` | Conversion rate optimization methodology (182 lines) |
| `copywriting/SKILL.md` | AIDA, PAS, BAB copywriting frameworks (103 lines) |
| `marketing-expert/SKILL.md` | Master skill coordinating the above (48 lines) |
| `ai-seo/SKILL.md` | AI search optimization — AEO/GEO/LLMO (207 lines) |

### External Repositories (for reference / integration)

| Repo | Contents |
|------|----------|
| `marketingskills-main/` | 40+ marketing tool integrations (Ahrefs, GA4, HubSpot, Salesforce, etc.) + 2 skill definitions |
| `ui-ux-pro-max-skill-main/` | UI/UX design data for 18 stacks (React, Vue, Angular, Svelte, Flutter, etc.) + CLI tool |

---

## 16. Code Conventions

### Naming

| Category | Convention | Examples |
|----------|-----------|---------|
| Components | PascalCase | `HeroSection`, `Navbar` |
| Hooks | `use` prefix | `useTheme`, `useLanguage` |
| Data files | camelCase | `services.ts`, `en.ts` |
| CSS files | kebab-case | `theme-tokens.css`, `global.css` |
| Directories | lowercase | `components/ui/`, `data/locales/` |

### Imports Order

1. External libraries (`react`, `framer-motion`)
2. Internal hooks (`../hooks/useTheme`)
3. Internal data (`../../data/services`)
4. Internal components (`../layout/Navbar`)
5. Assets (`../../assets/hero.png`)

### Component Structure Pattern

```tsx
// 1. Imports
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage'

// 2. Types (if needed)
type Props = { title: string }

// 3. Component
export default function MyComponent({ title }: Props) {
  const { t } = useLanguage()
  return (
    <section>
      <h2>{title}</h2>
    </section>
  )
}
```

### CSS Rules

- Prefer Tailwind utilities for layout/spacing/typography
- Use CSS custom properties for theme-dependent colors
- Use `global.css` classes for complex effects (aurora, glass, terminal, shimmer)
- Add RTL overrides via `html[dir="rtl"]` in component-level CSS or inline styles
- Avoid `!important` unless overriding a third-party library

---

## 17. Performance Notes

- **Images** in `public/` are preloaded via `index.html` or loaded eagerly
- **Framer Motion** animations use `will-change` automatically; no manual optimization needed
- **Custom cursor** is passive (no reflows); throttling not required
- **Intro animation** localStorage check prevents re-animation on SPA navigation
- **ROI Calculator** re-renders only slider + result components
- **Build** uses Vite's default code splitting by route

---

## 18. Quick Checklist for Common Tasks

- [ ] Added locale keys to both `en.ts` and `ar.ts`?
- [ ] Wrapped new page content in `<PageTransition>`?
- [ ] Added RTL-aware styles for `left`/`right`/`translateX`?
- [ ] Tested in both dark + light themes?
- [ ] Tested in both English (LTR) + Arabic (RTL)?
- [ ] Added route to `App.tsx`?
- [ ] Added nav link (if needed)?
- [ ] `npm run build` succeeds with no TS errors?
- [ ] `npm run lint` passes?

---

*End of EVOLIX Development Reference Guide*
