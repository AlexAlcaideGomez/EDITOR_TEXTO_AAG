import { site } from "@/lib/site";

export function LogoMark({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill={inverted ? "#f6f4ef" : "#141413"} />
      <path
        d="M10 20.5 16 7l6 13.5M12.4 15.6h7.2"
        fill="none"
        stroke={inverted ? "#141413" : "#f6f4ef"}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="9" y="23.6" width="14" height="2.6" rx="1.3" fill="#d93a22" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="size-8 shrink-0" inverted={inverted} />
      <span className="text-[1.05rem] font-semibold tracking-tight">
        Editor <span className="font-display text-[1.3rem] font-normal italic leading-none">{site.shortName}</span>
      </span>
    </span>
  );
}
