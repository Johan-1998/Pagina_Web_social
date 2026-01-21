export default function ComoFuncionaPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 sm:p-10">
        <h1 className="text-2xl font-semibold text-slate-900">Cómo funciona</h1>
        <p className="mt-3 text-sm text-slate-700 sm:text-base">
          Este proceso está pensado para que sea claro y sin enredos. Tú solo cuéntame qué pasó y adjunta lo que
          tengas.
        </p>

        <ol className="mt-6 grid gap-4">
          <li className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Paso 1: Recibimos tu caso</p>
            <p className="mt-2 text-sm text-slate-700">
              Registras tu información y la dirección del problema.
            </p>
          </li>

          <li className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Paso 2: Revisamos evidencias</p>
            <p className="mt-2 text-sm text-slate-700">
              Miramos fotos, PDFs o videos para entender mejor lo ocurrido.
            </p>
          </li>

          <li className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Paso 3: Radicamos y hacemos seguimiento</p>
            <p className="mt-2 text-sm text-slate-700">
              Te indicamos la ruta adecuada (empresa, entidad y canales) y hacemos seguimiento del caso.
            </p>
          </li>

          <li className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Paso 4: Te informamos el resultado</p>
            <p className="mt-2 text-sm text-slate-700">
              Te contactamos por WhatsApp o por llamada para contarte qué pasó y qué sigue.
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}