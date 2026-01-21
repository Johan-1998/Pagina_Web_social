"use client";

import { useRef, useState } from "react";

const problemOptions = [
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
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string; code?: string } | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setFileNames(files.map((f) => f.name));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/casos", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setMsg({
          type: "err",
          text: data?.message || "No pudimos enviar tu caso. Intenta de nuevo."
        });
        return;
      }

      setMsg({
        type: "ok",
        text:
          "Listo. Recibimos tu caso. En las próximas horas hábiles revisaremos la información y te contactaremos por WhatsApp o por llamada.",
        code: data?.caseId
      });

      form.reset();
      setFileNames([]);
    } catch {
      setMsg({
        type: "err",
        text: "No pudimos enviar tu caso. Intenta de nuevo o escríbenos por WhatsApp."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 sm:p-10">
        <h1 className="text-2xl font-semibold text-slate-900">Registrar caso</h1>
        <p className="mt-3 text-sm text-slate-700 sm:text-base">
          Llena este formulario con calma. Si no sabes algún dato, escribe lo que tengas. Te contactaremos por WhatsApp o por llamada.
        </p>

        {msg ? (
          <div
            className={`mt-6 rounded-2xl border p-4 text-sm ${
              msg.type === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            <p>{msg.text}</p>
            {msg.type === "ok" && msg.code ? (
              <p className="mt-2 font-semibold">Código del caso: {msg.code}</p>
            ) : null}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-900">Nombre completo *</label>
              <input
                name="fullName"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Ej: Juan Pérez"
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
              <p className="mt-1 text-xs text-slate-600">Te contactaremos por WhatsApp o por llamada.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900">Correo (opcional)</label>
              <input
                name="email"
                type="email"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Ej: correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900">Dirección del caso *</label>
              <input
                name="address"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Ej: Cra 10 # 20-30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900">Barrio *</label>
              <input
                name="neighborhood"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Ej: Kennedy Central"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900">Localidad *</label>
              <input
                name="locality"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Ej: Kennedy"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-900">Tipo de problema *</label>
              <select
                name="problemType"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {problemOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-900">
                Número de contrato / factura (opcional)
              </label>
              <input
                name="reference"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Si lo tienes, escríbelo aquí"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-900">Descripción del problema *</label>
              <textarea
                name="description"
                required
                rows={6}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Detalles del caso."
              />
              <p className="mt-1 text-xs text-slate-600">
                Ejemplo: “Me llegó una factura muy alta este mes y no entiendo el consumo.”
              </p>
            </div>

            {/* ✅ Input de evidencias: UI segura en móvil */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-900">Subir evidencias (opcional)</label>

              <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3">
                <input
                  ref={fileRef}
                  type="file"
                  name="evidence"
                  multiple
                  className="hidden"
                  onChange={onFilesChange}
                  accept="image/*,application/pdf,video/*"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                  >
                    Elegir archivos
                  </button>

                  <div className="min-w-0 flex-1">
                    {fileNames.length === 0 ? (
                      <p className="text-sm text-slate-600">No has seleccionado archivos.</p>
                    ) : (
                      <div className="text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">
                          {fileNames.length} archivo(s) seleccionado(s)
                        </p>
                        <ul className="mt-1 max-h-28 overflow-auto rounded-lg border border-slate-100 bg-slate-50 p-2">
                          {fileNames.map((n) => (
                            <li key={n} className="break-words">
                              • {n}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-600">
                  Puedes subir fotos, PDF o video. Si son varios, selecciónalos todos.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-4 py-4 text-base font-semibold text-white hover:bg-slate-800 disabled:opacity-60 sm:w-auto sm:px-6"
          >
            {loading ? "Enviando..." : "Enviar mi caso"}
          </button>

          <p className="text-xs text-slate-600">
            Protección de datos (Ley 1581 de 2012). Usamos tu información solo para gestionar tu caso.
          </p>
        </form>
      </section>
    </main>
  );
}