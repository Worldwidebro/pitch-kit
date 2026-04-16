"use client";

import { motion } from "framer-motion";
import {
  Presentation,
  Monitor,
  Play,
  Code,
  Image,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SLIDE_DECKS = [
  {
    id: "main-pitch",
    title: "Main Pitch Deck",
    description: "The full pitch flow: Hook → Demo → Experience → Proof → Close",
    slides: 12,
    features: ["Live code", "Animations", "Speaker notes", "Export PDF"],
    command: "npm run slides",
  },
  {
    id: "investor-deck",
    title: "Investor Deck",
    description: "Fundraising narrative with metrics, traction, and ask",
    slides: 8,
    features: ["Data-driven", "Timeline", "Charts", "CTA slide"],
    command: "npm run slides -- slides/investor-deck.md",
  },
  {
    id: "product-demo",
    title: "Product Demo Deck",
    description: "Feature walkthrough with embedded live demos",
    slides: 6,
    features: ["Live embeds", "Interactive", "Code sandbox", "Video"],
    command: "npm run slides -- slides/product-demo.md",
  },
];

const SLIDEV_FEATURES = [
  {
    icon: Code,
    title: "Markdown → Slides",
    description: "Write slides in Markdown with Vue-powered interactivity",
  },
  {
    icon: Monitor,
    title: "Presenter Mode",
    description: "Speaker notes, timer, and next-slide preview on a second screen",
  },
  {
    icon: Play,
    title: "Live Coding",
    description: "Run live code demos directly inside your slides",
  },
  {
    icon: Image,
    title: "Rich Media",
    description: "Embed videos, iframes, 3D scenes, and interactive widgets",
  },
  {
    icon: Layers,
    title: "Themes & Layouts",
    description: "Custom themes, layouts, and global styles with CSS/Windi",
  },
  {
    icon: ExternalLink,
    title: "Export & Share",
    description: "Export to PDF, SPA, or host as a static site",
  },
];

export default function PresentationsPage() {
  return (
    <div className="bg-grid min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="Presentations"
            title="Interactive Slide Decks"
            description="Slidev-powered presentations that go beyond slides. Markdown in, interactive experience out."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {SLIDE_DECKS.map((deck, i) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card glow className="flex h-full flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <Presentation className="h-5 w-5 text-accent" />
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {deck.slides} slides
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{deck.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-zinc-400">
                    {deck.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {deck.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-surface-100 px-2 py-0.5 text-xs text-zinc-500"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 rounded-lg bg-surface px-3 py-2 font-mono text-xs text-accent">
                    $ {deck.command}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-surface-100 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="Why Slidev"
            title="Slides, but Better"
            description="Developer-friendly presentations that feel like real apps."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SLIDEV_FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card>
                    <Icon className="mb-3 h-6 w-6 text-accent" />
                    <h3 className="text-lg font-bold">{feat.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {feat.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="border-t border-surface-100 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            label="Quick Start"
            title="Run Your First Deck"
          />
          <div className="mt-10 space-y-4">
            {[
              { step: 1, cmd: "git clone <this-repo> && cd pitch-kit" },
              { step: 2, cmd: "npm install" },
              { step: 3, cmd: "npm run slides" },
            ].map((s) => (
              <div
                key={s.step}
                className="flex items-center gap-4 rounded-xl border border-surface-100 bg-surface-50/50 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {s.step}
                </span>
                <code className="font-mono text-sm text-zinc-300">{s.cmd}</code>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Slidev runs on port 3030 by default. Edit{" "}
            <code className="text-accent">slides/main-deck.md</code> to customize.
          </p>
        </div>
      </section>
    </div>
  );
}
