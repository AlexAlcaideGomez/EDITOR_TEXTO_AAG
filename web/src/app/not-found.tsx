import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="contenido" className="ruled grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <Link href="/" aria-label="Editor AAG, ir al inicio" className="inline-block rounded-lg">
          <Logo />
        </Link>
        <p className="eyebrow mt-16">Error 404</p>
        <h1 className="mt-4 font-display text-6xl leading-none tracking-tight sm:text-7xl">
          Esta página <em className="squiggle">no existe</em>.
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-mute">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
        <Link href="/" className={buttonClass("primary", "lg", "mt-10")}>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
