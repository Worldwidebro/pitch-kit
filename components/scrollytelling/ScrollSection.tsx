"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  id: string;
  title: string;
  description: string;
  animation?: "fade-up" | "slide-in" | "scale" | "parallax" | "reveal";
  pin?: boolean;
  className?: string;
  children?: React.ReactNode;
  accent?: boolean;
}

export function ScrollSection({
  id,
  title,
  description,
  animation = "fade-up",
  pin = false,
  className,
  children,
  accent = false,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const triggers: ScrollTrigger[] = [];

    if (pin) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
        },
      });
      tl.fromTo(content, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
      if (triggers.length === 0 && tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }
    } else {
      const triggerConfig: ScrollTrigger.Vars = {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      };

      switch (animation) {
        case "fade-up":
          gsap.fromTo(content, { opacity: 0, y: 60 }, {
            ...triggerConfig,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
          break;
        case "slide-in":
          gsap.fromTo(content, { opacity: 0, x: -80 }, {
            ...triggerConfig,
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
          break;
        case "scale":
          gsap.fromTo(content, { opacity: 0, scale: 0.85 }, {
            ...triggerConfig,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
          break;
        case "parallax":
          gsap.fromTo(content, { y: 100 }, {
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -100,
            ease: "none",
          });
          break;
        case "reveal":
          gsap.fromTo(content, { clipPath: "inset(0 100% 0 0)" }, {
            ...triggerConfig,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
          });
          break;
      }
    }

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, [animation, pin]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative py-24", className)}
    >
      <div ref={contentRef} className="mx-auto max-w-5xl px-6">
        <span
          className={cn(
            "mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider",
            accent
              ? "border border-accent/20 bg-accent/10 text-accent"
              : "border border-surface-200 bg-surface-50 text-zinc-500"
          )}
        >
          {animation}
        </span>
        <h2 className={cn("text-4xl font-bold tracking-tight sm:text-5xl", accent && "text-glow text-accent")}>
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">{description}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
