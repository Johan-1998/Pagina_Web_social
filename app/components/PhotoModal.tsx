"use client";

import { useState } from "react";

type PhotoModalProps = {
  // Nuevo API (el que te di)
  title?: string;
  thumb: React.ReactNode;
  imageSrc: string;
  imageAlt: string;

  // Compatibilidad por si antes lo usabas con otros nombres (no rompe)
  src?: string;
  alt?: string;
  children?: React.ReactNode;
};

export default function PhotoModal(props: PhotoModalProps) {
  const [open, setOpen] = useState(false);

  // Compat: si alguien usa src/alt viejos
  const imageSrc = props.imageSrc || props.src || "";
  const imageAlt = props.imageAlt || props.alt || "Foto";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-zoom-in"
        aria-label="Ampliar foto"
      >
        {props.thumb || props.children}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={props.title || "Foto"}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="text-sm font-semibold text-slate-900">
                {props.title || "Foto"}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>

            <div className="p-4">
              {/* Usamos <img> para evitar problemas de Next/Image si la ruta no existe */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="mx-auto max-h-[70vh] w-auto rounded-xl object-contain"
              />
              <p className="mt-2 text-center text-xs text-slate-500">
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}