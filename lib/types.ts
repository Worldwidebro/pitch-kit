export interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  layout?: "center" | "split" | "full" | "two-column";
  mediaUrl?: string;
  notes?: string;
}

export interface DemoModule {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  category: "presentation" | "showcase" | "sandbox" | "dashboard";
  tags: string[];
}

export interface ScrollSection {
  id: string;
  title: string;
  description: string;
  pin?: boolean;
  scrub?: number | boolean;
  animation: "fade-up" | "slide-in" | "scale" | "parallax" | "reveal";
}

export type PitchFlow = "hook" | "demo" | "experience" | "proof" | "close";

export const PITCH_FLOW_ORDER: PitchFlow[] = [
  "hook",
  "demo",
  "experience",
  "proof",
  "close",
];

export const PITCH_FLOW_LABELS: Record<PitchFlow, string> = {
  hook: "Hook — Tell the Story",
  demo: "Demo — Show the Product",
  experience: "Experience — Feel the Magic",
  proof: "Proof — Show the Data",
  close: "Close — CTA / Offer",
};
