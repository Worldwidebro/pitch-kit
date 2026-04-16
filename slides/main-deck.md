---
theme: default
title: Pitch Kit — Interactive Demo System
info: |
  Story + Interaction + Live Product + Visual Proof
  The complete pitch system for demos, presentations, and scrollytelling.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Pitch Kit

Interactive Demo & Presentation System

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/your-org/pitch-kit" target="_blank" alt="GitHub" class="text-xl slidev-icon-simple-logos:github"></a>
</div>

<div class="pt-12">
  <span class="text-sm px-4 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent">
    Story + Interaction + Live Product + Visual Proof
  </span>
</div>

---
layout: intro
---

# The Problem With Presentations

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="border border-red-500/30 rounded-xl p-6 bg-red-500/5">
    <h3 class="text-red-400 font-bold mb-3">❌ Most People Think</h3>
    <p class="text-lg text-zinc-400">Presentation = Slides</p>
    <p class="text-zinc-500 mt-2">Static. Boring. Forgettable.</p>
  </div>
  <div class="border border-emerald-500/30 rounded-xl p-6 bg-emerald-500/5">
    <h3 class="text-emerald-400 font-bold mb-3">✅ Real Answer</h3>
    <p class="text-lg text-zinc-300">Presentation =</p>
    <p class="text-accent font-bold text-xl mt-1">Story + Interaction + Live Product + Visual Proof</p>
  </div>
</div>

---
layout: center
---

# The Pitch Flow

<div class="flex items-center justify-center gap-4 mt-8">
  <div v-click class="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
    <div class="text-3xl font-bold text-accent">1</div>
    <div class="font-bold mt-1">Hook</div>
    <div class="text-xs text-zinc-500 mt-1">Tell the Story</div>
  </div>
  <div class="text-accent">→</div>
  <div v-click class="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
    <div class="text-3xl font-bold text-accent">2</div>
    <div class="font-bold mt-1">Demo</div>
    <div class="text-xs text-zinc-500 mt-1">Show the Product</div>
  </div>
  <div class="text-accent">→</div>
  <div v-click class="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
    <div class="text-3xl font-bold text-accent">3</div>
    <div class="font-bold mt-1">Experience</div>
    <div class="text-xs text-zinc-500 mt-1">Feel the Magic</div>
  </div>
  <div class="text-accent">→</div>
  <div v-click class="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
    <div class="text-3xl font-bold text-accent">4</div>
    <div class="font-bold mt-1">Proof</div>
    <div class="text-xs text-zinc-500 mt-1">Show the Data</div>
  </div>
  <div class="text-accent">→</div>
  <div v-click class="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
    <div class="text-3xl font-bold text-accent">5</div>
    <div class="font-bold mt-1">Close</div>
    <div class="text-xs text-zinc-500 mt-1">CTA / Offer</div>
  </div>
</div>

---
layout: two-cols
---

# 🎤 Step 1: Hook

**Tool:** Slidev + Reveal.js

- Open with a compelling narrative
- Use interactive slides, not PDFs
- Embed live code and media
- Make them lean forward

::right::

# 🧪 Step 2: Demo

**Tool:** Next.js + Storybook

- Transition to **live product**
- No slides — real working software
- Interactive component previews
- Let them touch it

---
layout: two-cols
---

# 🎬 Step 3: Experience

**Tool:** GSAP + Lenis

- Scrollytelling with pinned sections
- Parallax and timeline animations
- Immerse them in the experience
- Make it *feel* premium

::right::

# 📊 Step 4: Proof

**Tool:** Dashboard + Appsmith

- Show real metrics
- Sales funnel visualization
- Testimonials and social proof
- Make the data undeniable

---
layout: center
---

# Step 5: Close

<div v-click class="text-6xl font-bold text-accent mt-8">
  CTA / Offer
</div>

<div v-click class="mt-6 text-xl text-zinc-400">
  Strong call-to-action with urgency and clear next steps.
</div>

<div v-click class="mt-8 flex justify-center gap-4">
  <button class="rounded-xl bg-accent px-8 py-3 font-semibold text-surface">
    Get Started →
  </button>
  <button class="rounded-xl border border-surface-200 px-8 py-3 font-semibold text-zinc-300">
    Book a Demo
  </button>
</div>

---
layout: center
---

# Tech Stack

<div class="grid grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
  <div v-for="tech in [
    { name: 'Next.js', role: 'App framework' },
    { name: 'Slidev', role: 'Markdown → slides' },
    { name: 'GSAP', role: 'Scroll animations' },
    { name: 'Framer Motion', role: 'React animations' },
    { name: 'Tailwind CSS', role: 'Utility styling' },
    { name: 'TypeScript', role: 'Type safety' },
  ]" class="rounded-xl border border-surface-100 bg-surface-50 p-4 text-center">
    <div class="font-bold">{{ tech.name }}</div>
    <div class="text-xs text-zinc-500 mt-1">{{ tech.role }}</div>
  </div>
</div>

---
layout: center
---

# 4 Demo Modules

<div class="grid grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
  <div class="rounded-2xl border border-accent/20 bg-accent/5 p-6">
    <div class="text-2xl mb-2">🎤</div>
    <div class="font-bold">Presentations</div>
    <div class="text-sm text-zinc-400 mt-1">Slidev-powered interactive decks</div>
  </div>
  <div class="rounded-2xl border border-accent/20 bg-accent/5 p-6">
    <div class="text-2xl mb-2">✨</div>
    <div class="font-bold">Scrollytelling</div>
    <div class="text-sm text-zinc-400 mt-1">GSAP scroll-driven narratives</div>
  </div>
  <div class="rounded-2xl border border-accent/20 bg-accent/5 p-6">
    <div class="text-2xl mb-2">🧪</div>
    <div class="font-bold">Live Sandbox</div>
    <div class="text-sm text-zinc-400 mt-1">Interactive component previews</div>
  </div>
  <div class="rounded-2xl border border-accent/20 bg-accent/5 p-6">
    <div class="text-2xl mb-2">📊</div>
    <div class="font-bold">Dashboard</div>
    <div class="text-sm text-zinc-400 mt-1">Metrics, funnels, social proof</div>
  </div>
</div>

---
layout: center
---

# Quick Start

```bash
# Clone and install
git clone <this-repo> && cd pitch-kit
npm install

# Run Next.js app (demo hub)
npm run dev

# Run Slidev presentation
npm run slides
```

<div class="mt-6 text-sm text-zinc-500">
  Next.js runs on port 3000 · Slidev runs on port 3030
</div>

---
layout: center
---

# Now Build Yours

<div class="text-accent text-5xl font-bold mt-4">→</div>

<div class="mt-8 text-xl text-zinc-400">
  Customize the pitch flow.<br/>
  Add your product.<br/>
  Ship presentations that close.
</div>

<div class="mt-8">
  <a href="/" class="rounded-xl bg-accent px-8 py-3 font-semibold text-surface inline-block hover:bg-accent-bright transition-colors">
    Open Demo Hub →
  </a>
</div>
