# ⚡ Civilization OS — Full Ecosystem Wiring Map

**Owner:** Antwuan Divine Johns (@Worldwidebro)  
**Updated:** 2026-04-02  
**Total Repos:** 11 (local) + 690 (registered ventures)  
**Total Ventures:** 690 across 16 sectors  
**Active Stages:** 89 MVP + 72 Validation + 5 Growth  

---

## 1. THE MAP — How Everything Connects

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        CIVILIZATION OS ECOSYSTEM                         │
│                                                                          │
│  ┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐  │
│  │   THE OFFICE     │     │ AUTONOMOUS-       │     │  IZA-OS-RAG      │  │
│  │   (Backend)      │────▶│ VENTURE-STUDIO    │────▶│  (Knowledge)     │  │
│  │   Convex + Clerk │     │ (Orchestration)   │     │  LightRAG        │  │
│  │   Paddle + Pine  │     │  Python core      │     │  FastAPI :8000   │  │
│  └────────┬─────────┘     └────────┬──────────┘     └────────┬─────────┘  │
│           │                        │                          │            │
│           │  ┌─────────────────────┼──────────────────────────┘            │
│           │  │                     │                                      │
│           ▼  ▼                     ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │                      VENTURE-HUB (Portfolio)                         │ │
│  │   Next.js 16 · Supabase · Vercel · 690 venture pages · 16 sectors  │ │
│  │   /portfolio · /ventures · /directory · /sectors · /presell         │ │
│  │   ┌─────────────────────────────────────────────────────────────┐    │ │
│  │   │              PITCH-KIT (The Closer)                        │    │ │
│  │   │   Next.js 14 · Slidev · GSAP · Framer Motion · Vercel     │    │ │
│  │   │   /presentations · /showcase · /sandbox · /dashboard       │    │ │
│  │   └─────────────────────────────────────────────────────────────┘    │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │                     UPNEXT (Active Client Project)                    │ │
│  │  bw-001-contracts · bw-001-up-next · bw-001-up-next-business        │ │
│  │  bw-001-up-next-code · bw-001-up-next-web · up-next-marketplace     │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

### Data Flow (How It All Talks)

```
autonomous-venture-studio (venture pipeline, orchestration)
         │
         ▼
The Office (Convex DB → single source of truth for ventures, repos, metrics)
    │          │           │
    ▼          ▼           ▼
Pinecone   Paddle $     Clerk Auth
(vectors)  (payments)   (identity)
    │
    ▼
iza-os-rag-system (knowledge graph over all content)
    │
    ▼
venture-hub (displays 690 ventures, sectors, portfolio)
    │           │
    ▼           ▼
presell/     directory/
waitlist/    sectors/
    │
    ▼
pitch-kit (closes the deal for any specific venture)
    │
    ▼
Upnext repos (proof-of-concept: beauty marketplace client project)
```

---

## 2. PER-REPO TASK LIST & FULFILLMENT ROLE

### 🔴 REPO 1: THE OFFICE — Backend Infrastructure

**GitHub:** `github.com/Worldwidebro/the-office` (implied)  
**Stack:** Next.js 16 · Convex · Clerk · Paddle · Pinecone · Upstash · Resend · PostHog · Sentry  
**Fulfillment Role:** **DATA BACKBONE** — Single source of truth for all venture data, auth, payments, emails, and vector search. Every other repo reads from or writes to this.

| # | Task | Status | Priority | Blocks |
|---|------|--------|----------|--------|
| 1 | Configure Clerk JWT template for Convex | ❌ | P0 | All auth |
| 2 | Run `npx convex dev` and link project | ❌ | P0 | All DB operations |
| 3 | Set `.env.local` with all keys (Clerk, Convex, GitHub, Paddle) | ❌ | P0 | Everything |
| 4 | Run `npm run import:github` to seed repos | ❌ | P1 | Venture→repo mapping |
| 5 | Verify cron jobs sync repos every hour | ❌ | P2 | Stale data |
| 6 | Add Stripe webhook handler (currently Paddle only) | ❌ | P2 | Revenue tracking |
| 7 | Connect Paddle sandbox for test payments | ❌ | P1 | First dollar |
| 8 | Wire Sentry error tracking to production | ❌ | P2 | Observability |
| 9 | Set up PostHog feature flags for new pages | ❌ | P3 | A/B testing |
| 10 | Deploy to Vercel + configure Cloudflare DNS | ❌ | P1 | Public access |

