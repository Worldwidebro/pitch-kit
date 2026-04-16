# Architecture

## System Overview

Pitch Kit is a monorepo-style Next.js application that combines 4 distinct demo modules into a unified presentation system. Each module serves a different purpose in the pitch flow.

## The Pitch Flow

```
┌─────────┐     ┌─────────┐     ┌─────────────┐     ┌─────────┐     ┌─────────┐
│  HOOK    │────▶│  DEMO   │────▶│  EXPERIENCE  │────▶│  PROOF  │────▶│  CLOSE  │
│ Slidev   │     │ Next.js │     │ GSAP+Scroll  │     │Dashboard│     │   CTA   │
└─────────┘     └─────────┘     └─────────────┘     └─────────┘     └─────────┘
```

### Module 1: Presentations (Hook)
- **Tech:** Slidev
- **Purpose:** Tell the story, frame the problem
- **Input:** Markdown files in `slides/`
- **Output:** Interactive slide deck on port 3030
- **Key feature:** Live code, speaker notes, PDF export

### Module 2: Live Sandbox (Demo)
- **Tech:** Next.js + Framer Motion
- **Purpose:** Show the product — real working components
- **Route:** `/sandbox`
- **Key feature:** Interactive component previews with code copy

### Module 3: Scrollytelling (Experience)
- **Tech:** GSAP + ScrollTrigger
- **Purpose:** Immersive scroll-driven narrative
- **Route:** `/showcase`
- **Key feature:** 5 animation types (fade-up, slide-in, scale, parallax, reveal) + pinned sections

### Module 4: Dashboard (Proof)
- **Tech:** Framer Motion + CSS animations
- **Purpose:** Show the data — metrics, funnels, social proof
- **Route:** `/dashboard`
- **Key feature:** Animated bar charts, funnel visualization, testimonials

## Data Flow

```
slides/*.md ──▶ Slidev (port 3030)
                      │
                      ▼
app/page.tsx ──▶ Next.js (port 3000)
  ├── /presentations  ──▶ Slide deck browser
  ├── /showcase       ──▶ GSAP scrollytelling
  ├── /sandbox        ──▶ Component sandbox
  └── /dashboard      ──▶ Metrics dashboard
```

## Component Architecture

```
components/
├── ui/                    # Shared primitives
│   ├── Navigation.tsx     # Glass morphism nav bar
│   ├── Card.tsx           # Glass card + MetricCard
│   └── SectionHeading.tsx # Section titles with labels
├── scrollytelling/
│   └── ScrollSection.tsx  # GSAP ScrollTrigger wrapper
├── slides/                # Slide-specific (future)
├── demo/                  # Sandbox-specific (future)
└── dashboard/             # Dashboard-specific (future)
```

## GSAP Integration

GSAP is registered once on the client via `lib/gsap.ts`:

```typescript
import { registerGSAP } from "@/lib/gsap";
registerGSAP(); // Registers ScrollTrigger plugin
```

The `ScrollSection` component handles all GSAP lifecycle:
- Registers GSAP on mount
- Creates ScrollTrigger instances based on `animation` prop
- Cleans up triggers on unmount

## Extending

### Add a new slide deck
1. Create `slides/your-deck.md` with Slidev frontmatter
2. Add a script in `package.json`: `"slides:your-deck": "slidev slides/your-deck.md --open"`

### Add a new animation type
1. Add the type to `ScrollSectionProps.animation` union
2. Add the case in `ScrollSection.tsx` switch block
3. Add a demo section in `app/showcase/page.tsx`

### Add a new sandbox component
1. Add entry to `COMPONENTS` array in `app/sandbox/page.tsx`
2. Include the HTML code snippet for the code preview

### Add a new dashboard metric
1. Add entry to `METRICS` array in `app/dashboard/page.tsx`
2. The `MetricCard` component handles rendering automatically
