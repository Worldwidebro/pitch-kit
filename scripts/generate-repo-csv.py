#!/usr/bin/env python3
"""
Pitch Kit — Repo-to-URL CSV Generator

Generates a comprehensive CSV mapping all 853 repos to:
  - Target URL / DNS route
  - URL type (own site, pitch-kit page, venture-hub page, internal)
  - Company role (Engine, Gear, Tool, Venture, Infrastructure)
  - Customer path phase(s)
  - What it powers / what powers it
  - Sector, stage, and venture registry cross-reference

Usage:
  python3 scripts/generate-repo-csv.py

Requires: gh CLI authenticated, venture_registry.json in data/
Output:   csv/REPO_URL_MAP.csv
"""

import csv
import json
import os
import subprocess
import sys
from pathlib import Path

# ─── Paths ───
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
VENTURE_REGISTRY = PROJECT_ROOT / "data" / "venture_registry.json"
OUTPUT_DIR = PROJECT_ROOT / "csv"
OUTPUT_FILE = OUTPUT_DIR / "REPO_URL_MAP.csv"

# ─── Domain config ───
DOMAIN = "worldwidebro.com"
PITCH_KIT_DOMAIN = f"demo.{DOMAIN}"
HUB_DOMAIN = f"hub.{DOMAIN}"
API_DOMAIN = f"api.{DOMAIN}"

# ─── Classification system ───
# Maps repo name prefix → classification rules
PREFIX_RULES = {
    "iza-os": {
        "company_role": "Gear",
        "customer_path_phases": "Know|Support",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "automation, orchestration, and specialized department tasks across all ventures",
        "powered_by": "iza-os-rag-system (knowledge), autonomous-venture-studio (orchestration)",
    },
    "ec": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "e-commerce and retail revenue generation",
        "powered_by": "pitch-kit (presentation), the-office (backend), iza-os bots (automation)",
    },
    "tech": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "SaaS platform and technology tool revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "em": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Scale",
        "url_type": "venture-hub page",
        "url_pattern": f"https://{HUB_DOMAIN}/ventures/{{id}}",
        "dns_target": f"{HUB_DOMAIN}/ventures/{{id}}",
        "powers": "emerging market expansion and new territory revenue",
        "powered_by": "venture-hub (portfolio), the-office (backend)",
    },
    "comm": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Scale",
        "url_type": "venture-hub page",
        "url_pattern": f"https://{HUB_DOMAIN}/ventures/{{id}}",
        "dns_target": f"{HUB_DOMAIN}/ventures/{{id}}",
        "powers": "community impact and civic engagement",
        "powered_by": "venture-hub (portfolio), the-office (backend)",
    },
    "bw": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Hook|Demo|Build|Deliver|Monetize",
        "url_type": "own deployed site (MVP+), pitch-kit page (others)",
        "url_pattern": f"https://{{slug}}.{DOMAIN}",
        "dns_target": "{{slug}}.worldwidebro.com",
        "powers": "beauty and wellness service revenue, marketplace transactions",
        "powered_by": "the-office (Convex, Paddle), up-next-marketplace, pitch-kit",
    },
    "edu": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Scale",
        "url_type": "venture-hub page",
        "url_pattern": f"https://{HUB_DOMAIN}/ventures/{{id}}",
        "dns_target": f"{HUB_DOMAIN}/ventures/{{id}}",
        "powers": "educational impact and literacy program delivery",
        "powered_by": "venture-hub (portfolio), the-office (backend)",
    },
    "fin": {
        "company_role": "Venture",
        "customer_path_phases": "Proof|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "fintech revenue, financial tracking, and credit services",
        "powered_by": "the-office (Paddle, Convex), pitch-kit (presentation)",
    },
    "fh": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "food and hospitality service revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "lt": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "logistics, dispatch, and transport revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "fs": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "fitness, sports, and coaching revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "ps": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "professional services, consulting, and B2B revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "mc": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Hook|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "media content, audience building, and ad revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "con": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "venture-hub page",
        "url_pattern": f"https://{HUB_DOMAIN}/ventures/{{id}}",
        "dns_target": f"{HUB_DOMAIN}/ventures/{{id}}",
        "powers": "construction and real estate service revenue",
        "powered_by": "venture-hub (portfolio), the-office (backend)",
    },
    "et": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "education training and certification revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "ops": {
        "company_role": "Tool",
        "customer_path_phases": "Support|Scale",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "internal operations, compliance, HR, and procurement efficiency",
        "powered_by": "the-office (Convex), iza-os bots (automation)",
    },
    "ai": {
        "company_role": "Infrastructure",
        "customer_path_phases": "Know|Build",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "foundational AI/ML models and inference for all ventures",
        "powered_by": "autonomous-venture-studio (orchestration), iza-os-rag (knowledge)",
    },
    "ht": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "health tech service revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "ft": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Demo|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/{{id}}",
        "powers": "financial technology revenue",
        "powered_by": "pitch-kit (presentation), the-office (backend)",
    },
    "leg": {
        "company_role": "Tool",
        "customer_path_phases": "Support",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "legal research, compliance, and contract automation",
        "powered_by": "iza-os bots (legal), the-office",
    },
    "des": {
        "company_role": "Tool",
        "customer_path_phases": "Hook|Experience",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "design system, branding, and visual identity across ventures",
        "powered_by": "pitch-kit (templates), venture-hub (portfolio)",
    },
    "ace": {
        "company_role": "Gear",
        "customer_path_phases": "Scale",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "community impact templates and program blueprints",
        "powered_by": "venture-hub (portfolio), comm- ventures",
    },
    "research": {
        "company_role": "Gear",
        "customer_path_phases": "Know",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "R&D insights feeding venture strategy",
        "powered_by": "iza-os-rag-system (knowledge)",
    },
}

