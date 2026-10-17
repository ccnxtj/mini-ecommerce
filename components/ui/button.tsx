import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-xs active:scale-[0.99] border border-transparent",
  secondary:
    "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 active:bg-zinc-200/80 border border-transparent",
  outline:
    "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 shadow-2xs active:bg-zinc-100",
  ghost:
    "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-transparent",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 shadow-xs active:scale-[0.99] border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-full gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium whitespace-nowrap transition-all cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="size-4 animate-spin text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span className="truncate">{children}</span>
    </button>
  );
}
