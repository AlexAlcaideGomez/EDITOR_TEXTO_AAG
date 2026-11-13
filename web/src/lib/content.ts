import { site } from "./site";

export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Editor AAG es gratis de verdad?",
    a: "Sí. No hay versión de pago, ni periodo de prueba, ni anuncios, ni cuenta que crear. Lo descargas o lo abres en el navegador y escribes.",
  },
  {
    q: "¿Qué necesito para usar la versión de escritorio?",
    a: `Solo Java ${site.download.javaMin} o superior. Como es una aplicación Java, el mismo archivo funciona en Windows, macOS y Linux. En la sección de instalación tienes los pasos para cada sistema.`,
  },
  {
    q: "¿Puedo guardar y abrir archivos?",
    a: "En la versión web, sí: el borrador se guarda solo en tu navegador y puedes exportarlo como .html (con formato) o .txt. La versión de escritorio actual se centra en escribir y dar formato y todavía no incluye abrir ni guardar archivos; para conservar el texto, cópialo a otro programa. Si esta función te importa, cuéntanoslo en el formulario de sugerencias.",
  },
  {
    q: "¿Dónde se guarda lo que escribo en la versión web?",
    a: "En el almacenamiento local de tu propio navegador (localStorage). No se envía a ningún servidor ni lo vemos nadie. Ten en cuenta que, si borras los datos del navegador o usas una ventana privada, el borrador se pierde: exporta lo que quieras conservar.",
  },
  {
    q: "¿Funciona sin conexión a Internet?",
    a: "La app de escritorio, siempre: no se conecta a Internet en ningún momento. La versión web necesita conexión para cargar la página; una vez abierta, escribir y exportar ocurre íntegramente en tu dispositivo.",
  },
  {
    q: "¿Es seguro descargar el archivo .jar?",
    a: "El archivo se compila a partir del código fuente público del proyecto, que es un único archivo Java de algo más de cien líneas sin dependencias externas. Puedes leerlo en GitHub y, si lo prefieres, compilarlo tú mismo.",
  },
  {
    q: "¿Qué pasa si pego texto copiado de una web o de otro documento?",
    a: "En la versión web se pega como texto limpio, sin estilos ni código ajeno. Así el formato lo decides tú y el documento no se llena de tipografías extrañas.",
  },
  {
    q: "¿Cómo informo de un error o propongo una mejora?",
    a: "Con el formulario de sugerencias de esta página. Al enviarlo se abre GitHub con tu mensaje ya redactado para que lo publiques como incidencia del proyecto (necesitas una cuenta gratuita de GitHub).",
  },
];

/**
 * Testimonios. Mientras `isDemo` sea true, la web los marca de forma visible
 * como ejemplos ilustrativos. Sustitúyelos solo por opiniones reales, con
 * permiso expreso de su autor, y pon `isDemo: false`.
 */
export const testimonials: { quote: string; author: string; role: string; isDemo: boolean }[] = [
  {
    quote: "Lo uso para pasar a limpio los apuntes: pongo los conceptos clave en negrita y las fechas en rojo, y en dos minutos está listo.",
    author: "Ejemplo ilustrativo",
    role: "Perfil: estudiante",
    isDemo: true,
  },
  {
    quote: "Necesitaba algo para redactar cartas sin abrir un procesador enorme. Arranca al momento y no tiene nada que me distraiga.",
    author: "Ejemplo ilustrativo",
    role: "Perfil: uso personal",
    isDemo: true,
  },
  {
    quote: "Como ejemplo de Swing para clase es perfecto: se entiende entero leyendo un solo archivo.",
    author: "Ejemplo ilustrativo",
    role: "Perfil: docente de programación",
    isDemo: true,
  },
];
