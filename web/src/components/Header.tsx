"use client";

import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { asset, nav, site } from "@/lib/site";
import { ButtonLink } from "./ui/Button";
import { Logo } from "./ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Estado «con scroll» para el fondo del header.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // Por encima de la primera sección no hay ningún enlace activo.
      const first = document.getElementById(nav[0].href.slice(1));
      if (first && window.scrollY + window.innerHeight * 0.5 < first.offsetTop) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta la sección visible en el menú.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menú móvil: bloqueo de scroll, Escape para cerrar y foco atrapado.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-out-expo)] sm:pl-5 ${
          scrolled || open
            ? "bg-paper/80 shadow-[0_0_0_1px_var(--color-line),0_12px_32px_-16px_rgb(20_20_19/0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >
        <a href="#inicio" className="rounded-lg" aria-label={`${site.name}, ir al inicio`}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active === item.href ? "text-ink" : "text-mute hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      active === item.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <span className="hidden min-[440px]:block">
            <ButtonLink
              href={asset(site.download.path)}
              download
              aria-label={`Descargar gratis: ${site.name} para escritorio (${site.download.file})`}
            >
              <Download className="size-4" aria-hidden />
              Descargar gratis
            </ButtonLink>
          </span>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        ref={panel}
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl bg-paper/95 p-2 shadow-[0_0_0_1px_var(--color-line),0_24px_48px_-24px_rgb(20_20_19/0.35)] backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Menú móvil">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between rounded-2xl px-4 py-3.5 text-lg transition-colors hover:bg-ink/5"
                >
                  <span className="font-display text-2xl">{item.label}</span>
                  <span className="font-mono text-xs text-mute">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-2 border-t border-line p-2 pt-3">
          <ButtonLink href={asset(site.download.path)} download size="lg" className="w-full" onClick={() => setOpen(false)}>
            <Download className="size-4" aria-hidden />
            Descargar gratis para escritorio
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