**What It Provides to Others:**
- Venture CRUD API → venture-hub reads this
- GitHub sync → maps repos to ventures
- Auth (Clerk) → owner-only pages across all apps
- Payments (Paddle) → monetization for all ventures
- Email (Resend) → transactional emails for presell/waitlist
- Vector search (Pinecone) → iza-os-rag queries this
- Cache (Upstash) → rate limiting + session storage

---

### 🔴 REPO 2: AUTONOMOUS-VENTURE-STUDIO — Orchestration Engine

**GitHub:** `github.com/Worldwidebro/autonomous-venture-studio`  
**Stack:** Python 3.9+ · Convex client · Dash/Plotly · Docker  
**Fulfillment Role:** **BRAIN** — Coordinates all 690 ventures, runs agents, tracks execution, manages the venture lifecycle. Powers the "autonomous" in autonomous venture studio.

| # | Task | Status | Priority | Blocks |
|---|------|--------|----------|--------|
| 1 | Set up Python virtualenv with Python 3.12+ | ❌ | P0 | All Python |
| 2 | Install `requirements.txt` (currently empty — needs deps) | ❌ | P0 | All Python |
| 3 | Wire Convex client to The Office backend | ❌ | P1 | Live data |
| 4 | Start `EXECUTION_ORCHESTRATOR.py` and verify dashboard | ❌ | P1 | Monitoring |
| 5 | Start `BUSINESS_ECOSYSTEM_VISUALIZER.py` on :8002 | ❌ | P2 | Visualization |
| 6 | Start `REVENUE_TRACKER.py` on :8101 | ❌ | P2 | Revenue visibility |
| 7 | Dockerize with `docker-compose.yml` | ❌ | P3 | Deployment |
| 8 | Add scheduled tasks for venture pipeline progression | ❌ | P2 | Automation |
| 9 | Connect to GitHub API for multi-account repo management | ❌ | P2 | Repo creation |
| 10 | Build CLI for `venture create <id>` → auto-scaffold repo | ❌ | P3 | Scale 690→active |

**What It Provides to Others:**
- Venture lifecycle orchestration → moves ventures from idea → validation → MVP → growth
- Agent task queue → dispatches work to Claude Code, Qwen, etc.
- Revenue tracking → feeds dashboard metrics to venture-hub and pitch-kit
- Business ecosystem visualization → shows the whole portfolio at a glance
- Multi-GitHub-account management → 5 orgs, 204+ repos

---

### 🔴 REPO 3: IZA-OS-RAG-SYSTEM — Knowledge Retrieval

**GitHub:** `github.com/Worldwidebro/iza-os-rag-system`  
**Stack:** Python 3.12+ · LightRAG · RAGAnything · FastAPI · OpenAI  
**Fulfillment Role:** **MEMORY** — Makes all your knowledge queryable. Obsidian vault, venture data, repo SKILL.md files, PDFs, images — everything becomes a knowledge graph with relationship-aware answers.

| # | Task | Status | Priority | Blocks |
|---|------|--------|----------|--------|
| 1 | Create venv with Python 3.12+ | ❌ | P0 | All Python |
| 2 | Install `requirements.txt` | ❌ | P0 | All dependencies |
| 3 | Set `.env` with OPENAI_API_KEY + GITHUB_TOKEN | ❌ | P0 | All queries |
| 4 | Run `python src/ingest.py --source vault` (Obsidian) | ❌ | P1 | Knowledge base |
| 5 | Run `python src/ingest.py --source csv` (ventures) | ❌ | P1 | Venture knowledge |
| 6 | Run `python src/ingest.py --source skills` (SKILL.md) | ❌ | P2 | Repo knowledge |
| 7 | Start API: `uvicorn src.serve:app --reload` | ❌ | P1 | Query access |
| 8 | Test `/query` endpoint with venture question | ❌ | P2 | Validation |
| 9 | Ingest PDFs and images from business docs | ❌ | P3 | Multi-modal |
| 10 | Wire FastAPI into venture-hub as a search backend | ❌ | P3 | Smart search |

