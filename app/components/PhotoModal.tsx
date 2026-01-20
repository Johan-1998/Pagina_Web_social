"use client";

import { useEffect } from "react";

export default function PhotoModal(props: {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") props.onClose();
    }
    if (props.open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.open, props.onClose]);

  if (!props.open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={props.onClose}
      style={{ background: "rgba(15,23,42,.65)" }}
    >
      <div
        className="max-w-[900px] w-full bg-white rounded-3xl p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded-xl border border-[var(--border)] bg-white hover:bg-gray-50 font-bold"
            onClick={props.onClose}
          >
            Cerrar
          </button>
        </div>
        <img src={props.src} alt={props.alt} className="w-full h-auto rounded-2xl mt-3" />
      </div>
    </div>
  );
}