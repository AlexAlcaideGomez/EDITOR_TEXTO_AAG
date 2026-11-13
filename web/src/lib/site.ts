/**
 * Configuración central del sitio. Todo lo que cambia entre entornos o que el
 * titular debe completar vive aquí, para no tener datos repartidos por los
 * componentes.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const site = {
  name: "Editor AAG",
  shortName: "AAG",
  tagline: "Escribe con estilo. Sin ruido.",
  description:
    "Editor AAG es un editor de texto enriquecido, ligero y gratuito: negrita, cursiva, subrayado, cuatro tipografías, siete tamaños y color. Pruébalo en el navegador o descárgalo para Windows, macOS y Linux.",
  /** URL pública definitiva. Configúrala con NEXT_PUBLIC_SITE_URL al compilar. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://alexalcaidegomez.github.io/EDITOR_TEXTO_AAG").replace(/\/$/, ""),
  locale: "es_ES",
  repo: "https://github.com/AlexAlcaideGomez/EDITOR_TEXTO_AAG",
  sourceFile:
    "https://github.com/AlexAlcaideGomez/EDITOR_TEXTO_AAG/blob/main/src/Tema6/EDITOR_TEXTO_AAG/Interfaz.java",
  download: {
    file: "editor-aag.jar",
    path: "/descargas/editor-aag.jar",
    javaMin: 11,
  },
  /**
   * Datos del titular exigidos por la LSSI-CE (art. 10) para el aviso legal.
   * Déjalos vacíos hasta tenerlos: las páginas legales mostrarán
   * «Pendiente de completar» en lugar de inventar nada.
   */
  owner: {
    name: process.env.NEXT_PUBLIC_OWNER_NAME || "",
    taxId: process.env.NEXT_PUBLIC_OWNER_TAX_ID || "",
    address: process.env.NEXT_PUBLIC_OWNER_ADDRESS || "",
    email: process.env.NEXT_PUBLIC_OWNER_EMAIL || "",
  },
} as const;

/** Prefija rutas de ficheros estáticos (public/) con el basePath. */
export function asset(path: string) {
  return `${basePath}${path}`;
}

/** Abre una incidencia en GitHub con título y cuerpo ya rellenados. */
export function newIssueUrl(title: string, body: string, labels?: string) {
  const params = new URLSearchParams({ title, body });
  if (labels) params.set("labels", labels);
  return `${site.repo}/issues/new?${params.toString()}`;
}

export const nav = [
  { href: "#funciones", label: "Funciones" },
  { href: "#editor", label: "Pruébalo" },
  { href: "#comparativa", label: "Por qué AAG" },
  { href: "#instalacion", label: "Instalación" },
  { href: "#faq", label: "Preguntas" },
] as const;

export const fonts = [
  { label: "Arial", css: "Arial, 'Helvetica Neue', Helvetica, sans-serif" },
  { label: "Calibri", css: "Calibri, Carlito, 'Segoe UI', sans-serif" },
  { label: "Times New Roman", css: "'Times New Roman', Times, 'Liberation Serif', serif" },
  { label: "Verdana", css: "Verdana, Geneva, 'DejaVu Sans', sans-serif" },
] as const;

/** Los mismos tamaños que ofrece la app de escritorio. */
export const sizes = [10, 11, 12, 15, 16, 20, 40] as const;
