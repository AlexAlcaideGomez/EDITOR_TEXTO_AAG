import { Comparison } from "@/components/Comparison";
import { EditorSection } from "@/components/EditorSection";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Feedback } from "@/components/Feedback";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Install } from "@/components/Install";
import { Testimonials } from "@/components/Testimonials";
import { Value } from "@/components/Value";
import { faqs } from "@/lib/content";
import { getJarSize } from "@/lib/jar";
import { site } from "@/lib/site";

export default function Home() {
  const jarSize = getJarSize();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: site.name,
        description: site.description,
        url: `${site.url}/`,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Editor de texto",
        operatingSystem: "Windows, macOS, Linux",
        softwareRequirements: `Java ${site.download.javaMin} o superior`,
        fileSize: jarSize,
        downloadUrl: `${site.url}${site.download.path}`,
        inLanguage: "es",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        codeRepository: site.repo,
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: `${site.url}/`,
        inLanguage: "es-ES",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="contenido">
        <Hero jarSize={jarSize} />
        <Value jarSize={jarSize} />
        <Features />
        <EditorSection />
        <Comparison jarSize={jarSize} />
        <Install jarSize={jarSize} />
        <Testimonials />
        <Faq />
        <Feedback />
        <FinalCta jarSize={jarSize} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
