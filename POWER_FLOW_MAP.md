# ⚡ Civilization OS — Power Flow & Customer Path Map

**Owner:** Antwuan Divine Johns (@Worldwidebro)
**Updated:** 2026-04-02
**Total Repos:** 853
**CSV Data:** `csv/REPO_URL_MAP.csv`

---

## 1. THE MACHINE — What Powers What

```
╔══════════════════════════════════════════════════════════════════════╗
║                    CIVILIZATION OS — POWER HIERARCHY                  ║
║                                                                      ║
║   TIER 0: PRIMAL ENGINES (run themselves, power everything else)     ║
║   ┌──────────────────────┐    ┌─────────────────────────────────┐    ║
║   │  THE OFFICE          │    │  AUTONOMOUS-VENTURE-STUDIO      │    ║
║   │  • Convex DB         │◄──►│  • Python orchestration         │    ║
║   │  • Clerk auth         │    │  • AI agent execution           │    ║
║   │  • Paddle payments   │    │  • Repo scaffolding             │    ║
║   │  • Pinecone vectors  │    │  • Business logic               │    ║
║   │  • Resend emails     │    │  • Venture coordination         │    ║
║   │  • Twenty CRM        │    │                                 │    ║
║   │  • Sentry errors     │    │                                 │    ║
║   │  • ClickUp sync      │    │                                 │    ║
║   └──────────┬───────────┘    └───────────┬─────────────────────┘    ║
║              │                            │                          ║
║   TIER 1: KNOWLEDGE ENGINES (powered by Tier 0, power everything)   ║
║   ┌──────────┴───────────┐    ┌───────────┴─────────────────────┐    ║
║   │  IZA-OS-RAG-SYSTEM  │    │  VENTURE-FACTORY-CORE            │    ║
║   │  • Vector search     │    │  • Venture mass generation       │    ║
║   │  • Knowledge graph   │    │  • Config templating             │    ║
║   │  • RAG API :8000     │    │  • Repo scaffolding              │    ║
║   └──────────┬───────────┘    └───────────┬─────────────────────┘    ║
║              │                            │                          ║
║   TIER 2: TRANSMISSION GEARS (route power from engines to ventures)  ║
║   ┌──────────┴────────────────────────────┴──────────────────────┐   ║
║   │  186 IZA-OS BOTS                                               │   ║
║   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │   ║
║   │  │ Legal    │ │ Sales    │ │ Marketing│ │ Finance │  ...182   │   ║
║   │  │ Bot      │ │ Bot      │ │ Bot      │ │ Bot      │  more    │   ║
║   │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │   ║
║   └───────┼─────────────┼─────────────┼─────────────┼──────────────┘   ║
║           │             │             │             │                  ║
║   TIER 3: DISPLAY LAYER (what the world sees)                        ║
║   ┌───────┴─────────────┴─────────────┴─────────────┴──────────────┐ ║
║   │                                                                  │ ║
║   │  ┌─────────────────┐    ┌─────────────────┐                    │ ║
║   │  │  PITCH-KIT       │    │  VENTURE-HUB     │                    │ ║
║   │  │  (The Closer)    │    │  (The Portfolio)  │                    │ ║
║   │  │  demo.wwb.com    │    │  hub.wwb.com      │                    │ ║
║   │  │  • Presentations │    │  • 691 ventures   │                    │ ║
║   │  │  • Scrollytelling│    │  • 16 sectors     │                    │ ║
║   │  │  • Sandbox       │    │  • Directory      │                    │ ║
║   │  │  • Dashboard     │    │  • Presell pages  │                    │ ║
║   │  └────────┬────────┘    └────────┬──────────┘                    │ ║
║   │           │                      │                                │ ║
║   │  ┌────────┴──────────────────────┴─────────────────────────────┐ │ ║
║   │  │               577 VENTURES (Revenue Layer)                  │ │ ║
║   │  │                                                              │ │ ║
║   │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │ │ ║
║   │  │  │ ec- │ │ bw- │ │ fin-│ │ fh- │ │ lt- │ │ fs- │          │ │ ║
║   │  │  │ 114 │ │ 45  │ │ 37  │ │ 36  │ │ 30  │ │ 25  │          │ │ ║
║   │  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘          │ │ ║
║   │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │ │ ║
║   │  │  │ ps- │ │ mc- │ │ con-│ │ edu-│ │ em- │ │comm-│          │ │ ║
║   │  │  │ 22  │ │ 20  │ │ 20  │ │ 40  │ │ 50  │ │ 50  │          │ │ ║
║   │  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘          │ │ ║
║   │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                    │ │ ║
║   │  │  │ et- │ │tech-│ │ ht- │ │ ft- │ │ ace-│  + special repos   │ │ ║
║   │  │  │ 17  │ │ 57  │ │  ~  │ │  ~  │ │  ~  │                    │ │ ║
║   │  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                    │ │ ║
║   │  └──────────────────────────────────────────────────────────────┘ │ ║
║   └──────────────────────────────────────────────────────────────────┘ ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 2. THE CUSTOMER PATH — How a Prospect Becomes Revenue

```
PROSPECT DISCOVERS YOU
        │
        ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 1: DISCOVER (541 repos serve this phase)                     │
