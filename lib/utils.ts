import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function stagger(index: number, base = 0.1): string {
  return `${index * base}s`;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
