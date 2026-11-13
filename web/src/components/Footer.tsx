import Link from "next/link";
import { asset, newIssueUrl, site } from "@/lib/site";
import { Logo } from "./ui/Logo";

export function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/** En la home los enlaces de sección son anclas; en el resto de páginas apuntan a la home. */
export function Footer({ onHome = true }: { onHome?: boolean }) {
  const s = (hash: string) => (onHome ? hash : `/${hash}`);
  const cols = [
    {
      title: "Producto",
      links: [
        { label: "Funciones", href: s("#funciones") },
        { label: "Probar en el navegador", href: s("#editor") },
        { label: "Instalación", href: s("#instalacion") },
        { label: "Preguntas frecuentes", href: s("#faq") },
      ],
    },
    {
      title: "Proyecto",
      links: [
        { label: "Código fuente", href: site.repo, external: true },
        { label: `Descargar ${site.download.file}`, href: asset(site.download.path), download: true },
        {
          label: "Informar de un error",
          href: newIssueUrl("[Error] ", "¿Qué hiciste, qué esperabas que pasara y qué pasó?\n\nDónde: ", "bug"),
          external: true,
        },
        { label: "Sugerencias", href: s("#sugerencias") },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Aviso legal", href: "/aviso-legal/" },
        { label: "Privacidad", href: "/privacidad/" },
        { label: "Cookies", href: "/cookies/" },
      ],
    },
  ] as const;

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block rounded-lg" aria-label={`${site.name}, ir al inicio`}>
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
            Editor de texto enriquecido, ligero y gratuito. Para escribir con estilo, sin ruido.
          </p>
          <div className="mt-6 text-sm">
            <p className="font-medium">Contacto</p>
            <p className="mt-1 text-mute">
              {site.owner.email ? (
                <a href={`mailto:${site.owner.email}`} className="underline underline-offset-4 hover:text-accent">
                  {site.owner.email}
                </a>
              ) : (
                <>
                  A través de las{" "}
                  <a
                    href={`${site.repo}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line-strong underline-offset-4 hover:text-accent"
                  >
                    incidencias de GitHub
                  </a>
                </>
              )}
            </p>
          </div>
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Editor AAG en GitHub (se abre en una pestaña nueva)"
            className="mt-6 inline-grid size-10 place-items-center rounded-full text-ink ring-1 ring-line-strong transition-colors hover:bg-ink hover:text-paper"
          >
            <GithubIcon className="size-[18px]" />
          </a>
        </div>

        <nav aria-label="Pie de página" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="eyebrow">{c.title}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {!("external" in l) && !("download" in l) ? (
                      <Link href={l.href} className="text-ink-2 transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-ink-2 transition-colors hover:text-accent"
                        {...("external" in l ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...("download" in l ? { download: true } : {})}
                      >
                        {l.label}
                        {"external" in l && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
          <p>Esta web no usa cookies ni herramientas de seguimiento.</p>
        </div>
      </div>
    </footer>
  );
}
