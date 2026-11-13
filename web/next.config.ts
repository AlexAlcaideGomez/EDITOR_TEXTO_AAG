import type { NextConfig } from "next";

/**
 * Exportación 100 % estática (carpeta `out/`): se puede alojar gratis en
 * GitHub Pages, Netlify, Vercel o cualquier hosting de ficheros.
 * Si se publica bajo una subruta (p. ej. GitHub Pages de proyecto), define
 * NEXT_PUBLIC_BASE_PATH="/EDITOR_TEXTO_AAG" al compilar.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // CSS incrustado en el HTML: elimina la petición que bloquea el primer renderizado.
  experimental: { inlineCss: true },
};

export default nextConfig;
