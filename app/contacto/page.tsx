"use client";

import { useState } from "react";

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57v1.88h2.79l-.45 2.91h-2.34V22C18.34 21.25 22 17.08 22 12.06z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.63c-.28-.14-1.64-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.09-.16.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.43-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43 0 1.42 1.02 2.8 1.16 2.99.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.64-.67 1.88-1.31.23-.64.23-1.19.16-1.31-.07-.12-.26-.19-.54-.33z"
      />
      <path
        fill="currentColor"
        d="M26.68 5.32A13.4 13.4 0 0 0 16.01 1C8.83 1 3 6.83 3 14c0 2.28.6 4.5 1.74 6.46L3 31l10.8-1.7A12.92 12.92 0 0 0 16 27c7.18 0 13.01-5.83 13.01-13a13 13 0 0 0-2.33-8.68zM16 25.1c-1.93 0-3.83-.52-5.49-1.52l-.39-.23-6.41 1.01 1.03-6.25-.25-.4A10.93 10.93 0 0 1 5.1 14C5.1 7.98 9.98 3.1 16 3.1c2.92 0 5.66 1.14 7.72 3.2A10.84 10.84 0 0 1 26.9 14c0 6.02-4.88 11.1-10.9 11.1z"
      />
    </svg>
  );
}

function buildWhatsAppLink(phoneDigits: string, text?: string) {
  const digits = (phoneDigits || "").replace(/\D/g, "");
  const t = text ? encodeURIComponent(text) : "";
  return `https://wa.me/${digits}${t ? `?text=${t}` : ""}`;
}

export default function ContactoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573114244234";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/";

  const whatsappHref = buildWhatsAppLink(
    whatsappNumber,
    "Hola, quiero hacer una consulta sobre un caso."
  );

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/contacto", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setMsg({
          type: "err",
          text: data?.message || "No pudimos enviar tu mensaje. Intenta de nuevo."
        });
        return;
      }

      setMsg({
        type: "ok",
        text: "Listo. Recibimos tu mensaje. Te responderé por WhatsApp o por llamada lo antes posible."
      });
      form.reset();
    } catch {
      setMsg({ type: "err", text: "No pudimos enviar tu mensaje. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 sm:p-10">
        <h1 className="text-2xl font-semibold text-slate-900">Contacto</h1>
        <p className="mt-3 text-sm text-slate-700 sm:text-base">
          Si necesitas ayuda, puedes escribirme. Te responderé por WhatsApp o por llamada.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            <FacebookIcon className="h-5 w-5" />
            Facebook
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-base font-semibold text-slate-900">Deja un mensaje</h2>

            {msg ? (
              <div
                className={`mt-4 rounded-xl border p-3 text-sm ${
                  msg.type === "ok"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-rose-200 bg-rose-50 text-rose-900"
                }`}
              >
                {msg.text}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-4 grid gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900">Nombre *</label>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="Escribe tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Teléfono *</label>
                <input
                  name="phone"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="Ej: 3001234567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Mensaje *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="Cuéntame en qué te puedo ayudar"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar mensaje"}
              </button>

              <p className="text-xs text-slate-600">
                Protección de datos (Ley 1581 de 2012). Usamos tu información solo para responderte.
              </p>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">Atención</h2>
            <p className="mt-2 text-sm text-slate-700">
              Si el caso es urgente, lo más rápido es escribir por WhatsApp. Si prefieres, también puedo llamarte.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Recomendación</p>
              <p className="mt-2 text-sm text-slate-700">
                Ten a la mano: dirección, barrio/localidad, número de contrato o factura (si aplica), y evidencias.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}