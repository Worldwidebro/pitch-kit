"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { Card, MetricCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const METRICS = [
  { label: "Monthly Revenue", value: "$48.2K", change: "+12.3%", trend: "up" as const },
  { label: "Active Users", value: "2,847", change: "+8.1%", trend: "up" as const },
  { label: "Conversion Rate", value: "3.2%", change: "-0.4%", trend: "down" as const },
  { label: "Avg. Session", value: "4m 32s", change: "+18%", trend: "up" as const },
];

const CHART_DATA = [
  { label: "Jan", value: 32 },
  { label: "Feb", value: 45 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 52 },
  { label: "May", value: 61 },
  { label: "Jun", value: 48 },
  { label: "Jul", value: 72 },
  { label: "Aug", value: 85 },
  { label: "Sep", value: 79 },
  { label: "Oct", value: 91 },
  { label: "Nov", value: 68 },
  { label: "Dec", value: 96 },
];

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "VP Product, FintechCo", quote: "The pitch flow was transformative. We closed our Series A in 2 weeks.", rating: 5 },
  { name: "Marcus Johnson", role: "Founder, HealthAI", quote: "Investors said it was the best demo they'd ever seen. Revenue followed.", rating: 5 },
  { name: "Elena Rodriguez", role: "CEO, MarketPlace Inc", quote: "Our close rate went from 15% to 40% after switching to this system.", rating: 5 },
];

const FUNNEL_STEPS = [
  { label: "Visitors", value: 10000, percentage: 100 },
  { label: "Leads", value: 2500, percentage: 25 },
  { label: "Qualified", value: 800, percentage: 8 },
  { label: "Proposals", value: 320, percentage: 3.2 },
  { label: "Closed", value: 128, percentage: 1.28 },
];

export default function DashboardPage() {
  const maxChartValue = Math.max(...CHART_DATA.map((d) => d.value));

  return (
    <div className="bg-grid min-h-screen pt-20">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            label="Dashboard"
            title="Proof — Show the Data"
            description="Live metrics, funnel analytics, and social proof. This is where the pitch becomes undeniable."
          />

          {/* Metrics row */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <MetricCard {...m} />
              </motion.div>
            ))}
          </div>

          {/* Chart + Funnel */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Bar Chart */}
            <Card className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Revenue Trend</h3>
                <div className="flex items-center gap-1 text-sm text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                  +34% YoY
                </div>
              </div>
              <div className="flex items-end gap-2" style={{ height: 200 }}>
                {CHART_DATA.map((d, i) => (
                  <motion.div
                    key={d.label}
                    className="flex flex-1 flex-col items-center gap-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <motion.div
                      className="w-full rounded-t-md bg-gradient-to-t from-accent/60 to-pitch-400/60"
                      initial={{ height: 0 }}
                      animate={{
                        height: `${(d.value / maxChartValue) * 160}px`,
                      }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                    />
                    <span className="text-xs text-zinc-600">{d.label}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Funnel */}
            <Card>
              <h3 className="mb-4 text-lg font-bold">Sales Funnel</h3>
              <div className="space-y-3">
                {FUNNEL_STEPS.map((step, i) => (
                  <div key={step.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{step.label}</span>
                      <span className="font-medium">
                        {step.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-100">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-pitch-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${step.percentage}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex h-full flex-col">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm italic text-zinc-300">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Card className="mx-auto max-w-2xl border-accent/20 bg-accent/5">
              <h3 className="text-2xl font-bold">Ready to Close?</h3>
              <p className="mt-2 text-zinc-400">
                This dashboard section is your proof. Customize the metrics
                with your real data and watch the close rate climb.
              </p>
              <motion.button
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-semibold text-surface transition-all hover:bg-accent-bright hover:glow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Building
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
