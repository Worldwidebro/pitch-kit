import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-100 bg-surface-50/50 p-6 transition-all duration-300",
        hover && "hover:border-accent/30 hover:bg-surface-50",
        glow && "hover:glow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "flat";
}

export function MetricCard({ label, value, change, trend }: MetricCardProps) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
      {change && (
        <span
          className={cn(
            "text-sm font-medium",
            trend === "up" && "text-emerald-400",
            trend === "down" && "text-red-400",
            trend === "flat" && "text-zinc-500"
          )}
        >
          {trend === "up" && "↑ "}
          {trend === "down" && "↓ "}
          {change}
        </span>
      )}
    </Card>
  );
}
