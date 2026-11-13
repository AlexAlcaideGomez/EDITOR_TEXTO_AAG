import { statSync } from "node:fs";
import { join } from "node:path";
import { site } from "./site";

/** Tamaño real del .jar descargable, leído en tiempo de compilación. */
export function getJarSize(): string {
  try {
    const bytes = statSync(join(process.cwd(), "public", site.download.path)).size;
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
  } catch {
    throw new Error(`No se encuentra public${site.download.path}. Ejecuta «npm run build:jar» antes de compilar la web.`);
  }
}