**What It Provides to Others:**
- Knowledge graph queries → "What ventures are in the beauty sector at MVP stage?"
- Multi-modal ingestion → PDFs, images, tables all searchable
- Relationship-aware answers → knows that BW-001 connects to Up Next marketplace
- API on :8000 → can be called from any other service

---

### 🟢 REPO 4: VENTURE-HUB — Portfolio & Public Face

**GitHub:** `github.com/Worldwidebro/venture-hub`  
**Stack:** Next.js 16 · React 19 · Supabase · Vercel · PostHog · Upstash  
**Fulfillment Role:** **SHOWCASE** — The front door of the entire ecosystem. 690 venture pages, 16 sectors, portfolio, directory, presell pages, waitlist forms. Where prospects discover you.

| # | Task | Status | Priority | Blocks |
|---|------|--------|----------|--------|
| 1 | Connect Supabase to venture_registry.json data | ❌ | P0 | All venture pages |
| 2 | Build `/` home page with hero + sector grid | ❌ | P0 | First impression |
| 3 | Build `/ventures` directory (687 pages, ISR) | ❌ | P0 | Browse all ventures |
| 4 | Build `/ventures/[id]` per-venture dashboard | ❌ | P0 | Venture deep-dive |
| 5 | Build `/sectors` + `/sectors/[sector]` (16 pages) | ❌ | P1 | Sector browsing |
| 6 | Build `/portfolio` — Antwuan Johns holdings view | ❌ | P1 | Investor page |
| 7 | Build `/presell/[slug]` — pre-sell product pages | ❌ | P1 | First dollar |
| 8 | Build `/waitlist/[slug]` — email capture pages | ❌ | P1 | Lead gen |
| 9 | Build `/hub` — owner command center | ❌ | P2 | Operations |
| 10 | Build `/directory` — A-Z company directory | ❌ | P2 | Discovery |
| 11 | Add `sitemap.xml` for 687 pages | ❌ | P1 | SEO |
| 12 | Add Vercel OG image API for social sharing | ❌ | P2 | Social proof |
| 13 | Add JSON-LD structured data | ❌ | P2 | Google Shopping |
| 14 | Configure ISR revalidation per page type | ❌ | P2 | Performance |
| 15 | Add link to pitch-kit: "See Interactive Demo →" | ❌ | P3 | Pitch flow |
| 16 | Build `/ecom` dashboard (EC priority ventures) | ❌ | P2 | Revenue ops |
| 17 | Build `/capital` funding pipeline tracker | ❌ | P3 | Kiva/SBA |
| 18 | Build `/legal` LLC/entity tracker | ❌ | P3 | Compliance |
| 19 | Wire PostHog analytics on all pages | ❌ | P2 | Conversion tracking |
| 20 | Deploy to Vercel + verify all 687 pages build | ❌ | P1 | Public access |

**What It Provides to Others:**
- Public portfolio → where prospects find you
- 687 venture pages → each one can link to its pitch-kit demo
- Presell/waitlist → revenue capture for specific ventures
- Sector taxonomy → organizes 690 ventures into 16 browseable categories
- SEO machine → 687 pages indexed by Google = free organic traffic
- Links TO pitch-kit → "Experience this venture interactively →"

---

### 🔵 REPO 5: PITCH-KIT — The Closer

**GitHub:** `github.com/Worldwidebro/pitch-kit`  
**Vercel:** `pitch-kit-zeta.vercel.app` (live)  
**Stack:** Next.js 14 · Slidev · GSAP + ScrollTrigger · Framer Motion · Tailwind  
**Fulfillment Role:** **CONVERSION ENGINE** — Turns prospects into clients. Scrollytelling, interactive sandbox, animated dashboard, and Slidev presentations. Hook → Demo → Experience → Proof → Close.

