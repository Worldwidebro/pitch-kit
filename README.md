# ⚡ Pitch Kit

**Interactive Demo & Presentation System**

> Story + Interaction + Live Product + Visual Proof

Pitch Kit combines the best open-source presentation tools into a single, cohesive system for building demo experiences that actually close deals.

## 🎯 What This Is

Most people think: presentation = slides. The real answer is:

```
Presentation = Story + Interaction + Live Product + Visual Proof
```

Pitch Kit implements this as **4 integrated demo modules**:

| Module | Purpose | Tech |
|--------|---------|------|
| 🎤 **Presentations** | Interactive slide decks | Slidev (Markdown → slides) |
| ✨ **Scrollytelling** | Scroll-driven narratives | GSAP + ScrollTrigger |
| 🧪 **Live Sandbox** | Interactive component previews | Next.js + Framer Motion |
| 📊 **Dashboard** | Metrics, funnels, social proof | Animated dashboard UI |

## 🔄 The Pitch Flow

```
Hook (Slidev)
  → Demo (Next.js site)
    → Experience (GSAP scroll)
      → Proof (Dashboard)
        → Close (CTA / offer)
```

## 🛠 Tech Stack

- **Next.js 14** — App framework & SSR
- **Slidev** — Markdown → interactive slides
- **GSAP + ScrollTrigger** — Premium scroll animations
- **Framer Motion** — React animation primitives
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Type safety

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/your-org/pitch-kit.git
cd pitch-kit
npm install

# Run Next.js app (demo hub on port 3000)
npm run dev

# Run Slidev presentation (on port 3030)
npm run slides
```

## 📁 Project Structure

```
pitch-kit/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                   # Demo hub landing
│   ├── presentations/page.tsx     # Slide deck browser
│   ├── showcase/page.tsx          # GSAP scrollytelling demo
│   ├── sandbox/page.tsx           # Live component sandbox
│   ├── dashboard/page.tsx         # Metrics & proof dashboard
│   ├── layout.tsx                 # Root layout + navigation
│   └── globals.css                # Theme + utilities
├── components/
│   ├── ui/                        # Shared UI (Card, Navigation, SectionHeading)
│   ├── scrollytelling/            # GSAP ScrollSection component
│   ├── slides/                    # Slide-specific components
│   ├── demo/                      # Sandbox demo components
│   └── dashboard/                 # Dashboard-specific components
├── lib/
│   ├── constants.ts               # Demo modules, pitch flow, tech stack
│   ├── types.ts                   # TypeScript interfaces
│   ├── gsap.ts                    # GSAP registration utility
│   └── utils.ts                   # cn(), delay(), stagger()
├── slides/                        # Slidev markdown decks
│   ├── main-deck.md               # Full pitch presentation
│   ├── investor-deck.md           # Investor/fundraising deck
│   └── product-demo.md            # Product feature walkthrough
└── public/                        # Static assets
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (port 3000) |
| `npm run build` | Build Next.js for production |
| `npm run slides` | Start Slidev dev server (port 3030) |
| `npm run slides:build` | Build Slidev as SPA |
| `npm run slides:export` | Export Slidev to PDF |

## 🎨 Design System

- **Theme:** Dark mode with purple/violet accent (`#a78bfa`)
- **Glass morphism:** `.glass` and `.glass-strong` utility classes
- **Glow effects:** `.glow-sm`, `.glow-md`, `.glow-lg`
- **Background patterns:** `.bg-grid`, `.bg-dots`
- **Animations:** `fade-up`, `slide-in-right`, `shimmer`, `float`

## 🧩 Inspired By

This project combines patterns from:

- [Reveal.js](https://github.com/hakimel/reveal.js) — HTML presentations
- [Slidev](https://github.com/slidevjs/slidev) — Markdown → slides
- [Spectacle](https://github.com/FormidableLabs/spectacle) — React presentations
- [Storybook](https://github.com/storybookjs/storybook) — Component demos
- [GSAP](https://github.com/greensock/GSAP) — Premium animations
- [Lenis](https://github.com/studio-freight/lenis) — Smooth scroll
- [Magic UI](https://github.com/magicuidesign/magicui) — Animated components
- [Aceternity UI](https://github.com/aceternity/ui) — Landing animations
- [Remotion](https://github.com/remotion-dev/remotion) — Video from code
- [shadcn/ui](https://github.com/shadcn/ui) — UI components

## 📄 License

MIT
