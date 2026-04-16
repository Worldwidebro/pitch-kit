"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Presentation,
  Sparkles,
  Code2,
  BarChart3,
  ArrowRight,
  Zap,
  ChevronRight,
} from "lucide-react";
import { DEMO_MODULES, PITCH_FLOW, TECH_STACK } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Presentation,
  Sparkles,
  Code2,
  BarChart3,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-pitch-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <Zap className="h-3.5 w-3.5" />
              Demo & Presentation System
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Story + Interaction +{" "}
            <span className="bg-gradient-to-r from-accent-bright via-pitch-400 to-accent bg-clip-text text-transparent">
              Live Product
            </span>{" "}
            + Visual Proof
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Go beyond slides. Build interactive demo systems that combine
            presentations, scrollytelling, live sandboxes, and dashboards —
            all in one repo.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Link
              href="/presentations"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-surface transition-all hover:bg-accent-bright hover:glow-md"
            >
              Start the Pitch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 rounded-xl border border-surface-200 px-6 py-3 font-semibold text-zinc-300 transition-all hover:border-accent/40 hover:text-accent"
            >
              See Scrollytelling
              <Sparkles className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pitch Flow */}
      <section className="border-t border-surface-100 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="The Pitch Flow"
            title="Hook → Demo → Experience → Proof → Close"
            description="The sequence that wins. Not slides — a system."
          />

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PITCH_FLOW.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      {step.tool}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-0.5 text-sm text-accent">{step.subtitle}</p>
                  <p className="mt-2 text-sm text-zinc-400">{step.description}</p>
                  {i < PITCH_FLOW.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-accent/30 hidden lg:block" />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Modules */}
      <section className="border-t border-surface-100 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="Demo Modules"
            title="Four Modes, One System"
            description="Each module is a different way to present your product."
          />

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {DEMO_MODULES.map((mod) => {
              const Icon = iconMap[mod.icon] || Sparkles;
              return (
                <motion.div key={mod.id} variants={item}>
                  <Link href={mod.path}>
                    <Card glow className="h-full cursor-pointer">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">{mod.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400">
                        {mod.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {mod.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-surface-100 px-2 py-0.5 text-xs text-zinc-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-surface-100 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="Tech Stack"
            title="Built With the Best"
            description="Combining the top open-source tools for interactive presentations."
          />

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card>
                  <h3 className="text-lg font-bold">{tech.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{tech.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-surface-100 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Build Your{" "}
            <span className="text-glow text-accent">Demo System</span>?
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Clone this repo, customize the pitch flow, and ship presentations
            that actually close.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/presentations"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-semibold text-surface transition-all hover:bg-accent-bright hover:glow-md"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
