"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyButton({ text, label = "Copiar", className = "" }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("ok");
    } catch {
      setState("error");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${className}`}
      aria-label={`${label}: ${text}`}
    >
      {state === "ok" ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{state === "ok" ? "Copiado" : state === "error" ? "No se pudo copiar" : label}</span>
    </button>
  );
}