| # | Task | Status | Priority | Blocks |
|---|------|--------|----------|--------|
| 1 | ✅ Build core 4 modules (presentations, showcase, sandbox, dashboard) | ✅ Done | — | — |
| 2 | ✅ Create 3 Slidev decks (main, investor, product-demo) | ✅ Done | — | — |
| 3 | ✅ Deploy to Vercel, verify live | ✅ Done | — | — |
| 4 | Wire dashboard to pull live metrics from The Office (Convex) | ❌ | P1 | Real data |
| 5 | Build venture deck generator script from venture_registry.json | ❌ | P1 | Scale to 690 |
| 6 | Add per-venture pitch-kit pages: `/pitch/[venture-id]` | ❌ | P2 | Per-venture demos |
| 7 | Embed Up Next components in sandbox from bw-001-up-next-code | ❌ | P2 | Live demo |
| 8 | Add analytics tracking (PostHog) on pitch flow | ❌ | P2 | Conversion data |
| 9 | Add "Book a Call" CTA with Calendly integration | ❌ | P2 | Close mechanism |
| 10 | White-label mode for client-facing pitch kits | ❌ | P3 | Revenue |
| 11 | Auto-generate pitch-kit for every MVP-stage venture | ❌ | P3 | Scale |

**What It Provides to Others:**
- Interactive demo URLs → send to prospects/investors
- Scrollytelling experience → immersive pitch narrative
- Component sandbox → live product previews
- Dashboard with proof metrics → social proof + data
- Slidev decks → presenter-mode slide presentations
- The "close" step of the pitch flow

---

### 🟡 REPOS 6-11: UPNEXT — Active Client Project (Proof of Concept)

These 6 repos are your **first client project** — the beauty marketplace for Up Next. They are also the **case study** you demo in pitch-kit to close future clients.

#### REPO 6: bw-001-contracts — Legal & Contracts

**Fulfillment Role:** **LEGAL FRAMEWORK** — The contracts that close the deal. Also serves as the template for all future client contracts.

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Finalize MSA with Alexus Johnson | ❌ | P0 |
| 2 | Generate PDFs from markdown templates | ❌ | P1 |
| 3 | Create distribution packages for client | ❌ | P1 |
| 4 | Use as template for future client contracts | ❌ | P2 |

#### REPO 7: bw-001-up-next — Project Hub

**Fulfillment Role:** **PROJECT COORDINATION** — Central project documentation, onboarding, task tracking, and client communication.

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Complete onboarding questionnaire with client | ❌ | P0 |
| 2 | Finalize task checklist | ❌ | P1 |
| 3 | Update completion status as milestones hit | ❌ | P1 |
| 4 | Use as template for future project hubs | ❌ | P2 |

#### REPO 8: bw-001-up-next-business — Business Docs & Pitch Materials

**Fulfillment Role:** **CONTENT SOURCE** — Source material for pitch-kit slides. Pricing data, SOW content, and pitch narratives live here.

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Finalize $25K SOW scope | ❌ | P0 |
| 2 | Import pitch content into pitch-kit Slidev deck | ❌ | P1 |
| 3 | Generate client-facing contract packages | ❌ | P1 |
| 4 | Create retainer agreement template | ❌ | P2 |

#### REPO 9: bw-001-up-next-code — Application Code

**Fulfillment Role:** **LIVE PRODUCT** — The actual Next.js + Supabase + Stripe application. Components from this repo become the live demos in pitch-kit's sandbox.

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Set up Supabase project + run schema.sql | ❌ | P0 |
| 2 | Configure Clerk auth for customer/stylist roles | ❌ | P0 |
| 3 | Build booking flow (customer → stylist → payment) | ❌ | P1 |
| 4 | Build stylist dashboard | ❌ | P1 |
| 5 | Wire Stripe for payment processing | ❌ | P1 |
| 6 | Build customer dashboard | ❌ | P2 |
| 7 | Deploy web app to Vercel | ❌ | P1 |
| 8 | Extract key components for pitch-kit sandbox | ❌ | P2 |

#### REPO 10: bw-001-up-next-web — Frontend Web App

**Fulfillment Role:** **PUBLIC-FACING WEB APP** — The Next.js frontend that the client's customers see. Landing page, booking UI, stylist profiles.

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Set up Next.js project with Supabase + Tailwind | ❌ | P0 |
| 2 | Build landing page with stylist grid | ❌ | P1 |
| 3 | Build booking flow UI | ❌ | P1 |
| 4 | Configure Vercel deployment | ❌ | P1 |
| 5 | Cross-reference TASK_LIST.md | ❌ | P2 |

#### REPO 11: up-next-marketplace — Marketplace Component

