"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const fb = process.env.NEXT_PUBLIC_FACEBOOK_URL || "";

  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    const formEl = e.currentTarget;
    const payload = {
      name: (formEl.elements.namedItem("cName") as HTMLInputElement).value,
      phone: (formEl.elements.namedItem("cPhone") as HTMLInputElement).value,
      message: (formEl.elements.namedItem("cMessage") as HTMLTextAreaElement).value
    };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Lee como texto primero para evitar el error de JSON cuando llega HTML
      const raw = await res.text();

      // Intentar parsear JSON solo si parece JSON
      let data: any = null;
      try {
        data = JSON.parse(raw);
      } catch {
        // No es JSON (probablemente HTML)
        throw new Error(
          `El servidor no respondió en formato esperado. (HTTP ${res.status}). ` +
            `Revisa que exista app/api/contacto/route.ts y que soporte POST.`
        );
      }

      if (!res.ok || !data.ok) throw new Error(data.message || "No se pudo enviar el mensaje.");

      formEl.reset();
      setFeedback({ type: "ok", text: data.message });
    } catch (err: any) {
      setFeedback({ type: "err", text: err?.message || "No pudimos enviar tu mensaje ahora." });
    }
  }

  return (
    <section className="bg-white/80 border border-[var(--border)] rounded-3xl shadow-sm p-6 md:p-8">
      <h1 className="text-3xl font-bold">Contacto</h1>
      <p className="text-[var(--muted)] mt-2">
        Puedes dejar un mensaje aquí. También puedes visitar Facebook (si está configurado).
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {fb ? (
          <a
            href={fb}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl text-white font-bold min-h-[52px] inline-flex items-center justify-center"
            style={{ background: "var(--fb)" }}
          >
            Ir a Facebook
          </a>
        ) : (
          <div className="px-5 py-3 rounded-2xl border border-[var(--border)] bg-white/80 font-bold text-[var(--muted)]">
            Facebook no configurado
          </div>
        )}
      </div>

      <div className="mt-6 border border-[var(--border)] rounded-3xl p-5 bg-white/75">
        <div className="font-bold text-lg">Horarios</div>
        <div className="text-[var(--muted)] mt-1">
          Lunes a viernes: 8:00 a.m. – 5:00 p.m.<br />
          Sábados: 9:00 a.m. – 12:00 m.
        </div>
      </div>

      <form className="mt-6 border border-[var(--border)] rounded-3xl p-5 bg-white/75" onSubmit={submitContact} noValidate>
        <div className="font-bold text-lg">Deja un mensaje</div>

        <label className="font-bold block mb-1 mt-4" htmlFor="cName">Nombre *</label>
        <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
          id="cName" name="cName" required />

        <label className="font-bold block mb-1 mt-3" htmlFor="cPhone">Teléfono (WhatsApp) *</label>
        <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
          id="cPhone" name="cPhone" required placeholder="Ej: 3001234567" />

        <label className="font-bold block mb-1 mt-3" htmlFor="cMessage">Mensaje *</label>
        <textarea className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white min-h-[140px]"
          id="cMessage" name="cMessage" required placeholder="Cuéntanos en qué te podemos ayudar." />

        {feedback && (
          <div
            className={`mt-4 rounded-2xl p-4 border-l-8 ${feedback.type === "ok" ? "bg-emerald-50" : "bg-red-50"}`}
            style={{ borderColor: feedback.type === "ok" ? "var(--success)" : "#b91c1c" }}
            aria-live="polite"
          >
            <div className="font-bold">{feedback.type === "ok" ? "Recibido" : "Revisa esto"}</div>
            <div className="mt-1">{feedback.text}</div>
          </div>
        )}

        <div className="mt-5">
          <button type="submit" className="px-5 py-3 rounded-2xl text-white font-bold min-h-[52px]" style={{ background: "var(--primary)" }}>
            Enviar mensaje
          </button>
        </div>

        <div className="text-sm text-[var(--muted)] mt-3">
          Protección de datos (Ley 1581 de 2012). Usamos tu información solo para responderte.
        </div>
      </form>
    </section>
  );
}