export default function SobreMiPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 sm:p-10">
        <h1 className="text-2xl font-semibold text-slate-900">Sobre mí</h1>

        <div className="mt-4 grid gap-6 sm:grid-cols-[180px_1fr]">
          <div className="flex items-start justify-center">
            <div className="h-36 w-36 rounded-full bg-slate-200 ring-4 ring-white shadow-sm" />
          </div>

          <div>
            <p className="text-sm text-slate-700 sm:text-base">
              Soy un ciudadano que acompaña a personas y familias cuando tienen problemas con servicios públicos
              (facturación, cortes, reconexiones, alumbrado, basuras, servicio irregular, medidores, entre otros).
              Mi objetivo es que la gente entienda el proceso, reúna evidencias y sepa cómo reclamar de forma
              ordenada y respetuosa.
            </p>

            <p className="mt-3 text-sm text-slate-700 sm:text-base">
              En muchos casos, el mayor problema no es solo el daño o el cobro, sino la falta de información.
              Aquí buscamos que cada persona se sienta acompañada, con claridad y sin miedo a “equivocarse” al
              hacer el trámite.
            </p>

            <p className="mt-3 text-sm text-slate-700 sm:text-base">
              Esta iniciativa es comunitaria. Si el proyecto crece, me gustaría recibir voluntarios que apoyen en
              organización de casos, orientación administrativa y difusión responsable.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Lo que sí hago</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                <li>Ayudar a organizar el caso y la evidencia.</li>
                <li>Explicar el proceso en lenguaje sencillo.</li>
                <li>Orientar sobre canales de radicación y seguimiento.</li>
              </ul>

              <p className="mt-4 text-sm font-semibold text-slate-900">Lo que NO hago</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                <li>No hago cobros por registrar el caso.</li>
                <li>No prometo resultados “seguros”.</li>
                <li>No hago política ni proselitismo.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}