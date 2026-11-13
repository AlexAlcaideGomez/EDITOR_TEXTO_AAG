import { ArrowDown, Download, Terminal } from "lucide-react";
import { asset, site } from "@/lib/site";
import { ButtonLink } from "./ui/Button";

export function Hero({ jarSize }: { jarSize: string }) {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 sm:pt-40">
      {/* Fondo: pauta de cuaderno que se desvanece */}
      <div
        aria-hidden
        className="ruled pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_20%,transparent_75%)] opacity-60"
      />
      <div aria-hidden className="paper-grain pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-white/70 py-1.5 pl-1.5 pr-4 text-[0.8rem] text-mute shadow-[0_0_0_1px_var(--color-line)] backdrop-blur">
          <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-white">
            Gratis
          </span>
          Editor de texto enriquecido · Windows, macOS y Linux
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1
            id="hero-title"
            className="font-display text-[3.4rem] leading-[0.92] tracking-[-0.025em] text-balance min-[400px]:text-[4rem] sm:text-[5.5rem] lg:col-span-8 lg:text-[5.75rem] xl:text-[6.1rem]"
          >
            Escribe con estilo.{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block italic text-ink-2">
              Sin ruido.
              <svg
                aria-hidden
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent sm:-bottom-3 sm:h-4"
              >
                <path
                  className="draw-on"
                  d="M3 15 C 40 6, 70 22, 105 12 S 170 4, 205 14 S 270 20, 297 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <div className="lg:col-span-4 lg:pb-3">
            <p className="max-w-md text-pretty text-lg leading-relaxed text-mute sm:text-xl">
              <strong className="font-semibold text-ink">{site.name}</strong> reúne lo que de verdad usas al escribir —
              negrita, cursiva, subrayado, tipografía, tamaño y color— en una sola ventana que se abre al instante.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row lg:flex-col">
              <ButtonLink href="#editor" size="lg">
                Probar ahora en el navegador
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href={asset(site.download.path)}
                download
                variant="secondary"
                size="lg"
                aria-label={`Descargar · ${jarSize}: app de escritorio (${site.download.file})`}
              >
                <Download className="size-4" aria-hidden />
                Descargar · {jarSize}
              </ButtonLink>
            </div>
          </div>
        </div>

        <Showcase />

        {/* Datos verificables, sin cifras infladas */}
        <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line text-center shadow-[0_0_0_1px_var(--color-line)] sm:mt-20 md:grid-cols-4">
          {[
            { k: "Descarga", v: jarSize },
            { k: "Requisito", v: `Java ${site.download.javaMin}+` },
            { k: "Cuentas necesarias", v: "Ninguna" },
            { k: "Precio", v: "0 €" },
          ].map((item) => (
            <div key={item.k} className="flex flex-col-reverse gap-1 bg-paper px-4 py-6">
              <dt className="eyebrow">{item.k}</dt>
              <dd className="font-display text-3xl tracking-tight sm:text-4xl">{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Escaparate visual de la interfaz (decorativo, construido en HTML/CSS). */
function Showcase() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl sm:mt-24" aria-hidden="true">
      {/* Notas de margen del «corrector» */}
      <div className="pointer-events-none absolute -left-4 top-[42%] hidden -translate-x-full min-[1440px]:block">
        <p className="w-40 text-right font-display text-xl italic leading-tight text-accent">Negrita, cursiva y subrayado: un clic.</p>
        <svg viewBox="0 0 120 50" className="ml-auto mt-1 h-10 w-28 text-accent">
          <path d="M4 8 C 40 6, 80 14, 112 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M102 38 L113 41 L110 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="pointer-events-none absolute -right-4 top-[6%] hidden translate-x-full min-[1440px]:block">
        <svg viewBox="0 0 120 50" className="h-10 w-28 text-accent">
          <path d="M116 42 C 80 40, 40 30, 8 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 8 L7 9 L12 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="mt-1 w-44 font-display text-xl italic leading-tight text-accent">Siete tamaños, de 10 a 40.</p>
      </div>

      {/* Ventana */}
      <div className="relative overflow-hidden rounded-[18px] bg-white shadow-[var(--shadow-window)] ring-1 ring-line sm:rounded-[22px]">
        <div className="flex h-10 items-center gap-2 border-b border-line bg-paper-2/70 px-4">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="mx-auto pr-12 font-mono text-[0.7rem] text-mute">Sin título — Editor AAG</span>
        </div>

        {/* Barra de herramientas */}
        <div className="flex items-center gap-1.5 overflow-hidden border-b border-line px-3 py-2 text-[0.8rem] sm:gap-2 sm:px-4">
          <span className="hero-press grid size-8 shrink-0 place-items-center rounded-md font-bold">B</span>
          <span className="grid size-8 shrink-0 place-items-center rounded-md font-display text-lg italic">I</span>
          <span className="grid size-8 shrink-0 place-items-center rounded-md underline underline-offset-2">U</span>
          <span className="mx-1 h-5 w-px shrink-0 bg-line-strong" />
          <span className="flex h-8 shrink-0 items-center gap-6 rounded-md px-2.5 ring-1 ring-line">
            Arial <span className="text-mute">▾</span>
          </span>
          <span className="flex h-8 shrink-0 items-center gap-3 rounded-md px-2.5 ring-1 ring-line">
            16 <span className="text-mute">▾</span>
          </span>
          <span className="mx-1 hidden h-5 w-px shrink-0 bg-line-strong sm:block" />
          <span className="hidden h-8 shrink-0 items-center gap-1.5 rounded-md px-2 sm:flex">
            {["#141413", "#d93a22", "#2457c5", "#1f7a4d", "#b27b16"].map((c) => (
              <span key={c} className="size-4 rounded-full ring-1 ring-black/10" style={{ background: c }} />
            ))}
          </span>
        </div>

        {/* Documento */}
        <div className="grid gap-0 sm:grid-cols-[1fr_minmax(0,38rem)_1fr]">
          <div className="px-6 pb-12 pt-8 sm:col-start-2 sm:px-0 sm:pb-16 sm:pt-12">
            <p className="font-['Times_New_Roman',Times,serif] text-[1.9rem] leading-tight tracking-tight text-ink sm:text-[2.5rem]">
              Capítulo uno
            </p>
            <p className="mt-4 font-[Arial,Helvetica,sans-serif] text-[0.95rem] leading-[1.75] text-ink-2 sm:text-base">
              Había una página en blanco y una idea que no cabía en la cabeza. Bastaba con escribir, marcar lo importante con{" "}
              <span className="hero-word rounded-[3px] px-0.5">estilo</span> y seguir adelante, sin menús infinitos ni ventanas
              que distraen.
            </p>
            <p className="mt-3 font-[Verdana,Geneva,sans-serif] text-[0.88rem] leading-[1.8] text-ink-2 sm:text-[0.92rem]">
              Lo esencial se escribe en <em>cursiva</em>, se <u className="underline-offset-2">subraya</u> o se pinta de{" "}
              <span className="font-semibold text-accent">color</span>
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-caret bg-accent" />
            </p>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante: arranque desde terminal */}
      <div className="absolute -bottom-6 right-4 hidden items-center gap-3 rounded-2xl bg-ink px-4 py-3 font-mono text-[0.78rem] text-paper shadow-[0_20px_40px_-16px_rgb(20_20_19/0.6)] sm:flex lg:-right-6">
        <Terminal className="size-4 text-accent" />
        <span>
          <span className="text-paper/50">$</span> java -jar {site.download.file}
        </span>
      </div>
    </div>
  );
}