**Fulfillment Role:** **MARKETPLACE ENGINE** — The core marketplace logic that connects stylists to customers. The key feature demoed in pitch-kit.

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Define marketplace data model | ❌ | P0 |
| 2 | Build stylist listing + search | ❌ | P1 |
| 3 | Build booking + scheduling engine | ❌ | P1 |
| 4 | Integrate with bw-001-up-next-code | ❌ | P1 |

---

## 3. THE UNIFIED ACCESS MAP — How to Show/Access Every Site

This is the key insight: **right now your sites are scattered across different domains, ports, and local dev servers.** Here's how to unify access so you can show ANY venture to ANYONE with a single URL.

### Current State (Scattered)

```
venture-hub-pi.vercel.app     →  Portfolio (690 ventures)
pitch-kit-zeta.vercel.app     →  Pitch Kit (demo closer)
localhost:3000                →  The Office (when running)
localhost:3030                →  Slidev decks (when running)
localhost:8000                →  IZA-OS-RAG API (when running)
localhost:8001-8102           →  Venture Studio dashboards (when running)
???                           →  Up Next beauty app (not deployed yet)
```

### Target State (Unified Access Layer)

```
worldwidebro.com                     →  YOUR HUB (main domain)
├── worldwidebro.com/ventures        →  690 venture pages
├── worldwidebro.com/sectors         →  16 sector pages
├── worldwidebro.com/portfolio       →  Your holdings
├── worldwidebro.com/pitch/[id]      →  Per-venture interactive demo
├── worldwidebro.com/directory       →  Full company directory
└── worldwidebro.com/presell/[slug]  →  Pre-sell pages

demo.worldwidebro.com                →  PITCH-KIT (subdomain)
├── demo.worldwidebro.com/presentations  →  Slide decks
├── demo.worldwidebro.com/showcase       →  Scrollytelling
├── demo.worldwidebro.com/sandbox        →  Component previews
└── demo.worldwidebro.com/dashboard      →  Metrics & proof

upnext.worldwidebro.com              →  UP NEXT BEAUTY APP (client demo)
├── upnext.worldwidebro.com              →  Customer landing page
├── upnext.worldwidebro.com/dashboard    →  Stylist dashboard
└── upnext.worldwidebro.com/booking      →  Booking flow

api.worldwidebro.com                 →  API LAYER (subdomain)
├── api.worldwidebro.com/ventures    →  Venture CRUD
├── api.worldwidebro.com/query       →  RAG knowledge graph
├── api.worldwidebro.com/analytics   →  Metrics
└── api.worldwidebro.com/webhooks    →  Stripe/Paddle/GitHub

hub.worldwidebro.com                 →  OWNER COMMAND CENTER (auth-gated)
├── hub.worldwidebro.com/            →  Mission control
├── hub.worldwidebro.com/ecom        →  ECOM dashboard
├── hub.worldwidebro.com/capital     →  Funding pipeline
└── hub.worldwidebro.com/legal       →  Entity tracker
```

### How to Get There (Task List)

| # | Task | Effort | Result |
|---|------|--------|--------|
| 1 | Point `worldwidebro.com` DNS to venture-hub Vercel project | 15 min | Main domain live |
| 2 | Add `demo` subdomain → pitch-kit Vercel project | 15 min | Pitch kit on custom domain |
| 3 | Deploy Up Next web app → `upnext` subdomain | 1 hr | Client demo live |
| 4 | Add CNAME for `api` → iza-os-rag or The Office API | 30 min | Unified API |
| 5 | Add CNAME for `hub` → venture-hub `/hub` with Clerk auth | 30 min | Owner dashboard |
| 6 | Configure Cloudflare for all subdomains + WAF | 1 hr | Security + CDN |
| 7 | Add SSL certificates (auto via Vercel + Cloudflare) | Auto | HTTPS everywhere |

**After this, you can send ANY of these URLs to a client:**
- `worldwidebro.com/ventures/ec-044-live-commerce-platform` — shows the venture page
- `demo.worldwidebro.com/pitch/ec-044` — interactive pitch demo for that venture
- `upnext.worldwidebro.com` — live working beauty marketplace

---

## 4. THE FULFILLMENT MATRIX — What Each Repo Gives to the Business

