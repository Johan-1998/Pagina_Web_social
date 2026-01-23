import Link from "next/link";

export default function SiteFooter() {
  const whatsapp =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.PUBLIC_WHATSAPP_NUMBER ||
    "";

  const facebookUrl =
    process.env.NEXT_PUBLIC_FACEBOOK_URL ||
    process.env.PUBLIC_FACEBOOK_URL ||
    "";

  const waHref = whatsapp
    ? `https://wa.me/${String(whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hola. Quiero orientación sobre un caso de servicios públicos."
      )}`
    : "#";

  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* SOLO 2 CUADROS */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Horarios + botones debajo del horario */}
          <section
            aria-label="Horarios de atención"
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h3 className="text-base font-semibold text-slate-900">
              Horarios de atención
            </h3>

            <p className="mt-2 text-sm text-slate-700">
              Lunes a viernes: 8:00 a.m. – 5:00 p.m.
              <br />
              Sábados: 9:00 a.m. – 12:00 m.
            </p>

            {/* BOTONES EXACTAMENTE DEBAJO DEL HORARIO */}
            <div className="mt-4 flex flex-wrap gap-3">
              {whatsapp ? (
                <Link
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
                >
                  WhatsApp
                </Link>
              ) : null}

              {facebookUrl ? (
                <Link
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
                >
                  Facebook
                </Link>
              ) : null}
            </div>
          </section>

          {/* Disponibilidad */}
          <section
            aria-label="Disponibilidad y respuesta"
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h3 className="text-base font-semibold text-slate-900">
              Disponibilidad
            </h3>

            <p className="mt-2 text-sm text-slate-700">
              Si registras tu caso, te contactaré por WhatsApp o por llamada para
              confirmar información y explicarte el siguiente paso. Si no puedes
              atender de inmediato, no pasa nada: lo retomamos con calma.
            </p>
          </section>
        </div>

        {/* PROTECCIÓN DE DATOS COMO LÍNEA, NO CUADRO */}
        <p className="mt-6 text-xs text-slate-600">
          Protección de datos (Ley 1581 de 2012): usamos tu información únicamente
          para gestionar tu caso y darte respuesta. No vendemos ni compartimos
          datos con fines comerciales.
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Iniciativa comunitaria. No es un canal oficial de empresas de servicios públicos.
        </p>
      </div>
    </footer>
  );
}