# Special repos that don't follow prefix patterns
SPECIAL_REPOS = {
    "the-office": {
        "company_role": "Engine",
        "customer_path_phases": "Build|Support|Monetize",
        "url_type": "own deployed site",
        "url_pattern": f"https://{API_DOMAIN}",
        "dns_target": API_DOMAIN,
        "powers": "data backbone, auth (Clerk), payments (Paddle), vector DB (Pinecone), emails (Resend), CRM (Twenty) for ALL repos",
        "powered_by": "autonomous-venture-studio (task orchestration)",
        "sector": "infrastructure",
        "stage": "growth",
    },
    "autonomous-venture-studio": {
        "company_role": "Engine",
        "customer_path_phases": "Build|Scale",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "venture coordination, AI agent execution, repo scaffolding, business logic",
        "powered_by": "the-office (Convex DB), iza-os-rag (knowledge)",
        "sector": "infrastructure",
        "stage": "growth",
    },
    "iza-os-rag-system": {
        "company_role": "Engine",
        "customer_path_phases": "Know",
        "url_type": "own deployed site",
        "url_pattern": f"https://rag.{DOMAIN}",
        "dns_target": f"rag.{DOMAIN}",
        "powers": "knowledge retrieval API, vector search, and graph traversal for all ventures",
        "powered_by": "the-office (Pinecone vectors, Convex data)",
        "sector": "infrastructure",
        "stage": "mvp",
    },
    "venture-hub": {
        "company_role": "Infrastructure",
        "customer_path_phases": "Discover|Scale",
        "url_type": "own deployed site",
        "url_pattern": f"https://{HUB_DOMAIN}",
        "dns_target": HUB_DOMAIN,
        "powers": "public portfolio face, 691 venture directory, 16 sector pages, presell pages",
        "powered_by": "the-office (Convex venture data), iza-os-rag (search)",
        "sector": "infrastructure",
        "stage": "mvp",
    },
    "pitch-kit": {
        "company_role": "Gear",
        "customer_path_phases": "Hook|Demo|Experience|Proof|Close",
        "url_type": "own deployed site",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}",
        "dns_target": PITCH_KIT_DOMAIN,
        "powers": "client conversion, interactive presentations, sandbox previews, scrollytelling narratives",
        "powered_by": "the-office (live dashboard metrics, Convex data)",
        "sector": "infrastructure",
        "stage": "mvp",
    },
    "venture-factory-core": {
        "company_role": "Engine",
        "customer_path_phases": "Build|Scale",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "venture mass generation engine — creates new venture repos, configs, and scaffolds",
        "powered_by": "autonomous-venture-studio (orchestration)",
        "sector": "infrastructure",
        "stage": "validation",
    },
    "venture-pipeline": {
        "company_role": "Tool",
        "customer_path_phases": "Scale",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "progress tracking from idea → validation → MVP → growth for all ventures",
        "powered_by": "the-office (Convex status data)",
        "sector": "infrastructure",
        "stage": "validation",
    },
    "venture-studio": {
        "company_role": "Engine",
        "customer_path_phases": "Scale",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "studio-wide analytics, management, and cross-venture coordination",
        "powered_by": "autonomous-venture-studio (orchestration)",
        "sector": "infrastructure",
        "stage": "validation",
    },
    "unified-dashboard": {
        "company_role": "Tool",
        "customer_path_phases": "Proof|Know",
        "url_type": "page inside venture-hub",
        "url_pattern": f"https://{HUB_DOMAIN}/dashboard",
        "dns_target": f"{HUB_DOMAIN}/dashboard",
        "powers": "cross-ecosystem analytics display and KPI tracking",
        "powered_by": "the-office (metrics data), pitch-kit (visualization)",
        "sector": "infrastructure",
        "stage": "validation",
    },
    "worldwidebro-holdings": {
        "company_role": "Infrastructure",
        "customer_path_phases": "Discover",
        "url_type": "page inside venture-hub",
        "url_pattern": f"https://{DOMAIN}/portfolio",
        "dns_target": f"{DOMAIN}/portfolio",
        "powers": "holdings company structure, legal entity visualization, investor relations",
        "powered_by": "venture-hub (portfolio display)",
        "sector": "infrastructure",
        "stage": "planned",
    },
    "xyops-integration": {
        "company_role": "Tool",
        "customer_path_phases": "Support|Deliver",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "external operations tool integration and API bridge",
        "powered_by": "ops- bots (automation), the-office",
        "sector": "infrastructure",
        "stage": "planned",
    },
    "aibossoslandingpage": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Hook",
        "url_type": "own deployed site",
        "url_pattern": f"https://aiboss.{DOMAIN}",
        "dns_target": f"aiboss.{DOMAIN}",
        "powers": "lead generation and product awareness for AI Boss OS",
        "powered_by": "pitch-kit (templates), venture-hub (portfolio)",
        "sector": "technology",
        "stage": "mvp",
    },
    "up-next": {
        "company_role": "Venture",
        "customer_path_phases": "Hook|Demo|Build|Deliver|Monetize",
        "url_type": "own deployed site",
        "url_pattern": f"https://upnext.{DOMAIN}",
        "dns_target": f"upnext.{DOMAIN}",
        "powers": "beauty marketplace platform revenue, client proof case for pitch-kit",
        "powered_by": "the-office (Convex, Paddle), bw-001-up-next-web",
        "sector": "beauty-wellness",
        "stage": "mvp",
    },
    "wealth-optimization": {
        "company_role": "Gear",
        "customer_path_phases": "Monetize|Know",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "portfolio-wide financial optimization and revenue aggregation",
        "powered_by": "the-office (Paddle, financial data), fin- ventures",
        "sector": "financial",
        "stage": "planned",
    },
    "Avs-Omni-": {
        "company_role": "Venture",
        "customer_path_phases": "Discover|Monetize",
        "url_type": "pitch-kit page",
        "url_pattern": f"https://{PITCH_KIT_DOMAIN}/demo/avs-omni",
        "dns_target": f"{PITCH_KIT_DOMAIN}/demo/avs-omni",
        "powers": "omnichannel retail revenue",
        "powered_by": "pitch-kit, the-office",
        "sector": "e-commerce",
        "stage": "planned",
    },
}

