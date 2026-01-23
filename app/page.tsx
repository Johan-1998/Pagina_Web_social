export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-sky-50 p-6 sm:p-10">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Registra tu caso y recibe acompañamiento claro
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">
          Esta plataforma ayuda a ciudadanos, especialmente adultos mayores, a registrar problemas con servicios
          públicos en Bogotá, subir evidencias y entender el proceso. La idea es que no te sientas solo(a) ni
          confundido(a): aquí todo se explica con calma y paso a paso.
        </p>

        {/* ✅ Pasos (se quedan) */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">1) Cuéntame tu caso</p>
            <p className="mt-2 text-sm text-slate-700">
              En “Registrar caso” llenas un formulario sencillo con tus datos y la dirección del problema.
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">2) Sube evidencias</p>
            <p className="mt-2 text-sm text-slate-700">
              Puedes adjuntar fotos, PDF o video. Entre más claro esté, mejor.
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">3) Te contacto</p>
            <p className="mt-2 text-sm text-slate-700">
              Te responderé por WhatsApp o por llamada para confirmar y explicarte los siguientes pasos.
            </p>
          </div>
        </div>

        {/* ✅ Confianza (se queda) */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4">
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Confianza:</span> tu información se usa únicamente
            para gestionar tu caso. Las evidencias se guardan de forma privada y no se publican.
          </p>
        </div>

       

        {/* ✅ Disponibilidad + Horarios al final (como pediste) */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6">

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Voluntarios</p>
              <p className="mt-2 text-sm text-slate-700">
                Si quieres apoyar como voluntario (comunitario, jurídico o administrativo), puedes escribirme.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}