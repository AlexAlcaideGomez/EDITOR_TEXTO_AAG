import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex h-20 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="rounded-lg" aria-label={`${site.name}, ir al inicio`}>
            <Logo />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden />
            Volver al inicio
          </Link>
        </div>
      </header>
      <main id="contenido" className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 font-display text-5xl leading-none tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-mute">Última actualización: {updated}</p>
        <div className="mt-12 space-y-10 text-[1.02rem] leading-relaxed text-ink-2 [&_a]:font-medium [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:text-accent [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_li]:mt-1.5 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer onHome={false} />
    </>
  );
}

/** Muestra el dato o un aviso visible si el titular aún no lo ha configurado. */
export function OwnerField({ value }: { value: string }) {
  return value ? (
    <>{value}</>
  ) : (
    <span className="rounded bg-accent-soft px-1.5 py-0.5 text-sm font-medium text-accent-ink">Pendiente de completar</span>
  );
}
