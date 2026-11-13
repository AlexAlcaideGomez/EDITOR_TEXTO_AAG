"use client";

import { AlertCircle, ArrowUpRight, Bug, CheckCircle2, Lightbulb, MessageCircleHeart } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { newIssueUrl, site } from "@/lib/site";
import { buttonClass } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const TYPES = [
  { id: "sugerencia", label: "Sugerencia", icon: Lightbulb, prefix: "[Sugerencia]", labels: "enhancement" },
  { id: "error", label: "Error", icon: Bug, prefix: "[Error]", labels: "bug" },
  { id: "opinion", label: "Opinión", icon: MessageCircleHeart, prefix: "[Opinión]", labels: "" },
] as const;
type TypeId = (typeof TYPES)[number]["id"];

const PLATFORMS = ["Versión web", "Windows", "macOS", "Linux", "Otro"] as const;

type Values = { title: string; message: string; platform: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values, type: TypeId): Errors {
  const e: Errors = {};
  const t = v.title.trim();
  const m = v.message.trim();
  if (!t) e.title = "Escribe un título breve.";
  else if (t.length < 5) e.title = "El título debe tener al menos 5 caracteres.";
  else if (t.length > 100) e.title = "El título no puede superar los 100 caracteres.";
  if (!m) e.message = "Cuéntanos un poco más.";
  else if (m.length < 20) e.message = `Añade algo más de detalle (mínimo 20 caracteres, llevas ${m.length}).`;
  else if (m.length > 3000) e.message = "El mensaje no puede superar los 3000 caracteres.";
  if (type === "error" && !v.platform) e.platform = "Indica dónde ocurre el error.";
  return e;
}

