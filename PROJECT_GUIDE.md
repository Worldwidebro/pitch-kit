# ⚡ Civilization OS — Complete Project Guide

**Owner:** Antwuan Divine Johns (@Worldwidebro)
**Updated:** 2026-04-02
**Purpose:** The single document that tells you what to build, in what order, and why

---

## THE CORE INSIGHT

**venture-hub is the center of the universe.** It already works. It has real data, real pages, real APIs. Every venture already has a page at `/ventures/[id]` with live Supabase + Convex data. What's missing is: (1) it's not deployed, (2) it doesn't link to each venture's live site, and (3) pitch-kit doesn't connect to it.

---

## 1. EXECUTION ORDER: B → C → A

### Why this order?

| Order | Step | Why First |
|-------|------|-----------|
| **1st: B** | Deploy venture-hub to Vercel | It already works. 691 real venture pages. 16 real sector pages. Directory with search. Portfolio with client work. Live Supabase + Convex + ClickUp data. Just needs `vercel --prod`. |
| **2nd: C** | Register domain + configure DNS | Once venture-hub is live, we need `worldwidebro.com` to point to it. Then every subdomain routes correctly. $10-15/yr. 1 hour of work. |
| **3rd: A** | Build pitch-kit dynamic routes | Pitch-kit needs venture data to be useful. Venture-hub is that data source. Deploy venture-hub first → then pitch-kit can pull from it (or from the same Supabase/Convex backends). |

**The wrong order** would be A first (building dynamic routes in pitch-kit with no data source) — that's why pitch-kit currently has hardcoded fake metrics. Wire the data first, then build the views.

---

## 2. HOW VENTURE-HUB BECOMES THE CONTROL PANEL

Right now, venture-hub's `/ventures/[id]` page shows:
- ✅ Venture name, sector, stage, progress
- ✅ First dollar path, ICP profile, competitors
- ✅ Tasks from ClickUp
- ✅ Content pipeline
- ✅ Capital engine (grants, deals, financing) from Convex
- ✅ Compliance status
- ✅ GitHub repo link

**What's missing:** A link to the venture's **live running site** (localhost or deployed).

### The Missing Link: `live_url` Field

Every venture in the Supabase `business_ventures` table needs a `live_url` column:

```sql
-- ⚠️ PSEUDO-SQL — column names may not match your actual Supabase schema.
-- Verify schema with: SELECT column_name FROM information_schema.columns WHERE table_name = 'business_ventures';
ALTER TABLE business_ventures
ADD COLUMN live_url text;

-- Populate from CSV output (npm run generate-csv in pitch-kit)
-- Best approach: export CSV → import via Supabase dashboard or COPY command
-- Do NOT use a CASE statement — the CSV has the exact URL for each repo
-- Example import:
--   1. Run: cd pitch-kit && npm run generate-csv
--   2. Open Supabase dashboard → Table Editor → business_ventures
--   3. Import csv/REPO_URL_MAP.csv → map repo_name → business_id, deployed_url → live_url
```

### What the Venture Page Should Show

When you visit `/ventures/[id]` on venture-hub, it should show:

```
┌─────────────────────────────────────────────────────────┐
│  bw-001-up-next                                         │
│  BEAUTY & WELLNESS · MVP · Sprint 3 · Rank #1          │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  🔴 LIVE SITE  →  https://upnext.worldwidebro.com │  │
│  │  🟢 LOCALHOST  →  http://localhost:3001            │  │
│  │  📂 GITHUB     →  github.com/Worldwidebro/bw-001  │  │
│  │  📋 CLICKUP    →  app.clickup.com/t/xxx           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  First Dollar Path · ICP · Competitors · Tasks          │
│  Capital Engine · Grants · Deals · Compliance            │
└─────────────────────────────────────────────────────────┘
```

**The "LOCALHOST" link** is the key. When a developer (you) is running locally, each venture's Next.js app runs on a different port:
- `bw-001-up-next` → `http://localhost:3001`
- `venture-hub` → `http://localhost:3000`
- `pitch-kit` → `http://localhost:3002`
- `the-office` → `http://localhost:3003`

**The "LIVE SITE" link** is the deployed URL from the CSV we generated.

### How to Show Localhost Per Venture

