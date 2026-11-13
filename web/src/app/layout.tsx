import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, mono, serif } from "./fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}/`),
  title: {
    default: `${site.name} — Editor de texto enriquecido ligero y gratuito`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "editor de texto",
    "editor de texto enriquecido",
    "editor de texto gratis",
    "editor de texto online",
    "editor de texto ligero",
    "procesador de textos sencillo",
    "editor Java Swing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`no-js ${inter.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Activa las animaciones de entrada solo si hay JavaScript. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js')",
          }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
