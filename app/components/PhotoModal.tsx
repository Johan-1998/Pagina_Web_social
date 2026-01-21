"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

export default function PhotoModal({ open, onClose, src, alt }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de la foto"
      onClick={onClose}
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenido */}
      <div
        className="relative z-[101] w-full max-w-md rounded-2xl bg-white p-3 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-1 pb-2">
          <p className="text-sm font-semibold text-slate-900">Foto</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 hover:bg-slate-50"
            aria-label="Cerrar"
          >
            Cerrar
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {/* Imagen ampliada (se ajusta a pantalla sin desbordar) */}
          <img
            src={src}
            alt={alt}
            className="h-auto w-full max-h-[70vh] object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}