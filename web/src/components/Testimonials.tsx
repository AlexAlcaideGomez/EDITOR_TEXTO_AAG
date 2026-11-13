import { MessageSquarePlus, Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Testimonials() {
  const hasDemo = testimonials.some((t) => t.isDemo);
  return (
    <section id="opiniones" aria-labelledby="opiniones-title" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="opiniones-title"
          index="06"
          label="Opiniones"
          title={
            <>
              Este espacio es para <em className="text-mute">tu opinión.</em>
            </>
          }
          intro={
            hasDemo
              ? "Editor AAG es un proyecto reciente y preferimos no inventarnos elogios. Las tarjetas de abajo son ejemplos ilustrativos de cómo se mostrarán las opiniones reales que nos envíes."
              : "Lo que cuentan quienes ya escriben con Editor AAG."
          }
        />

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {testimonials.map((t, i) => (
            <Reveal
              as="li"
              key={t.quote}
              delay={i * 80}
              className={`relative flex flex-col rounded-[1.75rem] p-7 ${
                t.isDemo ? "border border-dashed border-line-strong [background:repeating-linear-gradient(135deg,transparent_0_10px,rgb(20_20_19/0.02)_10px_20px)]" : "bg-white shadow-[var(--shadow-card)] ring-1 ring-line"
              }`}
            >
              {t.isDemo && (
                <span className="absolute right-5 top-5 rotate-3 rounded-md border border-accent/50 px-2 py-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-wider text-accent">
                  Ejemplo
                </span>
              )}
              <Quote className="size-6 text-accent" aria-hidden />
              <blockquote className="mt-5 font-display text-[1.45rem] leading-snug tracking-tight text-ink-2">
                <p>{t.quote}</p>
              </blockquote>
              <p className="mt-auto pt-8 text-sm">
                <span className="block font-medium">{t.author}</span>
                <span className="text-mute">{t.role}</span>
              </p>
            </Reveal>
          ))}

          <Reveal as="li" delay={testimonials.length * 80} className="md:col-span-2 lg:col-span-1">
            <a
              href="#sugerencias"
              data-tipo="opinion"
              className="group flex h-full min-h-64 flex-col justify-between rounded-[1.75rem] bg-ink p-7 text-paper transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
            >
              <MessageSquarePlus className="size-6 text-accent" aria-hidden />
              <span>
                <span className="block font-display text-3xl leading-tight">¿Ya lo has probado?</span>
                <span className="mt-3 block text-sm text-paper/70">
                  Cuéntanos qué te parece. Las opiniones reales sustituirán a los ejemplos, siempre con tu permiso.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  Dejar mi opinión
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
