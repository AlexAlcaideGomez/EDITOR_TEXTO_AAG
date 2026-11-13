import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { fonts, sizes } from "@/lib/site";
import { ColorDemo, StyleDemo } from "./FeatureDemos";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Features() {
  return (
    <section id="funciones" aria-labelledby="funciones-title" className="relative border-t border-line bg-paper-2/50 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="funciones-title"
            index="02"
            label="Funciones"
            title={
              <>
                Cuatro herramientas. <em className="text-mute">Bien hechas.</em>
              </>
            }
            intro="Las mismas en la app de escritorio y en la versión web. Prueba las dos primeras aquí mismo: son interactivas."
          />
          <Reveal>
            <a
              href="#editor"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Probarlas todas en el editor
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <Card
            className="lg:col-span-7"
            kicker="Estilo"
            title="Negrita, cursiva y subrayado"
            text="Se aplican a la selección, letra a letra, y se combinan entre sí. En la versión web, además, con Ctrl + B, Ctrl + I y Ctrl + U."
            benefits={["Combinables entre sí", "Un clic para activar y desactivar"]}
            visual={<StyleDemo />}
          />
          <Card
            className="lg:col-span-5"
            kicker="Tipografía"
            title="Cuatro familias clásicas"
            text="Sans para leer cómodamente en pantalla, serif para lo formal. Las cuatro que todo el mundo reconoce."
            benefits={["Arial, Calibri, Times New Roman y Verdana"]}
            visual={
              <ul className="grid grid-cols-2 gap-2">
                {fonts.map((f) => (
                  <li key={f.label} className="rounded-xl bg-paper px-4 py-4 ring-1 ring-line transition-colors duration-300 hover:bg-white">
                    <span className="block text-4xl leading-none" style={{ fontFamily: f.css }}>
                      Aa
                    </span>
                    <span className="mt-2 block truncate font-mono text-[0.68rem] text-mute">{f.label}</span>
                  </li>
                ))}
              </ul>
            }
          />
          <Card
            className="lg:col-span-5"
            kicker="Tamaño"
            title="Siete tamaños, del pie de página al titular"
            text="Escalas pensadas para jerarquizar: cuerpo de texto, subtítulos y títulos que se ven desde lejos."
            benefits={["10, 11, 12, 15, 16, 20 y 40 puntos"]}
            visual={
              <div className="flex h-36 items-end justify-between gap-1 rounded-xl bg-paper px-4 pb-3 pt-4 ring-1 ring-line">
                {sizes.map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <span className="font-display leading-none text-ink" style={{ fontSize: `${s * 2}px` }}>
                      A
                    </span>
                    <span className="font-mono text-[0.65rem] tabular-nums text-mute">{s}</span>
                  </div>
                ))}
              </div>
            }
          />
          <Card
            className="lg:col-span-7"
            kicker="Color"
            title="Cualquier color, no solo una paleta fija"
            text="En escritorio, un selector completo con muestras, HSV, HSL, RGB y CMYK. En la web, seis tonos a mano y el selector de tu sistema para el resto."
            benefits={["Para destacar, corregir o clasificar", "Se aplica solo al texto seleccionado"]}
            visual={<ColorDemo />}
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  kicker,
  title,
  text,
  benefits,
  visual,
  className = "",
}: {
  kicker: string;
  title: string;
  text: string;
  benefits: string[];
  visual: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      as="article"
      className={`group flex flex-col gap-8 rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_1px_0_rgb(255_255_255/0.7)_inset,0_24px_48px_-24px_rgb(20_20_19/0.25)] sm:p-8 ${className}`}
    >
      <div>{visual}</div>
      <div className="mt-auto">
        <p className="eyebrow text-accent!">{kicker}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance">{title}</h3>
        <p className="mt-2.5 max-w-prose text-[0.95rem] leading-relaxed text-mute">{text}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {benefits.map((b) => (
            <li key={b} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink-2 ring-1 ring-line">
              <Check className="size-3.5 text-accent" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
