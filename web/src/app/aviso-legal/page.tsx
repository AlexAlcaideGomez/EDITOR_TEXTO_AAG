import type { Metadata } from "next";
import { LegalPage, OwnerField } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal e información del titular de ${site.name}.`,
  alternates: { canonical: "/aviso-legal/" },
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal" updated="13 de noviembre de 2026">
      <section>
        <h2>1. Datos del titular</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), se informa de los datos del titular de este sitio web:
        </p>
        <ul>
          <li>
            Titular: <OwnerField value={site.owner.name} />
          </li>
          <li>
            NIF: <OwnerField value={site.owner.taxId} />
          </li>
          <li>
            Domicilio: <OwnerField value={site.owner.address} />
          </li>
          <li>
            Correo electrónico: <OwnerField value={site.owner.email} />
          </li>
        </ul>
      </section>
      <section>
        <h2>2. Objeto</h2>
        <p>
          Este sitio web presenta {site.name}, un editor de texto enriquecido gratuito, ofrece una versión web de demostración que
          funciona íntegramente en el navegador del usuario y permite descargar la aplicación de escritorio.
        </p>
      </section>
      <section>
        <h2>3. Condiciones de uso</h2>
        <p>
          El acceso a este sitio es libre y gratuito. El usuario se compromete a hacer un uso adecuado de sus contenidos y a no
          emplearlos para actividades ilícitas o contrarias a la buena fe.
        </p>
        <p>
          El software se ofrece tal cual, sin garantías de ningún tipo. El titular no se responsabiliza de la pérdida de textos
          escritos en la versión web, que se guardan únicamente en el navegador del usuario; se recomienda exportar los documentos que
          se deseen conservar.
        </p>
      </section>
      <section>
        <h2>4. Propiedad intelectual</h2>
        <p>
          Los textos, el diseño y el código de este sitio y de la aplicación pertenecen a su titular. El código fuente de la aplicación
          es de consulta pública en{" "}
          <a href={site.repo} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          ; su reutilización se rige por las condiciones que el titular indique en dicho repositorio. Las tipografías de esta web se
          distribuyen bajo la licencia SIL Open Font License.
        </p>
      </section>
      <section>
        <h2>5. Enlaces externos</h2>
        <p>
          Este sitio contiene enlaces a GitHub y a adoptium.net. El titular no controla esos sitios ni se responsabiliza de sus
          contenidos o políticas.
        </p>
      </section>
      <section>
        <h2>6. Legislación aplicable</h2>
        <p>Este aviso legal se rige por la legislación española.</p>
      </section>
    </LegalPage>
  );
}
