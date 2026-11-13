"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-paper-2/50 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="faq-title"
              index="07"
              label="Preguntas frecuentes"
              title={
                <>
                  Dudas, <em className="text-mute">resueltas.</em>
                </>
              }
              intro={
                <>
                  ¿No encuentras la tuya?{" "}
                  <a href="#sugerencias" className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">
                    Pregúntanos
                  </a>
                  .
                </>
              }
            />
          </div>
        </div>

        <Reveal className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent sm:text-xl">{f.q}</span>
                      <span
                        aria-hidden
                        className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ring-1 transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-expo)] ${
                          isOpen ? "rotate-45 bg-ink text-paper ring-ink" : "ring-line-strong group-hover:ring-ink/40"
                        }`}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="max-w-2xl pb-7 pr-12 text-[1.02rem] leading-relaxed text-mute">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
