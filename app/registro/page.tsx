"use client";

import { useState } from "react";

type ApiResult = { ok: boolean; message: string; caseId?: string };

const problemTypes = [
  "Facturación excesiva",
  "Corte de servicio",
  "Reconexión no realizada",
  "Basuras",
  "Alumbrado público",
  "Servicio irregular",
  "Medidor dañado",
  "Otro"
];

export default function RegistroPage() {
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [filesLabel, setFilesLabel] = useState<string[]>([]);

  async function submitCase(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    try {
      const res = await fetch("/api/casos", { method: "POST", body: fd });
      const data: ApiResult = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message);

      formEl.reset();
      setFilesLabel([]);
      setFeedback({ type: "ok", text: data.message + (data.caseId ? ` Código: ${data.caseId}` : "") });
    } catch (err: any) {
      setFeedback({ type: "err", text: err?.message || "No pudimos enviar tu caso. Intenta de nuevo." });
    }
  }

  return (
    <section className="bg-white/80 border border-[var(--border)] rounded-3xl shadow-sm p-6 md:p-8">
      <h1 className="text-3xl font-bold">Registrar caso</h1>
      <p className="text-[var(--muted)] mt-2">Diligencia lo básico. Si no sabes algo, escribe una referencia aproximada.</p>

      <form className="mt-5" onSubmit={submitCase} noValidate>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold block mb-1" htmlFor="fullName">Nombre completo *</label>
            <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="fullName" name="fullName" required autoComplete="name" />
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="phone">Teléfono (WhatsApp) *</label>
            <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="phone" name="phone" required inputMode="tel" placeholder="Ej: 3001234567" />
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="email">Correo (opcional)</label>
            <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="email" name="email" type="email" placeholder="Ej: nombre@correo.com" />
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="address">Dirección del caso *</label>
            <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="address" name="address" required placeholder="Ej: Calle 10 # 20-30" />
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="neighborhood">Barrio *</label>
            <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="neighborhood" name="neighborhood" required />
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="locality">Localidad *</label>
            <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="locality" name="locality" required placeholder="Ej: Kennedy, Suba, Bosa..." />
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="problemType">Tipo de problema *</label>
            <select className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="problemType" name="problemType" required defaultValue="">
              <option value="" disabled>Selecciona una opción</option>
              {problemTypes.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="reference">N° cuenta/contrato (opcional)</label>
            <input className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white"
              id="reference" name="reference" placeholder="Si lo tienes a la mano" />
          </div>
        </div>

        <div className="mt-4">
          <label className="font-bold block mb-1" htmlFor="description">Descripción *</label>
          <textarea className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] bg-white min-h-[140px]"
            id="description" name="description" required placeholder="¿Qué pasó?, ¿desde cuándo?, ¿qué necesitas que se solucione?" />
        </div>

        <div className="mt-4">
          <label className="font-bold block mb-1" htmlFor="evidence">Evidencias (todas las que necesites)</label>
          <div className="border-2 border-dashed rounded-2xl p-4 bg-white/70" style={{ borderColor: "var(--border)" }}>
            <input
              id="evidence"
              name="evidence"
              type="file"
              multiple
              accept="image/*,application/pdf,video/*"
              onChange={(ev) => {
                const fs = Array.from(ev.target.files || []);
                setFilesLabel(fs.map((f) => `${f.name} (${Math.ceil(f.size / 1024)} KB)`));
              }}
            />
            {filesLabel.length > 0 && (
              <ul className="mt-2 list-disc pl-5" aria-live="polite">
                {filesLabel.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </div>
        </div>

        {feedback && (
          <div className={`mt-4 rounded-2xl p-4 border-l-8 ${feedback.type === "ok" ? "bg-emerald-50" : "bg-red-50"}`}
               style={{ borderColor: feedback.type === "ok" ? "var(--success)" : "#b91c1c" }}
               aria-live="polite">
            <div className="font-bold">{feedback.type === "ok" ? "Recibido" : "Revisa esto"}</div>
            <div className="mt-1">{feedback.text}</div>
          </div>
        )}

        <div className="mt-5">
          <button type="submit" className="px-5 py-3 rounded-2xl text-white font-bold min-h-[52px]" style={{ background: "var(--primary)" }}>
            Enviar mi caso
          </button>
        </div>

        <p className="text-sm text-[var(--muted)] mt-3">
          Tratamiento de datos solo para gestionar tu solicitud (Ley 1581 de 2012).
        </p>
      </form>
    </section>
  );
}