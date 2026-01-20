export default function ComoFuncionaPage() {
  const steps = [
    ["Paso 1: Recibimos tu caso", "Queda registrado con un número de seguimiento."],
    ["Paso 2: Revisamos evidencias", "Vemos recibos, fotos o documentos para entender bien."],
    ["Paso 3: Radicamos y hacemos seguimiento", "Según el caso, se gestiona ante la entidad o empresa."],
    ["Paso 4: Te informamos", "Te contamos el resultado y los próximos pasos, sin lenguaje difícil."]
  ];

  return (
    <section className="bg-white/80 border border-[var(--border)] rounded-3xl shadow-sm p-6 md:p-8">
      <h1 className="text-3xl font-bold">Cómo funciona</h1>
      <p className="text-[var(--muted)] mt-2">Cuatro pasos, sin enredos.</p>

      <div className="mt-5 grid md:grid-cols-2 gap-4">
        {steps.map(([t, d]) => (
          <div key={t} className="border border-[var(--border)] rounded-2xl p-4 bg-white/75">
            <div className="font-bold">{t}</div>
            <div className="text-[var(--muted)] mt-1">{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}