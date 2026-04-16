"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Copy, Check, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface ComponentDemo {
  id: string;
  name: string;
  category: string;
  code: string;
  description: string;
}

const COMPONENTS: ComponentDemo[] = [
  {
    id: "cta-button",
    name: "CTA Button",
    category: "Interactive",
    description: "Animated call-to-action button with glow effect",
    code: `<button class="rounded-xl bg-accent px-8 py-3 font-semibold text-surface">Get Started →</button>`,
  },
  {
    id: "metric-card",
    name: "Metric Card",
    category: "Dashboard",
    description: "Animated metric display with trend indicator",
    code: `<Card label="Monthly Revenue" value="$48.2K" change="+12.3%" trend="up" />`,
  },
  {
    id: "feature-grid",
    name: "Feature Grid",
    category: "Layout",
    description: "Staggered feature grid with hover states",
    code: `<div class="grid grid-cols-3 gap-4">...</div>`,
  },
  {
    id: "glass-card",
    name: "Glass Card",
    category: "UI",
    description: "Glassmorphism card with backdrop blur",
    code: `<div class="glass rounded-2xl p-6">...</div>`,
  },
  {
    id: "progress-bar",
    name: "Progress Bar",
    category: "Feedback",
    description: "Animated progress bar with gradient fill",
    code: `<div class="h-2 rounded-full bg-gradient-to-r from-accent to-pitch-500" style="width: 72%" />`,
  },
  {
    id: "testimonial",
    name: "Testimonial",
    category: "Social Proof",
    description: "Social proof card with quote and attribution",
    code: `<Testimonial quote="..." author="..." role="..." />`,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(COMPONENTS.map((c) => c.category)))];

/* Preview components rendered with React (not dangerouslySetInnerHTML) */
function CtaButtonPreview() {
  return (
    <button className="rounded-xl bg-accent px-8 py-3 font-semibold text-surface transition-all hover:bg-accent-bright hover:glow-sm">
      Get Started →
    </button>
  );
}

function MetricCardPreview() {
  return (
    <div className="rounded-2xl border border-surface-100 bg-surface-50/50 p-6">
      <span className="text-sm text-zinc-400">Monthly Revenue</span>
      <span className="mt-1 block text-3xl font-bold">$48.2K</span>
      <span className="mt-0.5 block text-sm font-medium text-emerald-400">↑ 12.3%</span>
    </div>
  );
}

function FeatureGridPreview() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {["Fast", "Secure", "Scalable"].map((f) => (
        <div key={f} className="rounded-xl border border-surface-100 p-3 text-center text-sm hover:border-accent/30">
          <span className="font-bold">{f}</span>
        </div>
      ))}
    </div>
  );
}

function GlassCardPreview() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-bold">Glass Effect</h3>
      <p className="text-sm text-zinc-400">Frosted glass with backdrop-filter</p>
    </div>
  );
}

function ProgressBarPreview() {
  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-100">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-pitch-500" style={{ width: "72%" }} />
      </div>
      <span className="text-xs text-zinc-500">72% complete</span>
    </div>
  );
}

function TestimonialPreview() {
  return (
    <div className="rounded-2xl border border-surface-100 bg-surface-50/50 p-6">
      <p className="text-sm italic text-zinc-300">&ldquo;This changed everything.&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">J</div>
        <div>
          <p className="text-sm font-bold">Jane Doe</p>
          <p className="text-xs text-zinc-500">CEO, Acme Inc</p>
        </div>
      </div>
    </div>
  );
}

const PREVIEW_MAP: Record<string, React.ComponentType> = {
  "cta-button": CtaButtonPreview,
  "metric-card": MetricCardPreview,
  "feature-grid": FeatureGridPreview,
  "glass-card": GlassCardPreview,
  "progress-bar": ProgressBarPreview,
  "testimonial": TestimonialPreview,
};

export default function SandboxPage() {
  const [category, setCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<Record<string, boolean>>({});

  const filtered = category === "All"
    ? COMPONENTS
    : COMPONENTS.filter((c) => c.category === category);

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-grid min-h-screen pt-20">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="Live Sandbox"
            title="Interactive Component Demos"
            description="Preview and copy production-ready components. Like Storybook, but for your pitch."
          />

          {/* Category filters */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  category === cat
                    ? "bg-accent text-surface"
                    : "bg-surface-50 text-zinc-400 hover:bg-surface-100 hover:text-accent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Component grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((comp) => {
                const PreviewComponent = PREVIEW_MAP[comp.id];
                return (
                  <motion.div
                    key={comp.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card glow className="flex h-full flex-col">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                          {comp.category}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              setPreviewMode((p) => ({
                                ...p,
                                [comp.id]: !p[comp.id],
                              }))
                            }
                            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-surface-100 hover:text-accent"
                            title="Toggle preview"
                          >
                            {previewMode[comp.id] ? (
                              <Code2 className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => copyCode(comp.id, comp.code)}
                            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-surface-100 hover:text-accent"
                            title="Copy code"
                          >
                            {copied === comp.id ? (
                              <Check className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold">{comp.name}</h3>
                      <p className="mt-1 text-sm text-zinc-400">{comp.description}</p>

                      {/* Code / Preview area */}
                      <div className="mt-4 flex-1">
                        <div className="overflow-hidden rounded-lg">
                          <div className="flex items-center gap-2 border-b border-surface-100 bg-surface px-3 py-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                            <span className="ml-2 text-xs text-zinc-600">
                              {comp.name.toLowerCase().replace(/-/g, "_")}.tsx
                            </span>
                          </div>
                          {previewMode[comp.id] && PreviewComponent ? (
                            <div className="bg-surface-50/80 p-4">
                              <PreviewComponent />
                            </div>
                          ) : (
                            <pre className="overflow-x-auto bg-surface-50/80 p-3 font-mono text-xs leading-relaxed text-zinc-400">
                              <code>{comp.code}</code>
                            </pre>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