│                                                                     │
│  "Who is Worldwidebro and what does he build?"                     │
│                                                                     │
│  ├── venture-hub (hub.worldwidebro.com)                            │
│  │   └── 691 venture pages, 16 sector pages, directory            │
│  ├── aibossoslandingpage (aiboss.worldwidebro.com)                │
│  ├── All 577 ventures listed in portfolio                          │
│  └── SEO/content from mc- (media) repos                            │
│                                                                     │
│  POWER: venture-hub powered by The Office + IZA-OS-RAG            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 2: HOOK (71 repos)                                           │
│                                                                     │
│  "This is interesting — tell me more"                              │
│                                                                     │
│  ├── pitch-kit (demo.worldwidebro.com)                            │
│  │   └── Scrollytelling narrative, Hook slide                      │
│  ├── bw- ventures (beauty marketplace hook)                        │
│  ├── mc- ventures (media content hooks)                            │
│  └── des- tools (design/brand identity)                            │
│                                                                     │
│  POWER: pitch-kit powered by The Office (live data)                │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 3: DEMO (374 repos)                                          │
│                                                                     │
│  "Show me how it works"                                            │
│                                                                     │
│  ├── pitch-kit /demo/[id] pages (395 venture demos)                │
│  ├── pitch-kit /sandbox (live component previews)                  │
│  ├── pitch-kit /presentations (Slidev decks)                       │
│  ├── up-next-marketplace (upnext.worldwidebro.com) — live product  │
│  └── ec-/tech-/fin-/fh-/lt-/fs-/ps-/et- ventures                  │
│                                                                     │
│  POWER: pitch-kit + The Office + IZA-OS bots                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 4: EXPERIENCE (3 repos)                                      │
│                                                                     │
│  "Let me try it myself"                                            │
│                                                                     │
│  ├── pitch-kit /sandbox (interactive components)                   │
│  ├── des- design tools (visual identity builder)                   │
│  └── pitch-kit scrollytelling (immersive scroll experience)        │
│                                                                     │
│  POWER: pitch-kit GSAP + Framer Motion + live sandbox              │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 5: PROOF (39 repos)                                          │
│                                                                     │
│  "Prove it works — show me the numbers"                            │
│                                                                     │
│  ├── pitch-kit /dashboard (metrics, charts, testimonials)          │
│  ├── fin- ventures (financial proof)                               │
│  ├── unified-dashboard (cross-ecosystem analytics)                 │
│  └── The Office (live Convex data → dashboard)                    │
│                                                                     │
│  POWER: The Office → Convex queries → pitch-kit visualization      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 6: CLOSE (1 repo)                                            │
│                                                                     │
│  "I'm in — let's sign"                                             │
│                                                                     │
│  └── pitch-kit Close slide → contract templates                    │
│      → The Office (Paddle checkout)                                │
│      → Resend (contract email)                                     │
│                                                                     │
│  POWER: pitch-kit → The Office (Paddle payments + Resend emails)   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 7: BUILD (56 repos)                                          │
│                                                                     │
│  "We're building it now"                                           │
│                                                                     │
│  ├── The Office (Convex backend, auth, DB)                         │
│  ├── autonomous-venture-studio (orchestration)                     │
│  ├── venture-factory-core (repo scaffolding)                       │
│  ├── ai- repos (AI core platforms)                                 │
│  └── bw- ventures (active client builds)                           │
│                                                                     │
│  POWER: autonomous-venture-studio → venture-factory → The Office   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 8: DELIVER (47 repos)                                        │
│                                                                     │
│  "Here's your product"                                             │
│                                                                     │
│  ├── The Office (deployment, CI/CD, hosting)                       │
│  ├── xyops-integration (external tool bridge)                      │
│  ├── bw- ventures (client handoff)                                 │
│  └── ops- tools (operations handoff)                               │
│                                                                     │
│  POWER: The Office → Vercel → Client DNS                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 9: SUPPORT (253 repos)                                       │
│                                                                     │
│  "Keep it running"                                                 │
│                                                                     │
│  ├── 186 iza-os bots (automation, monitoring)                      │
│  ├── ops- tools (compliance, HR, procurement)                     │
│  ├── The Office (Sentry errors, ClickUp tickets)                   │
│  ├── leg- tools (legal, compliance)                                │
│  └── xyops-integration (external tool maintenance)                 │
│                                                                     │
│  POWER: IZA-OS bots → The Office (Sentry/ClickUp) → auto-resolve  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 10: SCALE (163 repos)                                        │
│                                                                     │
│  "Grow it bigger"                                                  │
│                                                                     │
│  ├── venture-hub (new sector pages, new ventures)                 │
│  ├── venture-pipeline (stage progression tracking)                 │
│  ├── venture-studio (cross-venture coordination)                   │
│  ├── em- ventures (emerging market expansion)                      │
│  ├── comm- ventures (community scale)                              │
│  ├── edu- ventures (education scale)                               │
│  └── ace- templates (program blueprints for scale)                 │
│                                                                     │
│  POWER: venture-factory → venture-pipeline → venture-hub display   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 11: KNOW (197 repos)                                         │
│                                                                     │
│  "Understand everything"                                           │
│                                                                     │
│  ├── IZA-OS-RAG (knowledge retrieval, vector search)               │
│  ├── 186 IZA-OS bots (department intelligence)                     │
│  ├── ai- repos (ML models, inference)                              │
│  ├── research- repos (R&D insights)                                │
│  ├── unified-dashboard (analytics)                                 │
│  └── wealth-optimization (financial intelligence)                  │
│                                                                     │
│  POWER: IZA-OS-RAG ← The Office (Pinecone) → feeds all bots       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 12: MONETIZE (437 repos)                                     │
│                                                                     │
│  "Turn it into revenue"                                            │
│                                                                     │
│  ├── 577 ventures → each a revenue stream                          │
│  ├── The Office (Paddle payments, billing)                         │
│  ├── fin- ventures (fintech revenue)                               │
│  ├── ec- ventures (e-commerce revenue)                             │
│  ├── wealth-optimization (portfolio aggregation)                   │
│  └── pitch-kit (closes deals → revenue)                            │
│                                                                     │
│  POWER: All ventures → The Office (Paddle) → Revenue → Reinvest   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. THE POWER FLOW MATRIX

