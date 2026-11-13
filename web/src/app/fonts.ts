import localFont from "next/font/local";

/*
 * Tipografías autoalojadas (sin peticiones a terceros) con next/font:
 * precarga automática y fuentes de respaldo con métricas ajustadas para
 * evitar saltos de maquetación (CLS). Solo subconjunto latino: cubre
 * todo el español (á, é, í, ó, ú, ü, ñ, ¿, ¡).
 */
export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const serif = localFont({
  src: [
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  variable: "--font-serif",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const mono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  preload: false,
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