> ⚠️ **Only ~5 repos have runnable local dev servers.** The `local_port` field only makes sense for repos with their own Next.js project. The other 848 repos are either backend scripts, bot configs, or template repos with no local dev server. Only add `local_port` for repos that actually have `npm run dev`.

Known repos with local dev servers:

| Repo | Default Port | URL |
|------|-------------|-----|
| venture-hub | 3000 | http://localhost:3000 |
| pitch-kit | 3000 | http://localhost:3000 |
| The office | 3000 | http://localhost:3000 |
| bw-001-up-next-web | 3000 | http://localhost:3000 |
| Upnext/bw-001-up-next-web | 3000 | http://localhost:3000 |

Since all default to port 3000, only one runs at a time locally. Use a `.env.local` or `PORT` env var to assign unique ports when running multiple:

```bash
PORT=3000 npm run dev   # venture-hub
PORT=3001 npm run dev   # pitch-kit
PORT=3002 npm run dev   # The office
PORT=3003 npm run dev   # bw-001-up-next-web
```

Add a `local_port` field to venture data (only for repos with a local dev server):

```sql
-- ⚠️ Only populate for repos that have npm run dev capability
ALTER TABLE business_ventures ADD COLUMN local_port integer;
UPDATE business_ventures SET local_port = 3000 WHERE business_id IN ('venture-hub','pitch-kit');
UPDATE business_ventures SET local_port = 3001 WHERE business_id = 'bw-001-up-next';
-- Leave NULL for all other repos (no local dev server)
```

Then in the venture page, show it as:

```tsx
{venture.live_url && (
  <a href={venture.live_url} target="_blank"
     className="px-5 py-2.5 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-semibold rounded-lg">
    🔴 Live Site ↗
  </a>
)}

{venture.local_port && (
  <a href={`http://localhost:${venture.local_port}`}
     className="px-5 py-2.5 border border-emerald-500/40 text-emerald-400 font-semibold rounded-lg">
    🟢 Localhost :{venture.local_port}
  </a>
)}
```

### The Dashboard Links to Every Site

The venture-hub `/directory` page (which already exists with search + grid/table view) should also show each venture's live URL. Currently it shows GitHub repo + a guessed Vercel URL. Replace the guess with the real `live_url` from the database.

---

## 3. HOW EACH VENTURE'S FRONTEND SHOWS ITS PAGES

This is the other side of the question. Not just "can venture-hub link to each venture" but "does each venture actually have a frontend to show?"

### The 4 Types of Venture Frontends

| Type | Count | What They Have | What They Show |
|------|-------|----------------|----------------|
| **Full web app** | ~30 | Own Next.js project with pages, API routes, UI | Their actual product (marketplace, dashboard, etc.) |
| **Pitch-kit demo page** | ~395 | Auto-generated page at `/demo/[id]` | Venture name, sector, stage, repo link, pitch narrative, sandbox preview |
| **Venture-hub portfolio page** | ~165 | Already exists at `/ventures/[id]` | Full venture profile with tasks, capital engine, content pipeline |
| **Internal only** | ~270 | No public frontend | Backend code, bots, scripts — linked from venture-hub but no standalone site |

### The Cross-Reference Flow

```
venture-hub/ventures/[id]
    │
    ├── "🔴 Live Site"     → Own deployed site (if full web app)
    ├── "🟢 Localhost"     → http://localhost:[port] (if running locally)
    ├── "📂 GitHub"        → github.com/Worldwidebro/[repo]
    ├── "📋 ClickUp"       → app.clickup.com/t/[task]
    │
    ├── "🎮 Interactive Demo" → demo.worldwidebro.com/demo/[id]
    │   (pitch-kit dynamic page — for ALL 395+ ventures)
    │
    └── "📊 Dashboard"     → hub.worldwidebro.com/ventures/[id]
        (venture-hub page — for ALL 691 ventures)
```

Every venture gets at least 2 URLs:
1. **venture-hub page** (always exists) — the full profile
2. **pitch-kit demo page** (for ventures in active sectors) — the interactive pitch

Plus, if the venture has its own web app, a 3rd URL for the live product.

---

## 4. WHAT POWERS WHAT — THE REAL WIRING (verified)

### Actually Wired (code exists, imports verified)

```
Supabase ──────► venture-hub
  (business_ventures, venture_audit, venture_tasks, venture_content)

