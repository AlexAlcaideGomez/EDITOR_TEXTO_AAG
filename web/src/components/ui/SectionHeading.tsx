import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  intro,
  align = "left",
  dark = false,
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  id?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow flex items-center gap-3 ${centered ? "justify-center" : ""} ${dark ? "!text-paper/60" : ""}`}>
        <span className="text-accent">§ {index}</span>
        <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-paper/25" : "bg-line-strong"}`} />
        {label}
      </p>
      <h2
        id={id}
        className="mt-5 font-display text-[2.6rem] leading-[1.02] tracking-[-0.015em] text-balance sm:text-5xl lg:text-[3.6rem]"
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-pretty text-[1.05rem] leading-relaxed sm:text-lg ${dark ? "text-paper/70" : "text-mute"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
