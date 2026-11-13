import { Download, HardDrive, Info } from "lucide-react";
import { asset, site } from "@/lib/site";
import { LiveEditor } from "./LiveEditor";
import { ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function EditorSection() {
  return (
    <section
      id="editor"
      aria-labelledby="editor-title"
      className="relative isolate overflow-hidden bg-ink py-28 text-paper sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(217_58_34/0.18),transparent_70%)]"
      />
      <div aria-hidden className="paper-grain pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              id="editor-title"
              dark
              index="03"
              label="Versión web"
              title={
                <>
                  Pruébalo aquí. <em className="text-paper/55">Sin instalar nada.</em>
                </>
              }
              intro="Los mismos controles que la app de escritorio, más tres extras pensados para el navegador: guardado automático, exportación a HTML o texto y copia con formato."
            />
          </div>
          <Reveal className="flex flex-col gap-3 text-sm text-paper/65 lg:col-span-4 lg:pb-2">
            <p className="flex gap-2.5">
              <HardDrive className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              Tu borrador se guarda solo en este navegador. No se envía a ningún servidor.
            </p>
            <p className="flex gap-2.5">
              <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              Si borras los datos del navegador, el borrador desaparece: exporta lo que quieras conservar.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" delay={100}>
          <LiveEditor />
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row" delay={150}>
          <p className="text-paper/70">¿Prefieres una ventana propia en tu escritorio?</p>
          <ButtonLink href={asset(site.download.path)} download variant="light">
            <Download className="size-4" aria-hidden />
            Descargar la app de escritorio
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