```
FULFILLMENT STAGE     WHO OWNS IT           WHAT REPO                OUTPUT
─────────────────────────────────────────────────────────────────────────────────
DISCOVER              venture-hub           Portfolio + sectors      Prospect finds you
   ↓                      ↓                      ↓                      ↓
HOOK                  pitch-kit             Slidev deck              "Here's the story"
   ↓                      ↓                      ↓                      ↓
DEMO                  pitch-kit             Sandbox                  "Here's the product"
   ↓                      ↓                      ↓                      ↓
EXPERIENCE            pitch-kit             Scrollytelling           "Feel the vision"
   ↓                      ↓                      ↓                      ↓
PROOF                 pitch-kit             Dashboard                "Here's the data"
   ↓                      ↓                      ↓                      ↓
CLOSE                 bw-001-contracts      MSA + SOW               "Sign here"
   ↓                      ↓                      ↓                      ↓
BUILD                 bw-001-up-next-code   Next.js + Supabase      Working product
   ↓                      ↓                      ↓                      ↓
DELIVER               bw-001-up-next-web    Vercel deployment        Live URL for client
   ↓                      ↓                      ↓                      ↓
SUPPORT               The Office            Convex + Clerk           Ongoing retainer
   ↓                      ↓                      ↓                      ↓
SCALE                 autonomous-studio     Orchestration            690 ventures × this
   ↓                      ↓                      ↓                      ↓
KNOW                  iza-os-rag            LightRAG                 "What did we decide?"
   ↓                      ↓                      ↓                      ↓
MONETIZE              The Office            Paddle + Stripe          Revenue flows in
```

---

## 5. THE CROSS-WIRING — Exact Connections Between Repos

### The Office ↔ venture-hub
```
The Office (Convex)                    venture-hub (Supabase)
  business_ventures ──────────────────▶  business_ventures
  venture_tasks ─────────────────────▶  venture_tasks
  repositories ──────────────────────▶  repositories
  revenue_tracking ──────────────────▶  revenue_tracking
                                         ↓
                                      Public pages rendered
                                      via ISR (5-min cache)
```

### The Office ↔ pitch-kit
```
The Office (Convex)                    pitch-kit (Next.js)
  revenue_tracking ──────────────────▶  /dashboard metrics
  venture_data ─────────────────────▶  /pitch/[id] content
  github_repos ─────────────────────▶  /sandbox component previews
```

### venture-hub ↔ pitch-kit
```
venture-hub                            pitch-kit
  /ventures/[id] ────── "Interactive Demo" link ──▶  /pitch/[id]
  /presell/[slug] ──── "Experience" link ─────────▶  /showcase
  /portfolio ───────── "How We Pitch" link ───────▶  /presentations
```

### bw-001-up-next-code ↔ pitch-kit
```
bw-001-up-next-code                    pitch-kit
  /apps/web/components/ ─────────────▶  /sandbox live previews
  /apps/web/pages/ ─────────────────▶  /sandbox embedded demos
  StylistCard, BookingFlow ─────────▶  Interactive component demos
```

### iza-os-rag ↔ Everything
```
iza-os-rag (FastAPI :8000)
  POST /query ──────────────────────▶  venture-hub smart search
  POST /query ──────────────────────▶  pitch-kit AI-powered content
  POST /ingest ─────────────────────▶  Ingest new venture docs
  GET /graph ───────────────────────▶  Knowledge graph export
```

### autonomous-venture-studio ↔ The Office
```
autonomous-venture-studio              The Office
  claim_next_task() ────────────────▶  aoc_tasks (agent queue)
  venture_lifecycle() ──────────────▶  business_ventures.stage
  revenue_tracker() ────────────────▶  revenue_tracking
  repo_scaffold() ──────────────────▶  repositories (create new repos)
```

---

## 6. THE MONETIZATION WIRING — Where Money Flows

```
CUSTOMER                VENTURE-HUB                 PITCH-KIT            THE OFFICE
   │                        │                          │                     │
   ├─ Discovers venture ──▶│                          │                     │
   │                        ├─ /presell/[slug] ───────▶│                     │
   │                        │   or /waitlist/[slug]    │                     │
   │                        │                          │                     │
   ├─ Experiences demo ────┼─────────────────────────▶│                     │
   │   (interactive pitch) │                          │                     │
   │                        │                          │                     │
   ├─ Buys product ────────┼──────────────────────────┼────────────────────▶│
   │   (Stripe/Paddle)      │                          │              Paddle webhook
   │                        │                          │              → revenue_tracking
   │                        │                          │                     │
   └─ Signs contract ──────┼──────────────────────────┼────────────────────▶│
       (MSA + SOW)         bw-001-contracts            │              → venture status
                                                  CLOSE!                   update
```