# Sector label map for human-readable sector names
SECTOR_LABELS = {
    "financial": "Financial Services",
    "beauty-wellness": "Beauty & Wellness",
    "food-hospitality": "Food & Hospitality",
    "fitness-sports": "Fitness & Sports",
    "logistics-transport": "Logistics & Transport",
    "professional-services": "Professional Services",
    "media-content": "Media & Content",
    "education": "Education",
    "education-training": "Education & Training",
    "e-commerce": "E-Commerce",
    "technology": "Technology",
    "software-technology": "Software & Technology",
    "community": "Community",
    "emerging": "Emerging Markets",
    "specialized": "Specialized Services",
    "operations": "Operations",
    "construction": "Construction",
    "health-tech": "Health Tech",
    "infrastructure": "Infrastructure",
}


def fetch_github_repos():
    """Fetch all repos from GitHub using gh CLI."""
    print("📡 Fetching repos from GitHub...")
    try:
        result = subprocess.run(
            ["gh", "repo", "list", "Worldwidebro", "--limit", "1000",
             "--json", "name,description,url,isPrivate"],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode != 0:
            print(f"❌ GitHub CLI error: {result.stderr}")
            sys.exit(1)
        repos = json.loads(result.stdout)
        print(f"   Found {len(repos)} repos")
        return repos
    except Exception as e:
        print(f"❌ Failed to fetch repos: {e}")
        sys.exit(1)


def load_venture_registry():
    """Load venture registry JSON."""
    print("📖 Loading venture registry...")
    if not VENTURE_REGISTRY.exists():
        print(f"   ⚠️  No registry at {VENTURE_REGISTRY}, using empty")
        return {}

    with open(VENTURE_REGISTRY) as f:
        data = json.load(f)

    ventures = data.get("civilization_os_venture_registry", {}).get("ventures", [])
    # Map: repo name (from repository_url) → venture data
    venture_map = {}
    for v in ventures:
        repo_url = v.get("repository_url", "")
        if repo_url:
            # Extract repo name from URL
            repo_name = repo_url.rstrip("/").split("/")[-1].replace(".git", "")
            venture_map[repo_name] = v
    print(f"   Loaded {len(ventures)} ventures, mapped {len(venture_map)} to repos")
    return venture_map


def classify_repo(repo_name, description, venture_data):
    """Classify a repo based on its name prefix and venture data."""
    # Check special repos first (exact match only to avoid collisions)
    if repo_name in SPECIAL_REPOS:
        result = dict(SPECIAL_REPOS[repo_name])
        # Merge venture data if available (venture data takes priority for sector/stage/status)
        if venture_data:
            result.setdefault("sector", venture_data.get("sector", ""))
            result.setdefault("stage", venture_data.get("stage", ""))
            result.setdefault("status", venture_data.get("status", ""))
            result["venture_id"] = venture_data.get("id", "")
            result["venture_name"] = venture_data.get("name", "")
        else:
            result.setdefault("sector", "")
            result.setdefault("stage", "")
            result.setdefault("status", "")
            result.setdefault("venture_id", "")
            result.setdefault("venture_name", "")
        return result

    # Extract prefix (first segment before dash or first 2-3 chars)
    prefix = repo_name.split("-")[0] if "-" in repo_name else repo_name

    # Try multi-segment prefixes first (e.g., "iza-os")
    for rule_prefix, rules in PREFIX_RULES.items():
        if repo_name.startswith(rule_prefix + "-") or repo_name.startswith(rule_prefix):
            result = dict(rules)
            # Fill in venture-specific data if available
            if venture_data:
                result["sector"] = venture_data.get("sector", "")
                result["stage"] = venture_data.get("stage", "")
                result["status"] = venture_data.get("status", "")
                result["venture_id"] = venture_data.get("id", "")
                result["venture_name"] = venture_data.get("name", "")
            else:
                result["sector"] = ""
                result["stage"] = ""
                result["status"] = ""
                result["venture_id"] = ""
                result["venture_name"] = ""
            return result

    # Fallback for unknown prefixes
    # Try to infer from common patterns
    if prefix in PREFIX_RULES:
        result = dict(PREFIX_RULES[prefix])
        if venture_data:
            result["sector"] = venture_data.get("sector", "")
            result["stage"] = venture_data.get("stage", "")
            result["status"] = venture_data.get("status", "")
            result["venture_id"] = venture_data.get("id", "")
            result["venture_name"] = venture_data.get("name", "")
        else:
            result["sector"] = ""
            result["stage"] = ""
            result["status"] = ""
            result["venture_id"] = ""
            result["venture_name"] = ""
        return result

    # Absolute fallback
    return {
        "company_role": "Gear",
        "customer_path_phases": "Support",
        "url_type": "internal",
        "url_pattern": "",
        "dns_target": "",
        "powers": "specialized utility within the ecosystem",
        "powered_by": "the-office, autonomous-venture-studio",
        "sector": "",
        "stage": "",
        "status": "",
        "venture_id": "",
        "venture_name": "",
    }


def generate_slug(repo_name):
    """Generate a clean DNS-safe slug from a repo name.
    
    Examples:
      bw-001-up-next → upnext
      bw-002-mobile-lash-service → mobile-lash-service
      fin-036-arbitrage-nexus → arbitrage-nexus
      ec-111-tve-fragrance → tve-fragrance
      iza-os-rag-system → rag
    """
    parts = repo_name.split("-")
    # Strip numeric index (e.g., bw-001, fin-036, ec-111)
    if len(parts) >= 3 and parts[1].isdigit():
        # bw-001-up-next → join from index 2 onward
        slug_parts = parts[2:]
    elif len(parts) >= 2 and parts[1].isdigit():
        # ai-002-something → join from index 2
        slug_parts = parts[2:]
    elif repo_name.startswith("iza-os-"):
        # iza-os-rag-system → rag
        slug_parts = parts[2:] if len(parts) > 2 else parts[1:]
    elif repo_name.startswith("venture-"):
        # venture-factory-core → factory-core
        slug_parts = parts[1:]
    else:
        slug_parts = parts
    
    slug = "-".join(slug_parts)
    # Remove generic trailing words that make bad subdomains
    # e.g., "mobile-lash-service" → "mobile-lash" (service is too generic for subdomain)
    generic_suffixes = ["-service", "-company", "-brand", "-products", "-line", "-platform", "-system"]
    for suffix in generic_suffixes:
        if slug.endswith(suffix) and len(slug) > len(suffix) + 3:
            slug = slug[:-len(suffix)]
            break
    
    return slug


def determine_deployed_url(repo_name, classification, venture_data):
    """Determine the actual deployed URL for a repo."""
    url_type = classification.get("url_type", "internal")
    url_pattern = classification.get("url_pattern", "")

    if url_type == "internal":
        return ""
    elif "own deployed site" in url_type:
        if url_pattern:
            slug = generate_slug(repo_name)
            url = url_pattern.replace("{id}", repo_name).replace("{slug}", slug)
            return url
        return ""
    elif "pitch-kit" in url_type:
        return f"https://{PITCH_KIT_DOMAIN}/demo/{repo_name}"
    elif "venture-hub" in url_type:
        return f"https://{HUB_DOMAIN}/ventures/{repo_name}"
    else:
        return ""


def determine_sector_page(repo_name, sector):
    """Determine the sector page URL."""
    if sector:
        return f"https://{PITCH_KIT_DOMAIN}/sector/{sector}"
    return ""


def main():
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Fetch data
    repos = fetch_github_repos()
    venture_map = load_venture_registry()

    # CSV columns
    fieldnames = [
        "repo_name",
        "description",
        "github_url",
        "is_private",
        "venture_id",
        "venture_name",
        "sector",
        "sector_label",
        "stage",
        "status",
        "company_role",
        "customer_path_phases",
        "url_type",
        "deployed_url",
        "dns_target",
        "sector_page_url",
        "powers",
        "powered_by",
        "phase_discover",
        "phase_hook",
        "phase_demo",
        "phase_experience",
        "phase_proof",
        "phase_close",
        "phase_build",
        "phase_deliver",
        "phase_support",
        "phase_scale",
        "phase_know",
        "phase_monetize",
    ]

    rows = []
    stats = {
        "total": 0,
        "own_deployed_site": 0,
        "pitch_kit_page": 0,
        "venture_hub_page": 0,
        "internal": 0,
        "engines": 0,
        "gears": 0,
        "tools": 0,
        "ventures": 0,
        "infrastructure": 0,
    }

    for repo in repos:
        repo_name = repo["name"]
        description = repo.get("description", "") or ""
        github_url = repo.get("url", "")
        is_private = repo.get("isPrivate", True)

        # Look up venture data
        venture_data = venture_map.get(repo_name)

        # Classify
        classification = classify_repo(repo_name, description, venture_data)

        # Get venture fields
        venture_id = classification.get("venture_id", "") or (venture_data.get("id", "") if venture_data else "")
        venture_name = classification.get("venture_name", "") or (venture_data.get("name", "") if venture_data else "")
        sector = classification.get("sector", "") or (venture_data.get("sector", "") if venture_data else "")
        stage = classification.get("stage", "") or (venture_data.get("stage", "") if venture_data else "")
        status = classification.get("status", "") or (venture_data.get("status", "") if venture_data else "")

        # Sector label
        sector_label = SECTOR_LABELS.get(sector, sector)

        # URL
        url_type = classification.get("url_type", "internal")
        # For bw- repos: MVP/Growth stage get own site, others get pitch-kit page
        if repo_name.startswith("bw-") and "own deployed" in url_type:
            if venture_data and venture_data.get("stage", "") in ("mvp", "growth"):
                url_type = "own deployed site"
            else:
                url_type = "pitch-kit page"
        deployed_url = determine_deployed_url(repo_name, {**classification, "url_type": url_type}, venture_data)
        dns_target = classification.get("dns_target", "")
        if dns_target:
            slug = generate_slug(repo_name)
            dns_target = dns_target.replace("{id}", repo_name).replace("{slug}", slug)

        # Sector page
        sector_page = determine_sector_page(repo_name, sector)

        # Parse phases into boolean columns
        phases_str = classification.get("customer_path_phases", "")
        phases_list = [p.strip() for p in phases_str.split("|")]
        phase_flags = {}
        for phase in ["discover", "hook", "demo", "experience", "proof", "close",
                       "build", "deliver", "support", "scale", "know", "monetize"]:
            phase_flags[f"phase_{phase}"] = "1" if phase.capitalize() in phases_list else "0"

        # Role
        role = classification.get("company_role", "Gear")

        # Build row
        row = {
            "repo_name": repo_name,
            "description": description,
            "github_url": github_url,
            "is_private": str(is_private),
            "venture_id": venture_id,
            "venture_name": venture_name,
            "sector": sector,
            "sector_label": sector_label,
            "stage": stage,
            "status": status,
            "company_role": role,
            "customer_path_phases": phases_str,
            "url_type": url_type,
            "deployed_url": deployed_url,
            "dns_target": dns_target,
            "sector_page_url": sector_page,
            "powers": classification.get("powers", ""),
            "powered_by": classification.get("powered_by", ""),
            **phase_flags,
        }
        rows.append(row)

        # Stats
        stats["total"] += 1
        if "own deployed" in url_type:
            stats["own_deployed_site"] += 1
        elif "pitch-kit" in url_type:
            stats["pitch_kit_page"] += 1
        elif "venture-hub" in url_type:
            stats["venture_hub_page"] += 1
        else:
            stats["internal"] += 1

        role_key = role.lower()
        # Map singular role to plural stats key
        role_to_stat = {"engine": "engines", "infrastructure": "infrastructure", "gear": "gears", "tool": "tools", "venture": "ventures"}
        stat_key = role_to_stat.get(role_key)
        if stat_key and stat_key in stats:
            stats[stat_key] += 1

    # Sort: Engines first, then Infrastructure, Gear, Tool, Venture
    role_order = {"Engine": 0, "Infrastructure": 1, "Gear": 2, "Tool": 3, "Venture": 4}
    rows.sort(key=lambda r: (role_order.get(r["company_role"], 5), r["repo_name"]))

    # Write CSV
    with open(OUTPUT_FILE, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"\n✅ Generated {OUTPUT_FILE}")
    print(f"   {stats['total']} repos classified")
    print(f"\n📊 URL Distribution:")
    print(f"   Own deployed site: {stats['own_deployed_site']}")
    print(f"   Pitch-kit page:    {stats['pitch_kit_page']}")
    print(f"   Venture-hub page:  {stats['venture_hub_page']}")
    print(f"   Internal only:     {stats['internal']}")
    print(f"\n🏢 Role Distribution:")
    print(f"   Engines:         {stats['engines']}")
    print(f"   Infrastructure:  {stats['infrastructure']}")
    print(f"   Gears:           {stats['gears']}")
    print(f"   Tools:           {stats['tools']}")
    print(f"   Ventures:        {stats['ventures']}")


if __name__ == "__main__":
    main()
