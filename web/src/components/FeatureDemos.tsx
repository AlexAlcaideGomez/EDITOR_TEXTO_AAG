"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

export function StyleDemo() {
  const [s, setS] = useState({ bold: true, italic: false, underline: false });
  const toggle = (k: keyof typeof s) => setS((v) => ({ ...v, [k]: !v[k] }));
  const items = [
    { k: "bold" as const, label: "Negrita", Icon: Bold },
    { k: "italic" as const, label: "Cursiva", Icon: Italic },
    { k: "underline" as const, label: "Subrayado", Icon: Underline },
  ];
  return (
    <div className="rounded-xl bg-paper ring-1 ring-line">
      <div role="group" aria-label="Prueba los estilos" className="flex gap-1 border-b border-line p-2">
        {items.map(({ k, label, Icon }) => (
          <button
            key={k}
            type="button"
            aria-pressed={s[k]}
            aria-label={label}
            onClick={() => toggle(k)}
            className={`inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm transition-[background-color,color,transform] duration-200 active:scale-95 ${
              s[k] ? "bg-ink text-paper" : "text-ink-2 hover:bg-ink/5"
            }`}
          >
            <Icon className="size-4" aria-hidden />
            <span className="hidden min-[420px]:inline">{label}</span>
          </button>
        ))}
      </div>
      <p
        aria-live="polite"
        className="flex min-h-36 items-center px-5 py-6 font-display text-[2.6rem] leading-none tracking-tight transition-all duration-300 sm:text-6xl"
        style={{
          fontWeight: s.bold ? 700 : 400,
          fontStyle: s.italic ? "italic" : "normal",
          textDecoration: s.underline ? "underline" : "none",
          textDecorationThickness: "2px",
          textUnderlineOffset: "8px",
          fontFamily: "Arial, Helvetica, sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        Así de fácil.
      </p>
    </div>
  );
}

const COLORS = [
  { name: "Rojo corrector", hex: "#d93a22" },
  { name: "Azul", hex: "#2457c5" },
  { name: "Verde", hex: "#1f7a4d" },
  { name: "Ocre", hex: "#b27b16" },
  { name: "Violeta", hex: "#6b3fb5" },
];

export function ColorDemo() {
  const [c, setC] = useState(COLORS[0]);
  return (
    <div className="grid items-center gap-6 rounded-xl bg-paper p-5 ring-1 ring-line sm:grid-cols-[auto_1fr] sm:p-6">
      <div
        aria-hidden
        className="relative mx-auto size-28 rounded-full shadow-[0_12px_30px_-12px_rgb(20_20_19/0.4)] sm:size-32"
        style={{
          background:
            "radial-gradient(circle, #fff 0 22%, transparent 60%), conic-gradient(#d93a22, #b27b16, #e3c234, #1f7a4d, #19a1a8, #2457c5, #6b3fb5, #c2307a, #d93a22)",
        }}
      >
        <span
          className="absolute inset-[34%] rounded-full ring-4 ring-white transition-colors duration-500"
          style={{ background: c.hex }}
        />
      </div>
      <div>
        <p className="text-lg leading-snug text-ink-2 sm:text-xl">
          Marca lo <span className="font-semibold transition-colors duration-500" style={{ color: c.hex }}>importante</span> y
          encuéntralo de un vistazo.
        </p>
        <div role="group" aria-label="Elige un color de ejemplo" className="mt-4 flex flex-wrap gap-2">
          {COLORS.map((x) => (
            <button
              key={x.hex}
              type="button"
              aria-pressed={c.hex === x.hex}
              aria-label={x.name}
              title={x.name}
              onClick={() => setC(x)}
              className="grid size-10 place-items-center rounded-full transition-transform duration-200 hover:scale-110"
            >
              <span
                className={`size-6 rounded-full ring-1 ring-black/10 transition ${c.hex === x.hex ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""}`}
                style={{ background: x.hex }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