### Revenue Streams by Repo

| Revenue Stream | Source | Amount | Repo That Enables It |
|---------------|--------|--------|---------------------|
| Build fees | Client projects | $25-55K per | pitch-kit (closes) → contracts → code |
| Retainers | Ongoing support | $1.5-2K/mo | The Office (infrastructure) |
| Platform fees | Transaction % | 5% of GMV | bw-001-up-next-code (marketplace) |
| Pre-sell products | Digital products | $27-97 per | venture-hub (/presell) + Paddle |
| Pitch Kit SaaS | Subscription | $49-399/mo | pitch-kit (productized) |
| Portfolio mgmt SaaS | Subscription | $99-249/mo | venture-hub (productized) |
| Knowledge graph API | API access | $29-99/mo | iza-os-rag (productized) |

---

## 7. PRIORITY EXECUTION ORDER — What to Wire First

### Phase 1: Foundation (Week 1)
```
1. The Office → Get Convex + Clerk + .env working
2. venture-hub → Deploy to worldwidebro.com with basic pages
3. pitch-kit → Already live, add PostHog tracking
4. DNS → Point worldwidebro.com + subdomains via Cloudflare
```

### Phase 2: Data Wiring (Week 2)
```
5. The Office → venture-hub sync (venture data flows to portfolio)
6. venture-hub → pitch-kit links ("See Interactive Demo →")
7. iza-os-rag → Ingest venture data, start API
8. autonomous-venture-studio → Wire to Convex for live orchestration
```

### Phase 3: Live Product (Week 3)
```
9.  bw-001-up-next-code → Deploy beauty app to upnext.worldwidebro.com
10. pitch-kit → Embed Up Next components in sandbox
11. pitch-kit → Wire dashboard to pull live metrics from The Office
12. venture-hub → Build presell/waitlist pages for EC-044 + FIN-036
```

### Phase 4: Scale (Week 4+)
```
13. pitch-kit → Build venture deck generator from venture_registry.json
14. venture-hub → Auto-generate 690 venture pages with ISR
15. autonomous-venture-studio → Build `venture create` CLI scaffolding
16. Monetize → Open pitch-kit + venture-hub as SaaS for other agencies
```

---

## 8. QUICK REFERENCE — Every Repo at a Glance

| Repo | Stack | Port/URL | Role | Status |
|------|-------|----------|------|--------|
| The Office | Next.js + Convex + Clerk | localhost:3000 | Data backbone | 🔴 Not configured |
| autonomous-venture-studio | Python + Dash | :8001-8102 | Orchestration brain | 🔴 Not configured |
| iza-os-rag-system | Python + LightRAG + FastAPI | :8000 | Knowledge memory | 🔴 Not configured |
| venture-hub | Next.js 16 + Supabase | venture-hub-pi.vercel.app | Portfolio showcase | 🟡 Partially built |
| pitch-kit | Next.js 14 + Slidev + GSAP | pitch-kit-zeta.vercel.app | Conversion engine | 🟢 Live |
| bw-001-contracts | Markdown + PDF | N/A | Legal framework | 🟡 Templates ready |
| bw-001-up-next | Markdown docs | N/A | Project coordination | 🟡 Docs exist |
| bw-001-up-next-business | Markdown + PDF | N/A | Content source | 🟡 Docs exist |
| bw-001-up-next-code | Next.js + Supabase + Stripe | Not deployed | Live product | 🔴 Needs setup |
| bw-001-up-next-web | Next.js + Tailwind | Not deployed | Public web app | 🔴 Needs setup |
| up-next-marketplace | (submodule) | N/A | Marketplace engine | 🔴 Needs setup |

---

*This map is the single source of truth for how every repo in the Civilization OS ecosystem connects, what it does, what tasks remain, and how to access it. Update this file as repos are wired and deployed.*
