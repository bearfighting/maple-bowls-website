import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SectionContainer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20", className)} {...props} />;
}
