"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Copy, Check, Eye, Play, RotateCcw } from "lucide-react";
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
    code: `<button class="group relative rounded-xl bg-accent px-8 py-3 font-semibold text-surface transition-all hover:glow-md">
  <span class="relative z-10">Get Started →</span>
  <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-pitch-500 opacity-0 blur-lg transition-opacity group-hover:opacity-50" />
</button>`,
  },
  {
    id: "metric-card",
    name: "Metric Card",
    category: "Dashboard",
    description: "Animated metric display with trend indicator",
    code: `<div class="rounded-2xl border border-surface-100 bg-surface-50 p-6">
  <span class="text-sm text-zinc-400">Monthly Revenue</span>
  <span class="text-3xl font-bold">$48.2K</span>
  <span class="text-sm font-medium text-emerald-400">↑ 12.3%</span>
</div>`,
  },
  {
    id: "feature-grid",
    name: "Feature Grid",
    category: "Layout",
    description: "Staggered feature grid with hover states",
    code: `<div class="grid grid-cols-3 gap-4">
  <div class="rounded-xl border border-surface-100 p-4 hover:border-accent/30">
    <h3 class="font-bold">Feature 1</h3>
    <p class="text-sm text-zinc-400">Description</p>
  </div>
  <!-- Repeat for each feature -->
</div>`,
  },
  {
    id: "glass-card",
    name: "Glass Card",
    category: "UI",
    description: "Glassmorphism card with backdrop blur",
    code: `<div class="glass rounded-2xl p-6">
  <h3 class="text-lg font-bold">Glass Effect</h3>
  <p class="text-zinc-400">Frosted glass with backdrop-filter</p>
</div>`,
  },
  {
    id: "progress-bar",
    name: "Progress Bar",
    category: "Feedback",
    description: "Animated progress bar with gradient fill",
    code: `<div class="h-2 w-full overflow-hidden rounded-full bg-surface-100">
  <div class="h-full rounded-full bg-gradient-to-r from-accent to-pitch-500" style="width: 72%" />
</div>`,
  },
  {
    id: "testimonial",
    name: "Testimonial",
    category: "Social Proof",
    description: "Social proof card with quote and attribution",
    code: `<div class="rounded-2xl border border-surface-100 bg-surface-50 p-6">
  <p class="text-lg italic text-zinc-300">"This changed everything."</p>
  <div class="mt-4 flex items-center gap-3">
    <div class="h-10 w-10 rounded-full bg-accent/20" />
    <div>
      <p class="text-sm font-bold">Jane Doe</p>
      <p class="text-xs text-zinc-500">CEO, Acme Inc</p>
    </div>
  </div>
</div>`,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(COMPONENTS.map((c) => c.category)))];

export default function SandboxPage() {
  const [selected, setSelected] = useState<string | null>(null);
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
              {filtered.map((comp) => (
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

                    {/* Code preview */}
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
                        <pre
                          className={cn(
                            "overflow-x-auto bg-surface-50/80 p-3 font-mono text-xs leading-relaxed text-zinc-400",
                            previewMode[comp.id] && "hidden"
                          )}
                        >
                          <code>{comp.code}</code>
                        </pre>
                        {previewMode[comp.id] && (
                          <div
                            className="bg-surface-50/80 p-4"
                            dangerouslySetInnerHTML={{ __html: comp.code }}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
