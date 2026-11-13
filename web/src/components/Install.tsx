"use client";

import { Coffee, Download, MousePointerClick } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { asset, site } from "@/lib/site";
import { ButtonLink } from "./ui/Button";
import { CopyButton } from "./ui/CopyButton";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const OS = [
  {
    id: "windows",
    label: "Windows",
    java: "Instala un JDK o JRE gratuito, por ejemplo Eclipse Temurin, desde adoptium.net. Marca la opción «Associate .jar» durante la instalación.",
    open: "Haz doble clic en editor-aag.jar. Si Windows lo abre con otro programa, usa el comando de abajo en «Símbolo del sistema».",
    command: `cd %USERPROFILE%\\Downloads && java -jar ${site.download.file}`,
  },
  {
    id: "macos",
    label: "macOS",
    java: "Instala Eclipse Temurin desde adoptium.net (paquete .pkg) o, si usas Homebrew, con «brew install --cask temurin».",
    open: "La primera vez, haz clic derecho sobre el archivo → Abrir, y confirma. macOS lo pide con apps que no vienen de la App Store.",
    command: `cd ~/Downloads && java -jar ${site.download.file}`,
  },
  {
    id: "linux",
    label: "Linux",
    java: "Instálalo desde el gestor de paquetes de tu distribución. En Ubuntu o Debian: «sudo apt install default-jre».",
    open: "Desde tu gestor de archivos (abrir con Java) o desde la terminal con el comando de abajo.",
    command: `cd ~/Descargas && java -jar ${site.download.file}`,
  },
] as const;

export function Install({ jarSize }: { jarSize: string }) {
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const os = OS[tab];

  function onKey(e: KeyboardEvent) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? OS.length - 1 : (tab + dir + OS.length) % OS.length;
    setTab(next);
    tabs.current[next]?.focus();
  }

  const steps = [
    {
      icon: Coffee,
      title: `Ten Java ${site.download.javaMin} o superior`,
      text: os.java,
      extra: (
        <a
          href="https://adoptium.net/es/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex text-sm font-medium underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          Ir a adoptium.net <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      ),
    },
    {
      icon: Download,
      title: "Descarga el editor",
      text: `Un único archivo de ${jarSize}. No hay instalador, ni registro, ni nada que configurar.`,
      extra: (
        <ButtonLink href={asset(site.download.path)} download className="mt-4" size="md">
          <Download className="size-4" aria-hidden />
          {site.download.file}
        </ButtonLink>
      ),
    },
    {
      icon: MousePointerClick,
      title: "Ábrelo y escribe",
      text: os.open,
      extra: (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-ink py-1.5 pl-4 pr-1.5 font-mono text-[0.78rem] text-paper">
          <code tabIndex={0} className="min-w-0 overflow-x-auto whitespace-nowrap py-1.5 [scrollbar-width:none]">
            <span className="select-none text-paper/45">$ </span>
            {os.command}
          </code>
          <CopyButton text={os.command} className="shrink-0 text-paper/80 hover:bg-paper/10 hover:text-paper" />
        </div>
      ),
    },
  ];

  return (
    <section id="instalacion" aria-labelledby="instalacion-title" className="border-y border-line bg-paper-2/50 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="instalacion-title"
            index="05"
            label="Instalación"
            title={
              <>
                De la descarga a la primera línea, <em className="text-mute">en tres pasos.</em>
              </>
            }
          />
          <Reveal>
            <div
              role="tablist"
              aria-label="Sistema operativo"
              className="inline-flex rounded-full bg-white p-1 shadow-[var(--shadow-card)] ring-1 ring-line"
            >
              {OS.map((o, i) => (
                <button
                  key={o.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${o.id}`}
                  aria-selected={tab === i}
                  aria-controls="panel-instalacion"
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => setTab(i)}
                  onKeyDown={onKey}
                  className={`h-10 rounded-full px-5 text-sm font-medium transition-[background-color,color] duration-300 ${
                    tab === i ? "bg-ink text-paper" : "text-mute hover:text-ink"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div id="panel-instalacion" role="tabpanel" aria-labelledby={`tab-${os.id}`} className="mt-16">
        <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 90}
              className="relative flex min-w-0 flex-col rounded-[1.75rem] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl leading-none text-accent">{i + 1}</span>
                <s.icon className="size-5 text-mute" aria-hidden />
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p key={os.id} className="mt-2.5 text-[0.95rem] leading-relaxed text-mute motion-safe:animate-[fade_.4s_ease]">
                {s.text}
              </p>
              <div className="mt-auto">{s.extra}</div>
            </Reveal>
          ))}
        </ol>
        </div>

        <p className="mt-8 text-sm text-mute">
          ¿Quieres compilarlo tú? El código fuente está en{" "}
          <a
            href={site.sourceFile}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent"
          >
            GitHub<span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          : un único archivo Java, sin dependencias externas.
        </p>
      </div>
    </section>
  );
}
