import Link from "next/link";

export default function HomePage() {
  return (
    <section className="bg-white/80 border border-[var(--border)] rounded-3xl shadow-sm p-6 md:p-8">
      <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Registra tu caso y recibe acompañamiento claro
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            Para problemas de servicios públicos en Bogotá: cobros altos, cortes, basuras, alumbrado y fallas del servicio.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/registro"
              className="px-5 py-3 rounded-2xl text-white font-bold min-h-[52px] inline-flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              Registrar mi caso
            </Link>

            <Link
              href="/como-funciona"
              className="px-5 py-3 rounded-2xl border border-[var(--border)] bg-white/80 font-bold min-h-[52px] inline-flex items-center justify-center"
            >
              Ver el proceso
            </Link>
          </div>

          <div className="mt-5 border-l-8 rounded-2xl p-4 bg-emerald-50 border-[var(--success)]">
            <div className="font-bold">Tu información se maneja con cuidado</div>
            <div className="text-[var(--muted)] mt-1">
              Solo la usamos para gestionar tu solicitud. No pedimos claves ni datos bancarios.
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            ["1) Cuéntanos qué pasó", "Llena el formulario con calma."],
            ["2) Adjunta evidencias", "Fotos, PDFs o videos cortos."],
            ["3) Te informamos", "Te contamos avances por WhatsApp."]
          ].map(([t, d]) => (
            <div key={t} className="border border-[var(--border)] rounded-2xl p-4 bg-white/80">
              <div className="font-bold">{t}</div>
              <div className="text-[var(--muted)] mt-1">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
