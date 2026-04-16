#!/usr/bin/env npx tsx
/**
 * Pitch Kit — Deck Generator
 *
 * Reads venture_registry.json and auto-generates Slidev markdown decks:
 *   - 1 Master deck (all 690+ ventures)
 *   - 16 Sector decks (one per sector)
 *   - ~94 Individual venture decks (MVP + Growth stage only)
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx npx tsx scripts/generate-decks.ts
 *
 * Without GITHUB_TOKEN, GitHub API calls are rate-limited to 60/hr.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Types ---
interface Venture {
  id: string;
  name: string;
  sector: string;
  stage: string;
  status: string;
  repository_url: string;
  description?: string;
}

interface RegistryMetadata {
  total_ventures: number;
  sectors: Record<string, number>;
  stages: Record<string, number>;
}

interface Registry {
  civilization_os_venture_registry: {
    metadata: RegistryMetadata;
    ventures: Venture[];
  };
}

// --- Config ---
const CONFIG = {
  // Accept CLI arg, or use relative paths
  INPUT_JSON: process.argv[2] || path.resolve(__dirname, "../../venture-hub/data/venture_registry.json"),
  INPUT_JSON_FALLBACK: path.resolve(__dirname, "../data/venture_registry.json"),
  OUTPUT_DIR: path.resolve(__dirname, "../slides/generated"),
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
  // Only generate individual decks for these stages
  INDIVIDUAL_DECK_STAGES: ["mvp", "growth"],
};

const SECTOR_LABELS: Record<string, string> = {
  financial: "Financial Services",
  "beauty-wellness": "Beauty & Wellness",
  "food-hospitality": "Food & Hospitality",
  "fitness-sports": "Fitness & Sports",
  "logistics-transport": "Logistics & Transport",
  "professional-services": "Professional Services",
  "media-content": "Media & Content",
  "education-training": "Education & Training",
  "software-technology": "Software & Technology",
  "e-commerce": "E-Commerce",
  technology: "Technology",
  operations: "Operations",
  education: "Education",
  community: "Community",
  emerging: "Emerging Markets",
  specialized: "Specialized Industries",
};

const STAGE_COLORS: Record<string, string> = {
  planned: "text-zinc-400",
  validation: "text-blue-400",
  mvp: "text-emerald-400",
  growth: "text-accent",
};

// --- GitHub API ---
async function fetchRepoDescription(repoUrl: string): Promise<string> {
  if (!repoUrl || !repoUrl.includes("github.com")) {
    return "A venture in the Civilization OS ecosystem.";
  }

  try {
    const parts = repoUrl.split("github.com/")[1]?.split("/");
    if (!parts || parts.length < 2) return "A venture in the Civilization OS ecosystem.";

    const owner = parts[0];
    const repo = parts[1].replace(".git", "");

    const headers: Record<string, string> = { "User-Agent": "Pitch-Kit-Generator" };
    if (CONFIG.GITHUB_TOKEN) headers["Authorization"] = `token ${CONFIG.GITHUB_TOKEN}`;

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!res.ok) return "A venture in the Civilization OS ecosystem.";

    const data = (await res.json()) as { description?: string };
    return data.description || "A venture in the Civilization OS ecosystem.";
  } catch {
    return "A venture in the Civilization OS ecosystem.";
  }
}

// --- Slide Helpers ---
const slideSeparator = `\n---\n`;

function frontmatter(overrides: Record<string, string> = {}): string {
  const defaults: Record<string, string> = {
    theme: "default",
    class: "text-center",
    transition: "slide-left",
    mdc: "true",
  };
  const merged = { ...defaults, ...overrides };
  const lines = Object.entries(merged).map(([k, v]) => `${k}: ${v}`);
  return `---\n${lines.join("\n")}\n---\n`;
}

function heading(text: string): string {
  return `# ${text}\n`;
}

function stageBadge(stage: string): string {
  const color = STAGE_COLORS[stage] || "text-zinc-400";
  return `<span class="px-3 py-1 rounded-full border border-accent/20 bg-accent/10 ${color}">${stage.toUpperCase()}</span>`;
}

// --- Deck Generators ---

function generateMasterDeck(ventures: Venture[], sectors: string[]): string {
  const mvpCount = ventures.filter((v) => v.stage === "mvp").length;
  const growthCount = ventures.filter((v) => v.stage === "growth").length;
  const validationCount = ventures.filter((v) => v.stage === "validation").length;

  const sectorGrid = sectors
    .map((s) => {
      const label = SECTOR_LABELS[s] || s;
      const count = ventures.filter((v) => v.sector === s).length;
      return `<div class="rounded-xl border border-surface-100 bg-surface-50 p-3 text-center">
    <div class="font-bold">${label}</div>
    <div class="text-xs text-zinc-500 mt-1">${count} ventures</div>
  </div>`;
    })
    .join("\n  ");

  return `${frontmatter({ title: "Civilization OS — Master Venture Deck", info: `${ventures.length} ventures across ${sectors.length} sectors` })}
${heading("Civilization OS")}

<div class="text-xl text-zinc-400 mt-4">Master Venture Registry</div>

<div class="mt-8 flex justify-center gap-3">
  <span class="px-4 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent">${ventures.length} Ventures</span>
  <span class="px-4 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">${sectors.length} Sectors</span>
  <span class="px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400">853 Repos</span>
</div>
${slideSeparator}
layout: center
---

${heading("1. The Hook")}

<div class="text-2xl text-accent font-bold mt-8">
  853 Repositories · ${sectors.length} Sectors · 1 Unified OS
</div>

<div class="mt-6 text-zinc-400">
  Rebuilding foundational technology from the ground up.<br/>
  Every venture is a deployable business. Every repo is a product.
</div>
${slideSeparator}
layout: center
---

${heading("2. The Demo — By the Numbers")}

<div class="grid grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
  <div class="text-center">
    <div class="text-4xl font-bold text-accent">${growthCount}</div>
    <div class="text-sm text-zinc-500 mt-1">Growth Stage</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-emerald-400">${mvpCount}</div>
    <div class="text-sm text-zinc-500 mt-1">MVP Stage</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-blue-400">${validationCount}</div>
    <div class="text-sm text-zinc-500 mt-1">Validation Stage</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-zinc-400">${ventures.length - mvpCount - growthCount - validationCount}</div>
    <div class="text-sm text-zinc-500 mt-1">Planned</div>
  </div>
</div>
${slideSeparator}
layout: center
---

${heading("3. The Experience — Sector Map")}

<div class="grid grid-cols-4 gap-3 mt-8 max-w-5xl mx-auto">
  ${sectorGrid}
</div>
${slideSeparator}
layout: center
---

${heading("4. Proof — Live Deployments")}

<div class="grid grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
  <div class="rounded-xl border border-accent/20 bg-accent/5 p-6">
    <div class="font-bold">Pitch Kit</div>
    <div class="text-sm text-zinc-400 mt-1">Interactive Demo System</div>
    <a href="https://pitch-kit-zeta.vercel.app" class="text-accent text-sm mt-2 inline-block">Live →</a>
  </div>
  <div class="rounded-xl border border-accent/20 bg-accent/5 p-6">
    <div class="font-bold">Venture Hub</div>
    <div class="text-sm text-zinc-400 mt-1">Portfolio & Directory</div>
    <div class="text-zinc-500 text-sm mt-2">Coming Soon</div>
  </div>
</div>
${slideSeparator}
layout: center
---

${heading("5. The Close")}

<div class="text-5xl font-bold text-accent mt-8">Join the OS</div>

<div class="mt-8 flex justify-center gap-4">
  <a href="https://github.com/Worldwidebro" class="rounded-xl bg-accent px-8 py-3 font-semibold text-surface">
    Explore All 853 Repos →
  </a>
</div>
`;
}

function generateSectorDeck(sector: string, ventures: Venture[]): string {
  const label = SECTOR_LABELS[sector] || sector;
  const mvpVentures = ventures.filter((v) => v.stage === "mvp");
  const growthVentures = ventures.filter((v) => v.stage === "growth");
  const validationVentures = ventures.filter((v) => v.stage === "validation");
  const plannedVentures = ventures.filter((v) => v.stage === "planned");

  const ventureList = ventures
    .slice(0, 50) // Slidev can't render hundreds of items
    .map((v) => {
      const color = STAGE_COLORS[v.stage] || "text-zinc-400";
      return `<div class="flex items-center justify-between py-2 border-b border-surface-100">
    <span class="font-medium">${v.name}</span>
    <span class="${color} text-sm">${v.stage}</span>
  </div>`;
    })
    .join("\n  ");

  const activeGrid = [...growthVentures, ...mvpVentures]
    .slice(0, 8)
    .map(
      (v) =>
        `<div class="rounded-xl border border-accent/20 bg-accent/5 p-4">
    <div class="font-bold">${v.name}</div>
    <div class="text-xs text-zinc-500 mt-1">${v.stage.toUpperCase()}</div>
    <a href="${v.repository_url}" class="text-accent text-xs mt-2 inline-block">Repo →</a>
  </div>`
    )
    .join("\n  ");

  return `${frontmatter({ title: `${label} — Sector Deck`, info: `${ventures.length} ventures in the ${label} sector` })}
${heading(label)}

<div class="text-xl text-zinc-400 mt-4">${sector.toUpperCase()} SECTOR · Civilization OS</div>

<div class="mt-8">
  <span class="px-4 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent">${ventures.length} Ventures</span>
</div>
${slideSeparator}
layout: intro
---

${heading("1. The Hook")}

<div class="text-2xl text-accent font-bold mt-8">
  The ${label} sector powers the future.
</div>

<div class="mt-4 text-zinc-400">
  ${growthVentures.length} in growth · ${mvpVentures.length} at MVP · ${validationVentures.length} validating · ${plannedVentures.length} planned
</div>
${slideSeparator}
layout: center
---

${heading("2. Demo — Active Ventures")}

${activeGrid ? `<div class="grid grid-cols-2 gap-4 mt-8 max-w-3xl mx-auto">\n  ${activeGrid}\n</div>` : `<div class="mt-8 text-zinc-400">Ventures in development — check back soon.</div>`}
${slideSeparator}
layout: center
---

${heading("3. Experience — Full Fleet")}

<div class="max-h-96 overflow-y-auto text-left mx-auto max-w-2xl">
  ${ventureList}
</div>
${slideSeparator}
layout: center
---

${heading("4. Proof")}

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="text-center">
    <div class="text-4xl font-bold text-accent">${mvpVentures.length + growthVentures.length}</div>
    <div class="text-sm text-zinc-500 mt-1">Active Products</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-emerald-400">${ventures.length}</div>
    <div class="text-sm text-zinc-500 mt-1">Total Ventures</div>
  </div>
</div>
${slideSeparator}
layout: center
---

${heading("5. The Close")}

<div class="text-4xl font-bold text-accent mt-8">Deploy ${label}</div>

<div class="mt-8 flex justify-center gap-4">
  <a href="https://github.com/Worldwidebro?tab=repositories&q=${sector}" class="rounded-xl bg-accent px-8 py-3 font-semibold text-surface">
    Explore ${label} Repos →
  </a>
</div>
`;
}

function generateVentureDeck(venture: Venture): string {
  const label = SECTOR_LABELS[venture.sector] || venture.sector;
  const desc = venture.description || "A venture in the Civilization OS ecosystem.";

  return `${frontmatter({ title: `${venture.name} — Pitch Deck`, info: `${venture.name} · ${label} · ${venture.stage} stage` })}
${heading(venture.name)}

<div class="text-xl text-accent mt-4">${label.toUpperCase()}</div>

<div class="mt-6">
  ${stageBadge(venture.stage)}
</div>
${slideSeparator}
layout: intro
---

${heading("1. The Hook")}

<div class="text-2xl mt-8 text-zinc-300">${desc}</div>

<div class="mt-6 text-zinc-500">
  Venture ID: ${venture.id} · Sector: ${venture.sector}
</div>
${slideSeparator}
layout: center
---

${heading("2. The Demo")}

<div class="mt-8 p-6 border border-surface-100 rounded-xl bg-surface-50 max-w-lg mx-auto">
  <div class="font-mono text-sm text-zinc-400">// Component Preview</div>
  <div class="text-lg font-bold mt-2">${venture.name}</div>
  <div class="text-sm text-zinc-500 mt-1">Status: ${venture.status}</div>
</div>

<div class="mt-6">
  <a href="${venture.repository_url}" class="text-accent">Open Repository →</a>
</div>
${slideSeparator}
layout: two-cols
---

${heading("3. The Experience")}

**Integration Points**
- Built for the Civilization OS ecosystem
- Connects to IZA-OS orchestration layer
- Plug-and-play venture architecture
- Automated deployment pipeline

::right::

**User Journey**
- Discovery through Venture Hub
- Interactive demo via Pitch Kit
- Live product sandbox
- Data-driven proof of traction
${slideSeparator}
layout: center
---

${heading("4. Proof")}

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="text-center">
    <div class="text-4xl font-bold text-accent">${venture.stage === "growth" ? "Revenue" : "Building"}</div>
    <div class="text-sm text-zinc-500 mt-1">${venture.stage === "growth" ? "Generating revenue" : "In active development"}</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-emerald-400">${venture.status === "active" ? "Live" : "Verified"}</div>
    <div class="text-sm text-zinc-500 mt-1">${venture.status === "active" ? "Deployed and running" : "Ecosystem aligned"}</div>
  </div>
</div>
${slideSeparator}
layout: center
---

${heading("5. The Close")}

<div class="text-4xl font-bold text-accent mt-8">Accelerate ${venture.name}</div>

<div class="mt-8 flex justify-center gap-4">
  <a href="${venture.repository_url}" class="rounded-xl bg-accent px-8 py-3 font-semibold text-surface">
    Access Repository →
  </a>
  <a href="https://pitch-kit-zeta.vercel.app" class="rounded-xl border border-surface-200 px-8 py-3 font-semibold text-zinc-300">
    See Demo Hub
  </a>
</div>
`;
}

// --- Main Pipeline ---
async function main() {
  console.log("🚀 Pitch Kit — Deck Generator\n");

  // 1. Read venture registry
  let inputPath = CONFIG.INPUT_JSON;
  try {
    await fs.access(inputPath);
  } catch {
    inputPath = CONFIG.INPUT_JSON_FALLBACK;
    try {
      await fs.access(inputPath);
    } catch {
      console.error(`❌ Cannot find venture_registry.json at ${CONFIG.INPUT_JSON} or ${CONFIG.INPUT_JSON_FALLBACK}`);
      console.error("   Copy it to pitch-kit/data/venture_registry.json or adjust CONFIG.INPUT_JSON");
      process.exit(1);
    }
  }

  console.log(`📖 Reading registry from: ${inputPath}`);
  const rawData = await fs.readFile(inputPath, "utf-8");
  const registry: Registry = JSON.parse(rawData);
  const ventures = registry.civilization_os_venture_registry.ventures;
  const meta = registry.civilization_os_venture_registry.metadata;

  console.log(`   ${meta.total_ventures} ventures across ${Object.keys(meta.sectors).length} sectors\n`);

  // 2. Ensure output directory
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  console.log(`📁 Output directory: ${CONFIG.OUTPUT_DIR}\n`);

  // 3. Generate Master Deck
  const sectors = [...new Set(ventures.map((v) => v.sector))].sort();
  const masterMd = generateMasterDeck(ventures, sectors);
  await fs.writeFile(path.join(CONFIG.OUTPUT_DIR, "master-all-ventures.md"), masterMd);
  console.log("✅ Master deck → master-all-ventures.md");

  // 4. Generate Sector Decks (16)
  for (const sector of sectors) {
    const sectorVentures = ventures.filter((v) => v.sector === sector);
    const deckMd = generateSectorDeck(sector, sectorVentures);
    await fs.writeFile(path.join(CONFIG.OUTPUT_DIR, `sector-${sector}.md`), deckMd);
  }
  console.log(`✅ ${sectors.length} sector decks → sector-*.md`);

  // 5. Generate Individual Venture Decks (MVP + Growth)
  const targetVentures = ventures.filter((v) =>
    CONFIG.INDIVIDUAL_DECK_STAGES.includes(v.stage.toLowerCase())
  );

  console.log(`\n🔄 Fetching descriptions for ${targetVentures.length} MVP/Growth ventures...`);

  let fetched = 0;
  for (const venture of targetVentures) {
    venture.description = await fetchRepoDescription(venture.repository_url);
    fetched++;

    const deckMd = generateVentureDeck(venture);
    // Sanitize filename: lowercase, replace non-alphanumeric with hyphens
    const filename = venture.id.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".md";
    await fs.writeFile(path.join(CONFIG.OUTPUT_DIR, filename), deckMd);

    if (fetched % 10 === 0) console.log(`   ${fetched}/${targetVentures.length} individual decks generated`);

    // Rate limit throttle if no GitHub token
    if (!CONFIG.GITHUB_TOKEN && fetched % 50 === 0) {
      console.log("   ⏳ Pausing 60s for GitHub API rate limit (set GITHUB_TOKEN to avoid this)...");
      await new Promise((res) => setTimeout(res, 60000));
    }
  }
  console.log(`✅ ${targetVentures.length} individual venture decks → venture-*.md`);

  // 6. Generate index file
  const indexMd = `# Generated Decks Index\n
Auto-generated by \`scripts/generate-decks.ts\` on ${new Date().toISOString()}\n
## Summary
- **1** Master deck: \`master-all-ventures.md\`
- **${sectors.length}** Sector decks: \`sector-*.md\`
- **${targetVentures.length}** Individual venture decks (MVP/Growth): \`venture-*.md\`
- **Total slides generated:** ~${(1 + sectors.length + targetVentures.length) * 7}\n
## How to View\n
\`\`\`bash
# View any deck with Slidev
npx slidev slides/generated/master-all-ventures.md
npx slidev slides/generated/sector-financial.md
npx slidev slides/generated/fin-036-arbitrage-nexus-platform.md
\`\`\`\n
## Sectors\n
${sectors.map((s) => `- [${SECTOR_LABELS[s] || s}](sector-${s}.md) — ${ventures.filter((v) => v.sector === s).length} ventures`).join("\n")}\n
## Active Ventures (MVP/Growth)\n
${targetVentures.map((v) => `- [${v.name}](${v.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md) — ${v.sector} / ${v.stage}`).join("\n")}
`;

  await fs.writeFile(path.join(CONFIG.OUTPUT_DIR, "README.md"), indexMd);
  console.log("✅ Index → README.md");

  console.log(`\n🎉 Done! ${1 + sectors.length + targetVentures.length + 1} files generated in ${CONFIG.OUTPUT_DIR}`);
}

main().catch(console.error);
