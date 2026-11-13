"use client";

import {
  Bold,
  Check,
  ClipboardCopy,
  CloudOff,
  FileCode2,
  FileText,
  FilePlus2,
  Italic,
  Redo2,
  RemoveFormatting,
  Underline,
  Undo2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { fonts, sizes } from "@/lib/site";
import { sanitizeHtml } from "@/lib/sanitize";

const STORAGE_KEY = "editor-aag:borrador:v1";

const SWATCHES = [
  { name: "Tinta", hex: "#1d1d1b" },
  { name: "Rojo corrector", hex: "#d93a22" },
  { name: "Azul", hex: "#2457c5" },
  { name: "Verde", hex: "#1f7a4d" },
  { name: "Ocre", hex: "#b27b16" },
  { name: "Violeta", hex: "#6b3fb5" },
] as const;

const SAMPLE = `<p><span style="font-family: 'Times New Roman', Times, 'Liberation Serif', serif; font-size: 40px;">Mi primer documento</span></p><p>Selecciona cualquier palabra y pruébalo: <b>negrita</b>, <i>cursiva</i>, <u>subrayado</u>, otra <span style="font-family: Verdana, Geneva, 'DejaVu Sans', sans-serif;">tipografía</span>, otro <span style="font-size: 20px;">tamaño</span> o un <span style="color: #d93a22;">color</span> distinto.</p><p>Todo lo que escribas aquí se guarda automáticamente en este navegador. Cuando termines, expórtalo como HTML o como texto plano.</p>`;

type Format = { bold: boolean; italic: boolean; underline: boolean; font: string; size: string; color: string };
type SaveState = { kind: "idle" } | { kind: "saved"; at: Date } | { kind: "error" };

function rgbToHex(rgb: string) {
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return "#1d1d1b";
  return `#${m
    .slice(0, 3)
    .map((n) => Number(n).toString(16).padStart(2, "0"))
    .join("")}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function LiveEditor() {
  const editor = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const pendingSize = useRef<number>(16);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [fmt, setFmt] = useState<Format>({ bold: false, italic: false, underline: false, font: "Arial", size: "16", color: "#1d1d1b" });
  const [counts, setCounts] = useState({ words: 0, chars: 0 });
  const [save, setSave] = useState<SaveState>({ kind: "idle" });
  const [confirmNew, setConfirmNew] = useState(false);
  const [notice, setNotice] = useState<string>("");

  /* ───────────── utilidades de selección ───────────── */

  const selectionInEditor = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editor.current) return null;
    const range = sel.getRangeAt(0);
    return editor.current.contains(range.commonAncestorContainer) ? range : null;
  }, []);

  const restoreSelection = useCallback(() => {
    const el = editor.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const sel = window.getSelection();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    } else if (sel) {
      // Sin selección previa: caret al final del documento.
      const r = document.createRange();
      r.selectNodeContents(el);
      r.collapse(false);
      sel.removeAllRanges();
      sel.addRange(r);
    }
  }, []);

  const readFormat = useCallback(() => {
    const range = selectionInEditor();
    if (!range) return;
    savedRange.current = range.cloneRange();
    let node: Node | null = range.startContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    if (!(node instanceof Element)) return;
    const cs = getComputedStyle(node);
    const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim().toLowerCase();
    const font = fonts.find((f) => f.label.toLowerCase() === family)?.label ?? "";
    const px = Math.round(parseFloat(cs.fontSize));
    setFmt({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      font,
      size: (sizes as readonly number[]).includes(px) ? String(px) : "",
      color: rgbToHex(cs.color),
    });
  }, [selectionInEditor]);

  /* ───────────── guardado y recuento ───────────── */

  const updateCounts = useCallback(() => {
    const text = editor.current?.innerText ?? "";
    const clean = text.replace(/ /g, " ");
    setCounts({
      words: clean.trim() ? clean.trim().split(/\s+/).length : 0,
      chars: clean.replace(/\n/g, "").length,
    });
  }, []);

  const persist = useCallback(() => {
    if (!editor.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, sanitizeHtml(editor.current.innerHTML));
      setSave({ kind: "saved", at: new Date() });
    } catch {
      setSave({ kind: "error" });
    }
  }, []);

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(persist, 500);
  }, [persist]);

  /** Convierte los marcadores temporales de tamaño en píxeles reales. */
  const normalizeSizes = useCallback((px: number) => {
    const el = editor.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>('[style*="xxx-large"]').forEach((n) => {
      n.style.fontSize = `${px}px`;
    });
    el.querySelectorAll('font[size="7"]').forEach((n) => {
      const span = document.createElement("span");
      span.style.fontSize = `${px}px`;
      while (n.firstChild) span.appendChild(n.firstChild);
      n.replaceWith(span);
    });
  }, []);

  const afterChange = useCallback(() => {
    updateCounts();
    readFormat();
    scheduleSave();
  }, [readFormat, scheduleSave, updateCounts]);

  /* ───────────── comandos ───────────── */

  const exec = useCallback(
    (command: string, value?: string) => {
      restoreSelection();
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand(command, false, value);
      afterChange();
    },
    [afterChange, restoreSelection],
  );

  const applySize = useCallback(
    (px: number) => {
      pendingSize.current = px;
      restoreSelection();
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("fontSize", false, "7");
      normalizeSizes(px);
      afterChange();
    },
    [afterChange, normalizeSizes, restoreSelection],
  );

  /* ───────────── ciclo de vida ───────────── */

  useEffect(() => {
    const el = editor.current;
    if (!el) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      setSave({ kind: "error" });
    }
    el.innerHTML = stored ? sanitizeHtml(stored) : SAMPLE;
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      /* navegadores sin soporte: se ignora */
    }
    updateCounts();

    const onSel = () => readFormat();
    document.addEventListener("selectionchange", onSel);
    return () => {
      document.removeEventListener("selectionchange", onSel);
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [readFormat, updateCounts]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 2400);
    return () => clearTimeout(t);
  }, [notice]);

  /* ───────────── acciones de documento ───────────── */

  function exportHtml() {
    const body = sanitizeHtml(editor.current?.innerHTML ?? "");
    const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Documento — Editor AAG</title>
<style>body{max-width:42rem;margin:3rem auto;padding:0 1.25rem;font:16px/1.6 Arial,Helvetica,sans-serif;color:#1d1d1b}p{margin:0 0 .6em}</style>
</head>
<body>
${body}
</body>
</html>
`;
    download(`documento-aag-${today()}.html`, html, "text/html;charset=utf-8");
    setNotice("Archivo HTML descargado");
  }

  function exportTxt() {
    download(`documento-aag-${today()}.txt`, editor.current?.innerText ?? "", "text/plain;charset=utf-8");
    setNotice("Archivo de texto descargado");
  }

  async function copyAll() {
    const el = editor.current;
    if (!el) return;
    const html = sanitizeHtml(el.innerHTML);
    const text = el.innerText;
    try {
      if ("ClipboardItem" in window) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setNotice("Copiado con formato");
    } catch {
      setNotice("Tu navegador no permitió copiar");
    }
  }

  function newDocument() {
    const el = editor.current;
    if (!el) return;
    el.innerHTML = "";
    savedRange.current = null;
    setConfirmNew(false);
    el.focus();
    afterChange();
    persist();
  }

  /* ───────────── render ───────────── */

  const keepSelection = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="overflow-hidden rounded-[22px] bg-white text-ink shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_40px_100px_-40px_rgb(0_0_0/0.8)]">
      {/* Barra de herramientas */}
      <div
        role="toolbar"
        aria-label="Formato del texto"
        aria-controls="documento"
        className="relative flex flex-wrap items-center gap-1 border-b border-line bg-paper/60 px-2 py-2 sm:px-3"
      >
        <ToolGroup>
          <ToolButton label="Negrita (Ctrl+B)" pressed={fmt.bold} onMouseDown={keepSelection} onClick={() => exec("bold")}>
            <Bold className="size-[18px]" strokeWidth={2.5} />
          </ToolButton>
          <ToolButton label="Cursiva (Ctrl+I)" pressed={fmt.italic} onMouseDown={keepSelection} onClick={() => exec("italic")}>
            <Italic className="size-[18px]" />
          </ToolButton>
          <ToolButton label="Subrayado (Ctrl+U)" pressed={fmt.underline} onMouseDown={keepSelection} onClick={() => exec("underline")}>
            <Underline className="size-[18px]" />
          </ToolButton>
        </ToolGroup>

        <Divider />

        <div className="flex shrink-0 items-center gap-1 max-sm:order-2">
        <label className="sr-only" htmlFor="ed-font">
          Tipo de letra
        </label>
        <select
          id="ed-font"
          value={fmt.font}
          onChange={(e) => {
            const f = fonts.find((x) => x.label === e.target.value);
            if (f) exec("fontName", f.css);
          }}
          className="h-10 w-[9.5rem] shrink-0 rounded-lg bg-white px-2.5 text-sm ring-1 ring-line transition hover:ring-line-strong"
        >
          <option value="" disabled>
            Tipo de letra
          </option>
          {fonts.map((f) => (
            <option key={f.label} value={f.label} style={{ fontFamily: f.css }}>
              {f.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="ed-size">
          Tamaño de letra
        </label>
        <select
          id="ed-size"
          value={fmt.size}
          onChange={(e) => applySize(Number(e.target.value))}
          className="h-10 w-[4.6rem] shrink-0 rounded-lg bg-white px-2.5 text-sm tabular-nums ring-1 ring-line transition hover:ring-line-strong"
        >
          <option value="" disabled>
            —
          </option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        </div>

        <Divider />

        <ToolGroup className="max-sm:order-3">
          {SWATCHES.map((c) => (
            <button
              key={c.hex}
              type="button"
              title={c.name}
              aria-label={`Color ${c.name}`}
              aria-pressed={fmt.color === c.hex}
              onMouseDown={keepSelection}
              onClick={() => exec("foreColor", c.hex)}
              className="grid size-10 shrink-0 place-items-center rounded-lg transition hover:bg-ink/5"
            >
              <span
                className={`size-[18px] rounded-full ring-1 ring-black/10 transition ${fmt.color === c.hex ? "ring-2 ring-offset-2 ring-ink/70" : ""}`}
                style={{ background: c.hex }}
              />
            </button>
          ))}
          <label
            title="Color personalizado"
            className="relative grid size-10 shrink-0 place-items-center rounded-lg transition hover:bg-ink/5"
          >
            <span className="sr-only">Color personalizado</span>
            <span
              aria-hidden
              className="size-[18px] rounded-full ring-1 ring-black/10"
              style={{ background: "conic-gradient(#d93a22,#b27b16,#1f7a4d,#2457c5,#6b3fb5,#d93a22)" }}
            />
            <input
              type="color"
              value={fmt.color}
              onChange={(e) => exec("foreColor", e.target.value)}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            />
          </label>
        </ToolGroup>

        <Divider />

        <ToolGroup className="max-sm:order-1 max-sm:ml-auto">
          <ToolButton label="Quitar formato" onMouseDown={keepSelection} onClick={() => exec("removeFormat")}>
            <RemoveFormatting className="size-[18px]" />
          </ToolButton>
          <ToolButton label="Deshacer (Ctrl+Z)" onMouseDown={keepSelection} onClick={() => exec("undo")}>
            <Undo2 className="size-[18px]" />
          </ToolButton>
          <ToolButton label="Rehacer (Ctrl+Y)" onMouseDown={keepSelection} onClick={() => exec("redo")}>
            <Redo2 className="size-[18px]" />
          </ToolButton>
        </ToolGroup>
      </div>

      {/* Hoja */}
      <div className="relative bg-white">
        <div
          id="documento"
          ref={editor}
          role="textbox"
          aria-multiline="true"
          aria-label="Documento"
          contentEditable
          suppressContentEditableWarning
          spellCheck
          data-placeholder="Empieza a escribir…"
          onInput={() => {
            normalizeSizes(pendingSize.current);
            afterChange();
          }}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
              e.preventDefault();
              persist();
              setNotice("Guardado en este navegador");
            }
          }}
          onPaste={(e) => {
            // Pegado como texto limpio: evita arrastrar estilos y código ajeno.
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
          }}
          className="editor-surface min-h-[22rem] px-5 py-7 outline-none sm:min-h-[26rem] sm:px-14 sm:py-12 lg:px-20"
        />
      </div>

      {/* Barra de estado */}
      <div className="flex flex-col gap-3 border-t border-line bg-paper/60 px-3 py-3 text-xs text-mute sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1" aria-live="polite">
          <span className="tabular-nums">
            {counts.words} {counts.words === 1 ? "palabra" : "palabras"} · {counts.chars} caracteres
          </span>
          <span className="inline-flex items-center gap-1.5">
            {save.kind === "error" ? (
              <>
                <CloudOff className="size-3.5 text-accent" aria-hidden />
                Este navegador no permite guardar el borrador
              </>
            ) : save.kind === "saved" ? (
              <>
                <Check className="size-3.5 text-[#1f7a4d]" aria-hidden />
                Guardado en este navegador ·{" "}
                {save.at.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </>
            ) : (
              <>Se guarda automáticamente en este navegador</>
            )}
          </span>
          {notice && <span className="font-medium text-ink">{notice}</span>}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {confirmNew ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-soft py-1 pl-3 pr-1 text-accent-ink">
              ¿Borrar el borrador actual?
              <button type="button" onClick={newDocument} className="rounded-md bg-accent px-2.5 py-1.5 font-medium text-white hover:bg-accent-ink">
                Sí, borrar
              </button>
              <button type="button" onClick={() => setConfirmNew(false)} className="rounded-md px-2.5 py-1.5 font-medium hover:bg-white/60">
                Cancelar
              </button>
            </span>
          ) : (
            <StatusButton onClick={() => setConfirmNew(true)} icon={<FilePlus2 className="size-3.5" />}>
              Nuevo
            </StatusButton>
          )}
          <StatusButton onClick={copyAll} icon={<ClipboardCopy className="size-3.5" />}>
            Copiar
          </StatusButton>
          <StatusButton onClick={exportTxt} icon={<FileText className="size-3.5" />}>
            .txt
          </StatusButton>
          <StatusButton onClick={exportHtml} icon={<FileCode2 className="size-3.5" />} strong>
            Exportar .html
          </StatusButton>
        </div>
      </div>
    </div>
  );
}

function ToolGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex shrink-0 items-center gap-0.5 ${className}`}>{children}</div>;
}

function Divider() {
  return <span aria-hidden className="mx-1 hidden h-6 w-px shrink-0 bg-line-strong sm:block" />;
}

function ToolButton({
  label,
  pressed,
  children,
  onClick,
  onMouseDown,
}: {
  label: string;
  pressed?: boolean;
  children: ReactNode;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={`grid size-10 shrink-0 place-items-center rounded-lg transition-[background-color,color,transform] duration-200 active:scale-90 ${
        pressed ? "bg-ink text-paper" : "text-ink-2 hover:bg-ink/5"
      }`}
    >
      {children}
    </button>
  );
}

function StatusButton({
  children,
  icon,
  onClick,
  strong,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick: () => void;
  strong?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 font-medium transition-colors ${
        strong ? "bg-ink text-paper hover:bg-ink-2" : "text-ink-2 ring-1 ring-line hover:bg-white"
      }`}
    >
      <span aria-hidden>{icon}</span>
      {children}
    </button>
  );
}
