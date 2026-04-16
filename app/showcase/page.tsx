"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Eye, Move, Zap } from "lucide-react";
import { ScrollSection } from "@/components/scrollytelling/ScrollSection";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ANIMATION_TYPES = [
  { icon: Eye, label: "fade-up", description: "Elements rise into view as you scroll" },
  { icon: Move, label: "slide-in", description: "Content slides in from the side" },
  { icon: Zap, label: "scale", description: "Elements scale up from a smaller state" },
  { icon: Layers, label: "parallax", description: "Depth effect with differential scroll speeds" },
  { icon: Sparkles, label: "reveal", description: "Clip-path reveal animation" },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-grid py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="Scrollytelling"
            title="Scroll-Driven Narratives"
            description="GSAP + ScrollTrigger powered animations. Pin sections, create parallax, and immerse your audience."
          />

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ANIMATION_TYPES.map((type, i) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center">
                    <Icon className="mx-auto mb-2 h-6 w-6 text-accent" />
                    <h3 className="text-sm font-bold">{type.label}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{type.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scroll Sections — the actual scrollytelling demo */}
      <ScrollSection
        id="fade-up-demo"
        title="The Hook"
        description="Every great pitch starts with a hook. Draw them in with a bold statement that makes them lean forward."
        animation="fade-up"
        accent
      >
        <div className="rounded-2xl border border-surface-100 bg-surface-50/50 p-8">
          <p className="text-2xl font-light leading-relaxed text-zinc-300">
            &ldquo;The best presentations don&rsquo;t feel like presentations.
            They feel like <span className="font-bold text-accent">experiences</span>.&rdquo;
          </p>
        </div>
      </ScrollSection>

      <ScrollSection
        id="slide-in-demo"
        title="The Story Unfolds"
        description="As they scroll deeper, reveal your narrative layer by layer. Each section builds on the last."
        animation="slide-in"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {["Problem", "Solution", "Vision"].map((label, i) => (
            <Card key={label} className="text-center">
              <span className="text-3xl font-bold text-accent">{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{label}</h3>
            </Card>
          ))}
        </div>
      </ScrollSection>

      <ScrollSection
        id="scale-demo"
        title="The Product Reveals"
        description="Scale animations create a sense of importance. The product emerges from nothing into full focus."
        animation="scale"
        accent
      >
        <div className="flex items-center justify-center">
          <div className="glow-md rounded-2xl border border-accent/30 bg-accent/5 p-12 text-center">
            <p className="text-4xl font-bold text-accent">Your Product</p>
            <p className="mt-2 text-zinc-400">Scaling into view</p>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection
        id="parallax-demo"
        title="Depth & Dimension"
        description="Parallax creates a sense of depth — making flat pages feel three-dimensional. Subtle but powerful."
        animation="parallax"
      >
        <div className="relative h-48 overflow-hidden rounded-2xl border border-surface-100 bg-surface-50">
          <div className="absolute inset-0 bg-dots" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-xl border border-accent/20 bg-accent/10 px-8 py-4">
              <p className="text-lg font-bold text-accent">Parallax Layer</p>
            </div>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection
        id="reveal-demo"
        title="The Grand Reveal"
        description="Clip-path reveals are cinematic. Use them for your biggest moments — the key metric, the hero image, the close."
        animation="reveal"
        accent
      >
        <div className="flex items-center justify-center">
          <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 to-pitch-700/20 p-12 text-center">
            <p className="text-5xl font-bold">✦</p>
            <p className="mt-4 text-xl font-bold">The Big Moment</p>
            <p className="mt-1 text-zinc-400">Revealed as you scroll</p>
          </div>
        </div>
      </ScrollSection>

      {/* Pinned section demo */}
      <ScrollSection
        id="pinned-demo"
        title="Pinned Sections"
        description="Pin a section while content scrolls over it. Perfect for feature showcases that need breathing room."
        animation="fade-up"
        pin
        className="bg-surface-50/30"
      >
        <div className="rounded-2xl border border-surface-100 bg-surface p-8 text-center">
          <p className="text-lg text-zinc-300">
            This section stays pinned while you scroll through it.
            <br />
            <span className="text-accent">Combine with scrub for timeline animations.</span>
          </p>
        </div>
      </ScrollSection>
    </div>
  );
}
