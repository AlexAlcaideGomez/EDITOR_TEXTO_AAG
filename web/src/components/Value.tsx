import { Feather, MousePointerClick, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Value({ jarSize }: { jarSize: string }) {
  const pillars = [
    {
      icon: MousePointerClick,
      title: "Abres y escribes",
      text: "Una sola ventana, sin asistentes de bienvenida ni plantillas que elegir. Haces doble clic y el cursor ya te está esperando.",
    },
    {
      icon: SlidersHorizontal,
      title: "Solo lo que usas",
      text: "Seis controles en una única barra: negrita, cursiva, subrayado, tipografía, tamaño y color. Nada escondido en submenús.",
    },
    {
      icon: Feather,
      title: `Pesa ${jarSize}`,
      text: "Menos que cualquier foto de tu móvil. Cabe en una memoria USB y no instala nada en el sistema: lo borras y no queda rastro.",
    },
    {
      icon: ShieldCheck,
      title: "Tu texto es tuyo",
      text: "Sin cuentas, sin anuncios y sin enviar lo que escribes a ningún servidor. Y el código fuente está abierto a consulta en GitHub.",
    },
  ];

  return (
    <section id="propuesta" aria-labelledby="propuesta-title" className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="propuesta-title"
              index="01"
              label="Propuesta"
              title={
                <>
                  Lo justo para escribir bien. <em className="text-mute">Ni una herramienta más.</em>
                </>
              }
              intro="Los procesadores de texto completos son estupendos para maquetar un informe de cien páginas. Para tomar apuntes, redactar una carta o darle forma a una idea, sobran nueve de cada diez botones."
            />
          </div>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-3xl bg-line shadow-[0_0_0_1px_var(--color-line)] sm:grid-cols-2 lg:col-span-7">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-white sm:p-8">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-white text-ink shadow-[var(--shadow-card)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-xs text-mute-2">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-mute">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