### What Powers What

| Source | Powers | How |
|--------|--------|-----|
| **The Office** | Everything | Convex DB, Clerk auth, Paddle payments, Pinecone vectors, Resend emails, Twenty CRM, Sentry errors, ClickUp sync |
| **Autonomous-Venture-Studio** | venture-factory, venture-studio, venture-pipeline, all iza-os bots | Python orchestration, agent execution, repo scaffolding |
| **IZA-OS-RAG** | All 186 IZA-OS bots, pitch-kit search, venture-hub search | Vector search API, knowledge graph, retrieval augmented generation |
| **venture-factory-core** | All 577 ventures | Generates repo scaffolding, configs, and templates for new ventures |
| **venture-pipeline** | All 577 ventures | Tracks stage progression: idea → validation → MVP → growth |
| **pitch-kit** | All 577 ventures (client-facing) | Interactive demos, presentations, sandbox, dashboard |
| **venture-hub** | All 577 ventures (public-facing) | Portfolio display, directory, sector pages, presell pages |
| **186 IZA-OS bots** | Respective departments | Legal, sales, marketing, finance, HR, PM, content, compliance, research |

### What's Powered By What

| Dependent | Powered By | Needs |
|-----------|-----------|-------|
| **pitch-kit** | The Office | Live metrics, Convex data, auth |
| **venture-hub** | The Office, IZA-OS-RAG | Venture data, search |
| **All 577 ventures** | The Office, venture-factory, IZA-OS bots | Backend, scaffolding, automation |
| **IZA-OS bots** | IZA-OS-RAG, The Office | Knowledge, data |
| **Autonomous-Venture-Studio** | The Office | Convex DB for state |
| **venture-factory** | Autonomous-Venture-Studio | Orchestration layer |

