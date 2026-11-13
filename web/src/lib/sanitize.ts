/**
 * Saneador mínimo por lista blanca para el contenido del editor web.
 * Solo conserva las etiquetas y estilos que el propio editor produce
 * (párrafos, negrita, cursiva, subrayado, tipografía, tamaño y color).
 * Se ejecuta en el navegador (usa DOMParser).
 */

const ALLOWED_TAGS = new Set(["P", "DIV", "BR", "SPAN", "B", "STRONG", "I", "EM", "U", "FONT"]);
const DROP_WITH_CONTENT = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "TEMPLATE", "NOSCRIPT", "SVG", "MATH", "LINK", "META"]);
const ALLOWED_STYLES = ["font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-decoration-line"];

function cleanStyle(el: HTMLElement) {
  const kept: string[] = [];
  for (const prop of ALLOWED_STYLES) {
    const value = el.style.getPropertyValue(prop);
    if (value && !/url\(|expression|javascript:/i.test(value)) kept.push(`${prop}: ${value}`);
  }
  return kept.join("; ");
}

function walk(node: Node, doc: Document): Node[] {
  if (node.nodeType === Node.TEXT_NODE) return [doc.createTextNode(node.textContent ?? "")];
  if (node.nodeType !== Node.ELEMENT_NODE) return [];

  const el = node as HTMLElement;
  const tag = el.tagName.toUpperCase();
  if (DROP_WITH_CONTENT.has(tag)) return [];

  const children = Array.from(el.childNodes).flatMap((c) => walk(c, doc));
  if (!ALLOWED_TAGS.has(tag)) return children; // se desenvuelve: conserva el texto

  const out = doc.createElement(tag === "FONT" ? "span" : tag.toLowerCase());
  let style = cleanStyle(el);
  if (tag === "FONT") {
    const face = el.getAttribute("face");
    const color = el.getAttribute("color");
    if (face && /^[\w\s,'"-]+$/.test(face)) style += `${style ? "; " : ""}font-family: ${face}`;
    if (color && /^#?[\w]+$/.test(color)) style += `${style ? "; " : ""}color: ${color}`;
  }
  if (style) out.setAttribute("style", style);
  children.forEach((c) => out.appendChild(c));
  return [out];
}

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return "";
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const container = doc.createElement("div");
  Array.from(doc.body.childNodes)
    .flatMap((n) => walk(n, doc))
    .forEach((n) => container.appendChild(n));
  return container.innerHTML;
}
