import { ArrowRight, Download } from "lucide-react";
import { asset, site } from "@/lib/site";
import { ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function FinalCta({ jarSize }: { jarSize: string }) {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <Reveal className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-ink px-6 py-24 text-paper sm:rounded-[2.5rem] sm:px-12 sm:py-32">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:100%_2.5rem]" />
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-accent/20 blur-[120px]" />
        <div aria-hidden className="absolute inset-y-0 left-[12%] -z-10 hidden w-px bg-accent/40 sm:block" />

        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow !text-paper/50">Gratis · Sin registro · {jarSize}</p>
          <h2 id="cta-title" className="mt-6 font-display text-[2.9rem] leading-[0.98] tracking-[-0.02em] text-balance sm:text-7xl lg:text-[5.6rem]">
            Tu próxima página
            <br />
            empieza <em className="text-paper/60">en blanco</em>
            <span aria-hidden className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.08em] animate-caret bg-accent sm:w-1" />
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-paper/70">
            Ábrela ahora en el navegador o llévate {site.name} a tu escritorio. Tardas menos en empezar que en leer esta frase.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 min-[480px]:flex-row">
            <ButtonLink href="#editor" variant="light" size="lg">
              Escribir ahora
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href={asset(site.download.path)} download variant="outline-light" size="lg">
              <Download className="size-4" aria-hidden />
              Descargar para escritorio
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