---

## 4. URL & DNS ROUTING MAP

### Own Deployed Sites (22 repos → separate Vercel projects)

| Repo | URL | DNS Target | Role |
|------|-----|------------|------|
| the-office | https://api.worldwidebro.com | api.worldwidebro.com | Engine |
| iza-os-rag-system | https://rag.worldwidebro.com | rag.worldwidebro.com | Engine |
| venture-hub | https://hub.worldwidebro.com | hub.worldwidebro.com | Infrastructure |
| pitch-kit | https://demo.worldwidebro.com | demo.worldwidebro.com | Gear |
| aibossoslandingpage | https://aiboss.worldwidebro.com | aiboss.worldwidebro.com | Venture |
| up-next-marketplace | https://upnext.worldwidebro.com | upnext.worldwidebro.com | Venture |
| bw-001-up-next (MVP) | https://up-next.worldwidebro.com | up-next.worldwidebro.com | Venture |
| + 15 more bw- MVP ventures | https://[slug].worldwidebro.com | [slug].worldwidebro.com | Venture |

### Pitch-Kit Dynamic Pages (395 repos → served from demo.worldwidebro.com)

| Category | Count | URL Pattern | Example |
|----------|-------|-------------|---------|
| ec- (e-commerce) | 114 | demo.worldwidebro.com/demo/[id] | /demo/ec-111-tve-fragrance |
| tech- (technology) | 57 | demo.worldwidebro.com/demo/[id] | /demo/tech-046-ai-dev-platform |
| fin- (financial) | 37 | demo.worldwidebro.com/demo/[id] | /demo/fin-036-arbitrage-nexus |
| fh- (food) | 36 | demo.worldwidebro.com/demo/[id] | /demo/fh-014-ghost-kitchen |
| lt- (logistics) | 30 | demo.worldwidebro.com/demo/[id] | /demo/lt-015-same-day-delivery |
| fs- (fitness) | 25 | demo.worldwidebro.com/demo/[id] | /demo/fs-010-personal-training |
| ps- (professional) | 22 | demo.worldwidebro.com/demo/[id] | /demo/ps-021-seo-agency |
| et- (education) | 17 | demo.worldwidebro.com/demo/[id] | /demo/et-003-coding-bootcamp |
| mc- (media) | 20 | demo.worldwidebro.com/demo/[id] | /demo/mc-010-podcast-network |
| ht- (health tech) | ~ | demo.worldwidebro.com/demo/[id] | /demo/ht-004-telehealth |
| ft- (fintech) | ~ | demo.worldwidebro.com/demo/[id] | /demo/ft-001-payment-gateway |
| Sector pages | 16 | demo.worldwidebro.com/sector/[slug] | /sector/financial |

