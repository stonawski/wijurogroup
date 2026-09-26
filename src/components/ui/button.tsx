import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center border px-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "primary"
          ? "border-primary bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
          : "border-border bg-transparent text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}