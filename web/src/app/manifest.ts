import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    lang: "es",
    start_url: `${base}/`,
    display: "standalone",
    background_color: "#f6f4ef",
    theme_color: "#141413",
    icons: [{ src: `${base}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
