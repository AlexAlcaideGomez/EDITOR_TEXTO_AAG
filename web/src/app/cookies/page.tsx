import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: `${site.name} no utiliza cookies. Te explicamos qué almacenamiento local usa el editor web y por qué.`,
  alternates: { canonical: "/cookies/" },
};

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies" updated="13 de noviembre de 2026">
      <section>
        <h2>Esta web no usa cookies</h2>
        <p>
          No instalamos cookies propias ni de terceros: ni de analítica, ni de publicidad, ni de redes sociales. Por eso no verás
          ningún banner de consentimiento.
        </p>
      </section>
      <section>
        <h2>Almacenamiento local del editor</h2>
        <p>
          La versión web del editor usa el almacenamiento local de tu navegador (localStorage) con una única clave,{" "}
          <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">editor-aag:borrador:v1</code>, para guardar tu
          borrador. Solo se crea si escribes en el editor, es estrictamente necesario para la función que tú usas, nunca sale de tu
          dispositivo y no sirve para identificarte ni seguirte.
        </p>
        <p>Puedes eliminarlo con el botón «Nuevo» del editor o desde la configuración de privacidad de tu navegador.</p>
      </section>
      <section>
        <h2>Cambios</h2>
        <p>
          Si en el futuro se incorporara alguna cookie no esencial, se actualizaría esta política y se pediría tu consentimiento antes
          de instalarla.
        </p>
      </section>
    </LegalPage>
  );
}