export function Feedback() {
  const uid = useId();
  const [type, setType] = useState<TypeId>("sugerencia");
  const [values, setValues] = useState<Values>({ title: "", message: "", platform: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const platformRef = useRef<HTMLSelectElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const errors = validate(values, type);
  const show = (k: keyof Values) => (touched[k] || submitted) && errors[k];

  // Los enlaces con data-tipo (p. ej. «Dejar mi opinión») preseleccionan el tipo.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[data-tipo]");
      const t = a?.getAttribute("data-tipo") as TypeId | null;
      if (t && TYPES.some((x) => x.id === t)) setType(t);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      if (errors.title) titleRef.current?.focus();
      else if (errors.platform) platformRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }
    const t = TYPES.find((x) => x.id === type)!;
    const body = [
      values.message.trim(),
      "",
      "---",
      `Tipo: ${t.label}`,
      values.platform ? `Dónde: ${values.platform}` : null,
      `Enviado desde el formulario de ${site.name}.`,
    ]
      .filter((l) => l !== null)
      .join("\n");
    const url = newIssueUrl(`${t.prefix} ${values.title.trim()}`, body, t.labels || undefined);
    const w = window.open(url, "_blank");
    if (w) w.opener = null;
    setSentUrl(url);
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setValues({ title: "", message: "", platform: "" });
    setTouched({});
    setSubmitted(false);
    setSentUrl(null);
    requestAnimationFrame(() => titleRef.current?.focus());
  }

  const field =
    "mt-2 block w-full rounded-xl bg-white px-4 text-[0.95rem] text-ink ring-1 ring-line-strong transition-[box-shadow] placeholder:text-mute-2 hover:ring-ink/30 focus:outline-none focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-accent";

  return (
    <section id="sugerencias" aria-labelledby="sugerencias-title" className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading
            id="sugerencias-title"
            index="08"
            label="Sugerencias"
            title={
              <>
                Ayúdanos a <em className="text-mute">mejorarlo.</em>
              </>
            }
            intro="¿Echas algo en falta? ¿Has encontrado un error? Escríbelo aquí: al enviarlo se abrirá GitHub con tu mensaje ya redactado, listo para publicarlo como incidencia del proyecto."
          />
          <Reveal className="mt-8 rounded-2xl bg-paper-2 p-5 text-sm leading-relaxed text-mute ring-1 ring-line">
            <p>
              <strong className="font-medium text-ink">Ten en cuenta:</strong> las incidencias de GitHub son públicas y necesitas una
              cuenta gratuita para publicarlas. No incluyas datos personales en el mensaje.
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-9">
            {sentUrl ? (
              <div ref={resultRef} tabIndex={-1} className="flex min-h-[26rem] flex-col items-start justify-center outline-none" role="status">
                <CheckCircle2 className="size-10 text-[#1f7a4d]" aria-hidden />
                <h3 className="mt-6 font-display text-4xl leading-tight">Tu mensaje está listo en GitHub.</h3>
                <p className="mt-3 max-w-md text-mute">
                  Lo hemos abierto en una pestaña nueva. Revísalo y pulsa <strong className="font-medium text-ink">«Create»</strong>{" "}
                  para publicarlo. ¡Gracias por dedicarnos tu tiempo!
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md")}>
                    ¿No se abrió? Abrir GitHub
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                  <button type="button" onClick={reset} className={buttonClass("secondary", "md")}>
                    Escribir otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-help`}>
                <fieldset>
                  <legend className="text-sm font-medium">¿Qué quieres contarnos?</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {TYPES.map((t) => (
                      <label
                        key={t.id}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl px-2 py-4 text-sm ring-1 transition-[background-color,box-shadow,color] duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent sm:flex-row sm:justify-center sm:py-3 ${
                          type === t.id ? "bg-ink text-paper ring-ink" : "bg-paper text-ink-2 ring-line hover:ring-ink/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="tipo"
                          value={t.id}
                          checked={type === t.id}
                          onChange={() => setType(t.id)}
                          className="sr-only"
                        />
                        <t.icon className="size-4" aria-hidden />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6">
                  <label htmlFor={`${uid}-title`} className="text-sm font-medium">
                    Título <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={titleRef}
                    id={`${uid}-title`}
                    name="title"
                    type="text"
                    autoComplete="off"
                    maxLength={100}
                    required
                    placeholder={
                      type === "error"
                        ? "Ej.: el tamaño 40 no se aplica al texto pegado"
                        : type === "opinion"
                          ? "Ej.: lo uso para mis apuntes"
                          : "Ej.: añadir guardar y abrir archivos"
                    }
                    value={values.title}
                    onChange={(e) => setValues({ ...values, title: e.target.value })}
                    onBlur={() => setTouched({ ...touched, title: true })}
                    aria-invalid={!!show("title")}
                    aria-describedby={show("title") ? `${uid}-title-err` : undefined}
                    className={`${field} h-12`}
                  />
                  {show("title") && <FieldError id={`${uid}-title-err`}>{errors.title}</FieldError>}
                </div>

                <div className="mt-5">
                  <label htmlFor={`${uid}-platform`} className="text-sm font-medium">
                    ¿Dónde lo usas? {type === "error" ? <span className="text-accent">*</span> : <span className="font-normal text-mute">(opcional)</span>}
                  </label>
                  <select
                    ref={platformRef}
                    id={`${uid}-platform`}
                    name="platform"
                    value={values.platform}
                    onChange={(e) => setValues({ ...values, platform: e.target.value })}
                    onBlur={() => setTouched({ ...touched, platform: true })}
                    aria-invalid={!!show("platform")}
                    aria-describedby={show("platform") ? `${uid}-platform-err` : undefined}
                    className={`${field} h-12`}
                  >
                    <option value="">Selecciona una opción</option>
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {show("platform") && <FieldError id={`${uid}-platform-err`}>{errors.platform}</FieldError>}
                </div>

                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor={`${uid}-message`} className="text-sm font-medium">
                      Mensaje <span className="text-accent">*</span>
                    </label>
                    <span className="font-mono text-xs tabular-nums text-mute" aria-hidden>
                      {values.message.trim().length}/3000
                    </span>
                  </div>
                  <textarea
                    ref={messageRef}
                    id={`${uid}-message`}
                    name="message"
                    rows={6}
                    maxLength={3000}
                    required
                    placeholder={
                      type === "error"
                        ? "¿Qué hiciste, qué esperabas que pasara y qué pasó?"
                        : "Cuéntanoslo con el detalle que quieras."
                    }
                    value={values.message}
                    onChange={(e) => setValues({ ...values, message: e.target.value })}
                    onBlur={() => setTouched({ ...touched, message: true })}
                    aria-invalid={!!show("message")}
                    aria-describedby={show("message") ? `${uid}-message-err` : undefined}
                    className={`${field} resize-y py-3 leading-relaxed`}
                  />
                  {show("message") && <FieldError id={`${uid}-message-err`}>{errors.message}</FieldError>}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p id={`${uid}-help`} className="text-xs text-mute">
                    Se abrirá <span className="font-medium text-ink">github.com</span> en una pestaña nueva.
                  </p>
                  <button type="submit" className={buttonClass("primary", "lg")}>
                    Preparar mensaje en GitHub
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-accent-ink">
      <AlertCircle className="size-4 shrink-0" aria-hidden />
      {children}
    </p>
  );
}
