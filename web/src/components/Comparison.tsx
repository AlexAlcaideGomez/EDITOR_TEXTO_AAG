import { Check, Minus, X } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

type Cell = true | false | "partial" | string;

export function Comparison({ jarSize }: { jarSize: string }) {
  const cols = ["Editor AAG", "Editor de texto plano", "Procesador completo"];
  const shortCols = ["AAG", "Texto plano", "Procesador"];
  const rows: { label: string; hint?: string; cells: [Cell, Cell, Cell] }[] = [
    { label: "Negrita, cursiva y subrayado", cells: [true, false, true] },
    { label: "Tipografía, tamaño y color", cells: [true, "partial", true] },
    { label: "Barra con solo lo esencial", hint: "Todo a la vista, sin menús ni pestañas", cells: [true, true, false] },
    { label: "Sin cuenta ni registro", cells: [true, true, "Depende"] },
    { label: "Tamaño de la descarga", cells: [jarSize, "Viene con el sistema", "Cientos de MB o más"] },
    { label: "Precio", cells: ["Gratis", "Gratis", "Gratis o de pago"] },
    { label: "Tablas, imágenes, índices…", hint: "Si los necesitas, usa un procesador completo", cells: [false, false, true] },
  ];

  return (
    <section id="comparativa" aria-labelledby="comparativa-title" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="comparativa-title"
          index="04"
          label="Por qué AAG"
          align="center"
          title={
            <>
              El punto medio que <em className="text-mute">faltaba.</em>
            </>
          }
          intro="Un editor de texto plano se queda corto en cuanto quieres destacar algo. Un procesador completo es demasiado para una página. Editor AAG vive justo en medio, y te decimos con franqueza cuándo no es para ti."
        />

        <Reveal className="relative mt-16 hidden overflow-x-auto rounded-3xl sm:block bg-white shadow-[var(--shadow-card)] ring-1 ring-line">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Comparativa entre Editor AAG, un editor de texto plano y un procesador de textos completo</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[38%] p-6 align-bottom font-normal">
                  <span className="eyebrow">Característica</span>
                </th>
                {cols.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`p-5 align-bottom text-base font-semibold tracking-tight sm:p-6 ${i === 0 ? "bg-ink text-paper" : ""}`}
                  >
                    {i === 0 ? (
                      <span className="flex flex-col gap-1">
                        <span className="font-mono text-[0.65rem] font-normal uppercase tracking-wider text-accent">Recomendado</span>
                        {c}
                      </span>
                    ) : (
                      c
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="p-5 px-6 font-medium">
                    {r.label}
                    {r.hint && <span className="mt-0.5 block text-xs font-normal text-mute">{r.hint}</span>}
                  </th>
                  {r.cells.map((cell, i) => (
                    <td key={i} className={`p-5 sm:px-6 ${i === 0 ? "bg-ink/[0.035] font-medium" : "text-mute"}`}>
                      <CellValue v={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        {/* Versión móvil: una tarjeta por característica, sin scroll horizontal */}
        <Reveal className="mt-12 sm:hidden">
          <div aria-hidden className="sticky top-[4.75rem] z-10 grid grid-cols-3 gap-1 rounded-2xl bg-ink p-1.5 text-center text-xs font-semibold text-paper shadow-[0_8px_20px_-12px_rgb(20_20_19/0.5)]">
            {shortCols.map((c, i) => (
              <span key={c} className={`rounded-xl py-2 ${i === 0 ? "bg-paper text-ink" : ""}`}>
                {c}
              </span>
            ))}
          </div>
          <dl className="mt-3 space-y-3">
            {rows.map((r) => (
              <div key={r.label} className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] ring-1 ring-line">
                <dt className="text-[0.95rem] font-medium">
                  {r.label}
                  {r.hint && <span className="mt-0.5 block text-xs font-normal text-mute">{r.hint}</span>}
                </dt>
                <dd className="mt-3 grid grid-cols-3 gap-1 text-center text-xs">
                  {r.cells.map((cell, i) => (
                    <span
                      key={i}
                      className={`flex min-h-10 items-center justify-center rounded-xl px-1.5 py-2 ${i === 0 ? "bg-ink/[0.05] font-medium" : "text-mute"}`}
                    >
                      <span className="sr-only">{cols[i]}: </span>
                      <CellValue v={cell} compact />
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <p className="mt-4 text-center text-xs text-mute">
          «Editor de texto plano» se refiere a programas que guardan solo texto sin formato. Algunas versiones recientes de estos programas
          han empezado a añadir formato básico, y las características de los procesadores completos varían según el producto.
        </p>
      </div>
    </section>
  );
}

function CellValue({ v, compact = false }: { v: Cell; compact?: boolean }) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-[#1f7a4d]/10 text-[#1f7a4d]">
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
        <span className="sr-only">Sí</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-ink/5 text-mute-2">
          <X className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
        <span className="sr-only">No</span>
      </span>
    );
  if (v === "partial")
    return (
      <span className={`inline-flex items-center gap-2 ${compact ? "flex-col gap-1" : ""}`}>
        <span className="grid size-6 place-items-center rounded-full bg-ink/5 text-mute">
          <Minus className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
        <span className="text-xs">{compact ? "Parcial" : "Solo tipo y tamaño, para todo el documento"}</span>
      </span>
    );
  return <span>{v}</span>;
}
