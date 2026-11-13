import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_8px_24px_-10px_rgb(20_20_19/0.6)] hover:bg-ink-2 hover:shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_14px_32px_-12px_rgb(20_20_19/0.7)]",
  secondary:
    "bg-white/70 text-ink ring-1 ring-line-strong backdrop-blur hover:bg-white hover:ring-ink/30",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-paper text-ink hover:bg-white",
  "outline-light": "text-paper ring-1 ring-paper/25 hover:bg-paper/10 hover:ring-paper/50",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <a className={buttonClass(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
