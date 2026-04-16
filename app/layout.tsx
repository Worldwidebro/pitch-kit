import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["presentation", "demo", "pitch", "scrollytelling", "GSAP", "Slidev"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-body antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-surface-100 py-8">
          <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
            <p>
              Pitch Kit — Interactive Demo & Presentation System
            </p>
            <p className="mt-1">
              Story + Interaction + Live Product + Visual Proof
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