Convex (The Office) ──► venture-hub
  (ventureFunctions:getVentureDetail)
  (capitalEngine:analyzeDeal)
  (capitalEngine:matchGrants)
  (capitalEngine:matchFunding)

ClickUp ────────► The Office ──► venture-hub
  (clickup_task_id linking)

GitHub ─────────► venture-hub
  (github_repo_url per venture)

Clerk ──────────► The Office
  (auth, user management)

Paddle ─────────► The Office
  (payments, subscriptions)

Pinecone ───────► The Office
  (vector embeddings)

Resend ─────────► The Office
  (emails: contract, notification, receipt, welcome, password reset)

Sentry ─────────► The Office
  (error tracking)
```

### Aspirational (documented but NOT wired yet)

```
The Office ────✕──► pitch-kit          (no Convex imports in pitch-kit)
venture-hub ───✕──► pitch-kit          (no shared types or data)
pitch-kit ─────✕──► /demo/[id]         (route doesn't exist)
pitch-kit ─────✕──► /sector/[slug]     (route doesn't exist)
186 iza-os bots ✕──► anything          (repos exist, no verified runtime wiring)
iza-os-rag ────✕──► pitch-kit search   (no API calls from pitch-kit)
```

---

## 5. PHASED EXECUTION PLAN

### Phase 1: Deploy What Works (Week 1, ~4 hours)

**Goal:** Get venture-hub live + domain registered

| # | Task | Effort | Result |
|---|------|--------|--------|
| 1.0 | **Prerequisite:** Commit + push uncommitted venture-hub changes (`package.json`, `package-lock.json`, `tsconfig.tsbuildinfo`) | 5 min | Clean working tree before deploying |
| 1.1 | Deploy venture-hub to Vercel | 15 min | Live at `hub.worldwidebro.com` (or Vercel URL first) |
| 1.2 | Register `worldwidebro.com` on Cloudflare | 15 min | Domain owned |
| 1.3 | Configure DNS: `hub.` + `demo.` + `api.` subdomains → Vercel | 30 min | All subdomains resolve |
| 1.4 | Add custom domains in Vercel | 15 min | `hub.worldwidebro.com` points to venture-hub |
| 1.5 | Add `live_url` + `local_port` columns to Supabase | 30 min | Every venture knows its live URL |
| 1.6 | Populate `live_url` from CSV data | 1 hr | 395 pitch-kit URLs, 165 hub URLs, 22 own-site URLs |
| 1.7 | Update venture-hub `/ventures/[id]` to show live_url + local_port | 1 hr | Every venture page links to its live site |
| 1.8 | Update venture-hub `/directory` to show live_url | 30 min | Directory shows real URLs instead of guessed ones |

**At the end of Phase 1:**
- venture-hub is live at `hub.worldwidebro.com`
- Every venture page links to its live site
- Every venture page links to its localhost (if running)
- The directory shows real URLs for all 691 ventures

---

### Phase 2: Wire Pitch-Kit to Venture Data (Week 2, ~8 hours)

**Goal:** Make pitch-kit serve real venture pages, not fake data

| # | Task | Effort | Result |
|---|------|--------|--------|
| 2.1 | Add `app/demo/[id]/page.tsx` to pitch-kit | 3 hr | Dynamic venture demo pages |
| 2.2 | Read venture_registry.json at build time in pitch-kit | 1 hr | Venture data available without API calls |
| 2.3 | Add `app/sector/[slug]/page.tsx` to pitch-kit | 2 hr | 16 sector pages with venture lists |
| 2.4 | Add `app/ventures/page.tsx` (searchable directory) | 2 hr | Browse all 691 ventures in pitch-kit |
| 2.5 | Replace hardcoded dashboard metrics with real Convex data | 2 hr | Live metrics in pitch-kit dashboard |
| 2.6 | Add "View in Hub" link on each pitch-kit demo page | 30 min | Cross-link to venture-hub full profile |

**What the `/demo/[id]` page shows:**

```
┌─────────────────────────────────────────────────────────┐
│  fin-036-arbitrage-nexus                                │
│  FINANCIAL SERVICES · MVP                                │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  1. THE HOOK                                      │  │
│  │  "Arbitrage Nexus — find pricing gaps across      │  │
│  │   financial markets in real time."                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  2. LIVE DEMO                                     │  │
│  │  [Interactive sandbox preview from repo]          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  3. PROOF                                         │  │
│  │  Status: Active | Stage: MVP | Sector: Financial  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  🔴 Live Site → (if deployed)                           │
│  📂 GitHub → github.com/Worldwidebro/fin-036             │
│  📊 Full Profile → hub.worldwidebro.com/ventures/fin-036 │
└─────────────────────────────────────────────────────────┘
```

**At the end of Phase 2:**
- pitch-kit serves 395 venture demo pages at `demo.worldwidebro.com/demo/[id]`
- 16 sector pages at `demo.worldwidebro.com/sector/[slug]`
- Dashboard shows real data from Convex
- Every page cross-links to venture-hub

---

### Phase 3: Deploy Remaining Web Apps (Week 3, ~6 hours)

**Goal:** Get the ~30 actual web app repos deployed to their own URLs

| # | Task | Effort | Result |
|---|------|--------|--------|
| 3.1 | Inventory which repos are deployable (have Next.js + vercel.json) | 1 hr | Clear list of what can go live |
| 3.2 | Run `vercel --prod` in each deployable repo | 3 hr | Each app gets its own Vercel project |
| 3.3 | Assign subdomains for deployed apps | 1 hr | `upnext.`, `aiboss.`, etc. |
| 3.4 | Update Supabase `live_url` for deployed apps | 30 min | venture-hub now links to real live sites |
| 3.5 | Test every link end-to-end | 30 min | No broken links in the ecosystem |

**Known deployable repos (have vercel.json):**
- `venture-hub` → `hub.worldwidebro.com` (Phase 1)
- `pitch-kit` → `demo.worldwidebro.com` (already deployed)
- `The office` → `api.worldwidebro.com`
- `bw-001-up-next-web` → `upnext.worldwidebro.com`
- `con-001-ace-construction` → `construction.worldwidebro.com`

---

### Phase 4: Wire the Bots + RAG (Week 4+, ongoing)

**Goal:** Connect the 186 IZA-OS bots and the RAG system to the live ecosystem

| # | Task | Effort | Result |
|---|------|--------|--------|
| 4.1 | Deploy iza-os-rag-system to `rag.worldwidebro.com` | 2 hr | Knowledge API live |
| 4.2 | Add RAG search to venture-hub and pitch-kit | 3 hr | Semantic search across all ventures |
| 4.3 | Inventory 186 IZA-OS bots — which are runnable? | 2 hr | Know which bots actually work |
| 4.4 | Create bot orchestration endpoint in The Office | 4 hr | Bots can be triggered via API |
| 4.5 | Wire pitch-kit search to RAG | 2 hr | "Ask about any venture" works |

---

## 6. THE COMPLETE URL MAP (what exists vs what needs building)

### Already Deployed

| Repo | URL | Status |
|------|-----|--------|
| pitch-kit | https://pitch-kit-zeta.vercel.app | ✅ Live (auto-deploys from GitHub) |

### Needs Deploying (has code, just needs `vercel --prod`)

| Repo | Target URL | Has vercel.json | Has Next.js |
|------|-----------|-----------------|-------------|
| venture-hub | hub.worldwidebro.com | ✅ | ✅ |
| The office | api.worldwidebro.com | ✅ | ✅ |
| bw-001-up-next-web | upnext.worldwidebro.com | ✅ | ✅ |
| con-001-ace-construction | construction.worldwidebro.com | ✅ | ✅ |

### Needs Dynamic Routes Built (pitch-kit doesn't have these yet)

| Route | Purpose | Status |
|-------|---------|--------|
| `/demo/[id]` | Interactive demo for each venture | ❌ Needs building |
| `/sector/[slug]` | Sector page with venture list | ❌ Needs building |
| `/ventures` | Searchable venture directory in pitch-kit | ❌ Needs building |

### Already Exists in venture-hub

| Route | Purpose | Status |
|-------|---------|--------|
| `/ventures/[id]` | Full venture profile | ✅ Works (Supabase + Convex) |
| `/ventures` | Venture listing | ✅ Works |
| `/sectors/[sector]` | Sector page | ✅ Works (reads registry JSON) |
| `/sectors` | Sector listing | ✅ Works |
| `/directory` | Searchable company directory | ✅ Works (Supabase API) |
| `/portfolio` | Resume + client work | ✅ Works (reads profile JSON) |
| `/presell/[slug]` | Presell/waitlist pages | ✅ Works |
| `/api/directory` | Directory API endpoint | ✅ Works |
| `/api/sectors` | Sectors API endpoint | ✅ Works |
| `/api/ventures` | Ventures API endpoint | ✅ Works |

---

## 7. WHAT TO DO RIGHT NOW (the next 4 hours)

```
1. Deploy venture-hub → vercel --prod in venture-hub directory
2. Register worldwidebro.com → Cloudflare ($10-15/yr)
3. DNS: hub.worldwidebro.com → CNAME → cname.vercel-dns.com
4. DNS: demo.worldwidebro.com → CNAME → cname.vercel-dns.com (already has pitch-kit)
5. Add live_url column to Supabase business_ventures
6. Populate live_url from CSV: npm run generate-csv in pitch-kit
7. Update venture-hub /ventures/[id] to show live_url + local_port
8. Update venture-hub /directory to show live_url
9. Commit + push everything
```

**Result:** venture-hub becomes the control panel. Every venture has a page. Every page links to the venture's live site, localhost, GitHub, and ClickUp. Pitch-kit continues serving the interactive demo experience. The two sites cross-link.

---

## 8. FILE REFERENCE — Where Everything Lives

| File | What It Does | Repo |
|------|-------------|------|
| `venture-hub/app/ventures/[id]/page.tsx` | Full venture profile (Supabase + Convex) | venture-hub |
| `venture-hub/app/sectors/[sector]/page.tsx` | Sector page with venture grid | venture-hub |
| `venture-hub/app/directory/page.tsx` | Searchable company directory | venture-hub |
| `venture-hub/app/portfolio/page.tsx` | Resume + client work | venture-hub |
| `venture-hub/app/api/directory/route.ts` | Directory API (Supabase) | venture-hub |
| `venture-hub/lib/convex.ts` | Convex client (The Office backend) | venture-hub |
| `venture-hub/lib/supabase-client.ts` | Supabase client | venture-hub |
| `pitch-kit/app/page.tsx` | Pitch-kit homepage | pitch-kit |
| `pitch-kit/app/dashboard/page.tsx` | Dashboard (hardcoded metrics) | pitch-kit |
| `pitch-kit/app/presentations/page.tsx` | Slidev presentations | pitch-kit |
| `pitch-kit/app/showcase/page.tsx` | Scrollytelling showcase | pitch-kit |
| `pitch-kit/app/sandbox/page.tsx` | Live component sandbox | pitch-kit |
| `pitch-kit/scripts/generate-repo-csv.py` | CSV generator (853 repos) | pitch-kit |
| `pitch-kit/scripts/generate-decks.ts` | Deck generator (113 decks) | pitch-kit |
| `pitch-kit/csv/REPO_URL_MAP.csv` | Full repo classification CSV | pitch-kit (gitignored, run `npm run generate-csv`) |
| `pitch-kit/POWER_FLOW_MAP.md` | Power flow + customer path visualization | pitch-kit |
| `pitch-kit/ECOSYSTEM_WIRING_MAP.md` | Wiring map for all 11 local repos | pitch-kit |
| `pitch-kit/FULL_REPO_MAP.md` | Full repo map (853 repos) | pitch-kit |
| `The office/convex/` | Convex backend functions (The Office is a Convex app, not standard Next.js) | The office |
| `The office/emails/` | Email templates (Resend) | The office |
| `The office/scripts/` | Data sync, seeding, and utility scripts | The office |
| `The office/lib/` | Shared libraries (Pinecone, Resend, Sentry, ClickUp, etc.) | The office |

> ⚠️ The Office uses Convex as its backend framework, not the Next.js App Router. The `app/` directory structure above was unverified — The Office's routes are defined as Convex functions in `convex/`, not as `page.tsx` files. Verify the actual structure before referencing specific paths.