### Venture-Hub Pages (166 repos → served from hub.worldwidebro.com)

| Category | Count | URL Pattern |
|----------|-------|-------------|
| em- (emerging) | 50 | hub.worldwidebro.com/ventures/[id] |
| comm- (community) | 50 | hub.worldwidebro.com/ventures/[id] |
| edu- (education) | 40 | hub.worldwidebro.com/ventures/[id] |
| con- (construction) | 20 | hub.worldwidebro.com/ventures/[id] |
| unified-dashboard | 1 | hub.worldwidebro.com/dashboard |
| worldwidebro-holdings | 1 | worldwidebro.com/portfolio |
| + sector pages | 4 | hub.worldwidebro.com/sectors/[slug] |

### Internal Only (270 repos → no public URL)

| Category | Count | What They Do |
|----------|-------|--------------|
| iza-os bots | 186 | Department automation (legal, sales, marketing, etc.) |
| ops- tools | 15 | Internal operations (HR, compliance, procurement) |
| ai- core | 7 | AI/ML models and inference |
| venture-pipeline | 1 | Stage tracking |
| venture-studio | 1 | Cross-venture coordination |
| xyops-integration | 1 | External tool bridge |
| venture-factory | 1 | Venture generation engine |
| autonomous-venture-studio | 1 | Orchestration |
| research- / leg- / des- | ~57 | R&D, legal, design utilities |

---

## 5. DNS CONFIGURATION CHEAT SHEET

**⚠️ Prerequisite: Register worldwidebro.com first** (not currently registered)

```bash
# Step 1: Register domain on Cloudflare (~$10-15/yr)
# Step 2: Add these DNS records:

# Main sites (A records → Vercel)
worldwidebro.com        → CNAME → cname.vercel-dns.com
hub.worldwidebro.com    → CNAME → cname.vercel-dns.com
demo.worldwidebro.com   → CNAME → cname.vercel-dns.com

# Backend (CNAME → Vercel)
api.worldwidebro.com    → CNAME → cname.vercel-dns.com
rag.worldwidebro.com    → CNAME → cname.vercel-dns.com

# Client sites (CNAME → Vercel)
upnext.worldwidebro.com → CNAME → cname.vercel-dns.com
aiboss.worldwidebro.com → CNAME → cname.vercel-dns.com

# Step 3: Add domains in Vercel for each project
vercel domains add worldwidebro.com
vercel domains add hub.worldwidebro.com
vercel domains add demo.worldwidebro.com
vercel domains add api.worldwidebro.com
vercel domains add rag.worldwidebro.com
vercel domains add upnext.worldwidebro.com
vercel domains add aiboss.worldwidebro.com
```

---

## 6. SUMMARY STATS

| Metric | Count |
|--------|-------|
| Total repos | 853 |
| Own deployed sites | 22 |
| Pitch-kit dynamic pages | 395 |
| Venture-hub portfolio pages | 166 |
| Internal only | 270 |
| Engines | 5 |
| Infrastructure | 9 |
| Gears | 240 |
| Tools | 22 |
| Ventures | 577 |
| Sectors | 16 |
| MVP+Growth ventures | 94 |
| Total customer path phases served | 2,218 (across all repos) |

**Full data:** See `csv/REPO_URL_MAP.csv` for all 853 rows with 30 columns each. *(Run `npm run generate-csv` first — this file is gitignored since it's auto-generated.)*
