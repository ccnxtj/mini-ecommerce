import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "primary" | "discount" | "success" | "neutral" | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-brand-purple-tint text-brand-purple border border-brand-purple/20",
  discount: "bg-rose-600 text-white font-semibold shadow-2xs",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium",
  neutral: "bg-zinc-100 text-zinc-700 border border-zinc-200/60",
  outline: "bg-transparent text-zinc-700 border border-zinc-300",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px] sm:text-[11px] rounded",
  md: "px-2.5 py-1 text-xs rounded-full",
};

export default function Badge({
  variant = "neutral",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center leading-none select-none tracking-tight ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
