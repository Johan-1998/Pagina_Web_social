"use client";

import { useMemo, useState } from "react";

type AnyApi = any;

function Banner({
  type,
  children,
}: {
  type: "success" | "error";
  children: React.ReactNode;
}) {
  const cls =
    type === "success"
      ? "rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"
      : "rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900";

  return <div className={cls}>{children}</div>;
}

function pickCaseId(data: AnyApi): string {
  // ✅ intenta varias llaves por si tu API no usa "shortCode"
  const candidates = [
    data?.shortCode,
    data?.caseId,
    data?.radicado,
    data?.id,
    data?.data?.shortCode,
    data?.data?.caseId,
    data?.data?.id,
  ];

  const found = candidates.find((v) => typeof v === "string" && v.trim().length > 0);
  return found || "";
}

export default function RegistroPage() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>("");
  const [successId, setSuccessId] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const successBanner = useMemo(() => {
    if (!successId) return null;
    return (
      <Banner type="success">
        <div className="text-sm">
          <div className="font-semibold">Listo. Recibimos tu caso.</div>
          <div className="mt-1">
            Tu número de radicado es:{" "}
            <span className="font-extrabold underline">{successId}</span>
          </div>
          <div className="mt-1 font-bold">
            IMPORTANTE: guarda este número para hacer seguimiento.
          </div>
          <div className="mt-1">Te contactaremos por WhatsApp o por llamada.</div>
        </div>
      </Banner>
    );
  }, [successId]);

  const errorBanner = useMemo(() => {
    if (!error) return null;
    return (
      <Banner type="error">
        <div className="text-sm font-semibold">{error}</div>
      </Banner>
    );
  }, [error]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccessId("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    // ✅ archivos NO obligatorios
    for (const f of files) fd.append("files", f);

    setSending(true);
    try {
      const res = await fetch("/api/casos", { method: "POST", body: fd });

      let data: AnyApi = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data || data.ok === false) {
        const msg =
          data?.message ||
          "No se pudo enviar el caso. Revisa tu conexión e inténtalo de nuevo.";
        setError(String(msg));
        return;
      }

      // ✅ aquí recuperamos el ID SIN importar el nombre de la llave
      const caseId = pickCaseId(data);
      if (!caseId) {
        // si el backend respondió ok pero no mandó ID, mostramos mensaje igual
        setError("Tu caso se envió, pero no recibimos el número de radicado. Intenta de nuevo o contáctanos.");
        return;
      }

      setSuccessId(caseId);

      // limpia formulario DESPUÉS de setear ID
      form.reset();
      setFiles([]);
    } catch {
      setError("No se pudo enviar el caso. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h1 className="text-2xl font-bold">Registrar caso</h1>
        <p className="mt-2 text-sm text-slate-700">
          Llena este formulario con calma. Si no sabes algún dato, escribe lo que tengas.
          Te contactaremos por WhatsApp o por llamada.
        </p>

        {/* ✅ arriba */}
        <div className="mt-5 space-y-3">
          {successBanner}
          {errorBanner}
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Nombre completo *</label>
              <input
                name="fullName"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Ej: Ana Pérez"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Teléfono *</label>
              <input
                name="phone"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Ej: 311 000 0000"
              />
              <p className="mt-1 text-xs text-slate-600">
                Te contactaremos por WhatsApp o por llamada.
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold">Correo (opcional)</label>
              <input
                name="email"
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Ej: correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Dirección del caso *</label>
              <input
                name="address"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Ej: Calle 10 # 20-30"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Barrio *</label>
              <input
                name="neighborhood"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Ej: La Marichuela"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Localidad *</label>
              <input
                name="locality"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Ej: Usme"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Tipo de problema *</label>
              <select
                name="problemType"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base outline-none focus:border-slate-400"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option>Facturación excesiva</option>
                <option>Corte de servicio</option>
                <option>Reconexión no realizada</option>
                <option>Basuras</option>
                <option>Alumbrado público</option>
                <option>Servicio irregular</option>
                <option>Medidor dañado</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Referencia (opcional)</label>
              <input
                name="reference"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Ej: número de cuenta, código de usuario, etc."
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Descripción del problema *</label>
              <textarea
                name="description"
                required
                rows={6}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base outline-none focus:border-slate-400"
                placeholder="Describe qué pasó, desde cuándo, y qué necesitas que se revise."
              />
              <p className="mt-1 text-xs text-slate-600">
                No hay mínimo de caracteres.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Subir evidencias (opcional)</label>
              <p className="mt-1 text-xs text-slate-600">
                Puedes adjuntar fotos, PDF o video. Si no tienes evidencias ahora, igual puedes enviar el caso.
              </p>

              <input
                type="file"
                multiple
                accept="image/*,application/pdf,video/*"
                className="mt-2 block w-full text-sm"
                onChange={(ev) => setFiles(ev.target.files ? Array.from(ev.target.files) : [])}
              />

              {files.length > 0 ? (
                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                  <div className="font-semibold">Archivos seleccionados:</div>
                  <ul className="mt-1 list-disc pl-5">
                    {files.map((f) => (
                      <li key={f.name}>{f.name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          {/* ✅ abajo, justo encima del botón */}
          <div className="space-y-3">
            {successBanner}
            {errorBanner}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-base font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {sending ? "Enviando..." : "Enviar mi caso"}
          </button>
        </form>
      </div>
    </div>
  );
}