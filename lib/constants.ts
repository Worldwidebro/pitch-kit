import { DemoModule } from "./types";

export const SITE_NAME = "Pitch Kit";
export const SITE_DESCRIPTION =
  "Interactive demo & presentation system — Story + Interaction + Live Product + Visual Proof";

export const DEMO_MODULES: DemoModule[] = [
  {
    id: "presentations",
    title: "Presentations",
    description: "Slidev-powered interactive slide decks with live code demos",
    path: "/presentations",
    icon: "Presentation",
    category: "presentation",
    tags: ["slides", "pitch", "storytelling"],
  },
  {
    id: "showcase",
    title: "Scrollytelling",
    description: "GSAP-powered scroll-driven narratives with pinned sections and parallax",
    path: "/showcase",
    icon: "Sparkles",
    category: "showcase",
    tags: ["gsap", "scroll", "animation", "parallax"],
  },
  {
    id: "sandbox",
    title: "Live Sandbox",
    description: "Interactive product demo environment with component previews",
    path: "/sandbox",
    icon: "Code2",
    category: "sandbox",
    tags: ["demo", "components", "interactive"],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Live metrics dashboard to show proof and business intelligence",
    path: "/dashboard",
    icon: "BarChart3",
    category: "dashboard",
    tags: ["metrics", "analytics", "proof"],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Presentations", href: "/presentations" },
  { label: "Scrollytelling", href: "/showcase" },
  { label: "Sandbox", href: "/sandbox" },
  { label: "Dashboard", href: "/dashboard" },
];

export const TECH_STACK = [
  { name: "Next.js", role: "App framework & SSR" },
  { name: "Slidev", role: "Markdown → interactive slides" },
  { name: "GSAP + ScrollTrigger", role: "Premium scroll animations" },
  { name: "Framer Motion", role: "React animation primitives" },
  { name: "Tailwind CSS", role: "Utility-first styling" },
  { name: "TypeScript", role: "Type safety" },
];

export const PITCH_FLOW = [
  {
    step: "hook",
    title: "Hook",
    subtitle: "Tell the Story",
    description: "Open with a compelling narrative using Slidev/Reveal.js slides",
    tool: "Slidev + Reveal.js",
  },
  {
    step: "demo",
    title: "Demo",
    subtitle: "Show the Product",
    description: "Transition into a live product demo — no slides, real working software",
    tool: "Next.js + Storybook",
  },
  {
    step: "experience",
    title: "Experience",
    subtitle: "Feel the Magic",
    description: "Scrollytelling section with GSAP animations — immerse them in the experience",
    tool: "GSAP + Lenis",
  },
  {
    step: "proof",
    title: "Proof",
    subtitle: "Show the Data",
    description: "Dashboard with live metrics, testimonials, and social proof",
    tool: "Dashboard + Appsmith",
  },
  {
    step: "close",
    title: "Close",
    subtitle: "CTA / Offer",
    description: "Strong call-to-action with urgency and clear next steps",
    tool: "Custom CTA Component",
  },
];
