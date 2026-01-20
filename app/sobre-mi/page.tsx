"use client";

import { useState } from "react";
import PhotoModal from "../components/PhotoModal";

export default function SobreMiPage() {
  const [open, setOpen] = useState(false);

  // EDITA AQUÍ:
  const photoSrc = "/Johan.jpeg"; // pon tu archivo en /public
  const name = "Johan Mauricio Sánchez Gavirai";
  const role = "Acompañamiento comunitario y orientación clara para registrar casos de servicios públicos en Bogotá.";

  return (
    <section className="bg-white/80 border border-[var(--border)] rounded-3xl shadow-sm p-6 md:p-8">
      <h1 className="text-3xl font-bold">Sobre mí</h1>
      <p className="text-[var(--muted)] mt-2">
        Actualmente este proyecto lo lidero yo. Mi objetivo es ayudarte a registrar tu caso de forma clara y segura.
      </p>

      <div className="mt-6 grid md:grid-cols-[.7fr_1.3fr] gap-6">
        <div className="border border-[var(--border)] rounded-3xl p-5 bg-white/75">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-28 h-28 rounded-full overflow-hidden border block"
            style={{ borderColor: "var(--border)" }}
            aria-label="Ampliar foto"
            title="Clic para ampliar"
          >
            <img src={photoSrc} alt={`Foto de ${name}`} className="w-full h-full object-cover" />
          </button>

          <div className="mt-4">
            <div className="font-bold text-xl">{name}</div>
            <div className="text-[var(--muted)] mt-1">{role}</div>
          </div>

          <div className="mt-4 border-l-8 rounded-2xl p-4 bg-emerald-50" style={{ borderColor: "var(--success)" }}>
            <div className="font-bold">Disponibilidad</div>
            <div className="text-[var(--muted)] mt-1">Estoy abierta/o a recibir voluntarios que apoyen los procesos.</div>
          </div>
        </div>

        <div className="border border-[var(--border)] rounded-3xl p-5 bg-white/75">
          <div className="font-bold text-lg">Cómo ayudo</div>
          <ul className="mt-3 list-disc pl-6 text-[var(--muted)]">
            <li>Te guío para escribir el caso con tus palabras, sin enredos.</li>
            <li>Te indico qué evidencias sirven (fotos, recibos, pantallazos, PDFs).</li>
            <li>Te explico el proceso paso a paso de forma sencilla.</li>
          </ul>

          <div className="mt-5 border-l-8 rounded-2xl p-4 bg-amber-50" style={{ borderColor: "var(--warn)" }}>
            <div className="font-bold">Transparencia</div>
            <ul className="mt-2 list-disc pl-6 text-[var(--muted)]">
              <li>No cobro por registrar el caso.</li>
              <li>No pido claves ni datos bancarios.</li>
              <li>No prometo resultados “milagrosos”.</li>
            </ul>
          </div>
        </div>
      </div>

      <PhotoModal open={open} src={photoSrc} alt={`Foto de ${name}`} onClose={() => setOpen(false)} />
    </section>
  );
}
