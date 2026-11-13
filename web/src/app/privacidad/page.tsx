import type { Metadata } from "next";
import { LegalPage, OwnerField } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo trata ${site.name} tus datos: sin cuentas, sin seguimiento y con tu texto guardado solo en tu navegador.`,
  alternates: { canonical: "/privacidad/" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" updated="13 de noviembre de 2026">
      <section>
        <h2>En resumen</h2>
        <p>
          {site.name} no te pide cuenta, no usa herramientas de analítica ni de seguimiento y no recibe el texto que escribes. Lo que
          escribes en la versión web se queda en tu navegador.
        </p>
      </section>
      <section>
        <h2>1. Responsable</h2>
        <p>
          <OwnerField value={site.owner.name} /> (datos completos en el{" "}
          <a href="../aviso-legal/">aviso legal</a>).
        </p>
      </section>
      <section>
        <h2>2. Texto escrito en la versión web</h2>
        <p>
          El borrador se guarda automáticamente en el almacenamiento local (localStorage) de tu navegador, en tu dispositivo, para que
          no lo pierdas al recargar la página. No se transmite a ningún servidor. Puedes borrarlo en cualquier momento con el botón
          «Nuevo» del editor o eliminando los datos del sitio desde la configuración de tu navegador.
        </p>
      </section>
      <section>
        <h2>3. Formulario de sugerencias</h2>
        <p>
          El formulario no envía datos a este sitio: solo prepara un mensaje y abre GitHub para que tú decidas si lo publicas como
          incidencia del proyecto. Si lo publicas, GitHub, Inc. trata esos datos conforme a su{" "}
          <a href="https://docs.github.com/es/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
            declaración de privacidad
          </a>
          , y el mensaje será público.
        </p>
      </section>
      <section>
        <h2>4. Alojamiento</h2>
        <p>
          Como cualquier sitio web, el proveedor de alojamiento puede registrar datos técnicos de la conexión (como la dirección IP)
          para servir las páginas y por seguridad. Consulta la política del proveedor que aloje esta web.
        </p>
      </section>
      <section>
        <h2>5. Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a{" "}
          <OwnerField value={site.owner.email} />. También puedes reclamar ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            aepd.es
          </a>
          ).
        </p>
      </section>
    </LegalPage>
  );
}
