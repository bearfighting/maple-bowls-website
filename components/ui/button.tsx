import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
};

export function buttonVariants({
  variant = "primary",
  className = "",
}: { variant?: ButtonProps["variant"]; className?: string } = {}) {
  return cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    variants[variant],
    className,
  );
}

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, className })} {...props} />;
}
