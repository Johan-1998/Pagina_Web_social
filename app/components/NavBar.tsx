"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function clsx(...arr: Array<string | false | undefined | null>) {
  return arr.filter(Boolean).join(" ");
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.63c-.28-.14-1.64-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.09-.16.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.43-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43 0 1.42 1.02 2.8 1.16 2.99.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.64-.67 1.88-1.31.23-.64.23-1.19.16-1.31-.07-.12-.26-.19-.54-.33z"
      />
      <path
        fill="currentColor"
        d="M26.68 5.32A13.4 13.4 0 0 0 16.01 1C8.83 1 3 6.83 3 14c0 2.28.6 4.5 1.74 6.46L3 31l10.8-1.7A12.92 12.92 0 0 0 16 27c7.18 0 13.01-5.83 13.01-13a13 13 0 0 0-2.33-8.68zM16 25.1c-1.93 0-3.83-.52-5.49-1.52l-.39-.23-6.41 1.01 1.03-6.25-.25-.4A10.93 10.93 0 0 1 5.1 14C5.1 7.98 9.98 3.1 16 3.1c2.92 0 5.66 1.14 7.72 3.2A10.84 10.84 0 0 1 26.9 14c0 6.02-4.88 11.1-10.9 11.1z"
      />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57v1.88h2.79l-.45 2.91h-2.34V22C18.34 21.25 22 17.08 22 12.06z"
      />
    </svg>
  );
}

function buildWhatsAppLink(phoneDigits: string, text?: string) {
  const digits = (phoneDigits || "").replace(/\D/g, "");
  const t = text ? encodeURIComponent(text) : "";
  return `https://wa.me/${digits}${t ? `?text=${t}` : ""}`;
}

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573114244234";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/";

  const navItems = useMemo(
    () => [
      { href: "/", label: "Inicio" },
      { href: "/como-funciona", label: "Proceso" },
      { href: "/sobre-mi", label: "Sobre mí" },
      { href: "/contacto", label: "Contacto" }
      // ✅ No hay "Registrar" en el menú
    ],
    []
  );

  const whatsappHref = buildWhatsAppLink(
    whatsappNumber,
    "Hola, quiero registrar un caso de servicios públicos."
  );

  // ✅ Botón principal: color amigable (teal/verde) y centrado
  const primaryBtnClass =
    "inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700";

  const primaryBtnClassMobile =
    "inline-flex items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-slate-900">
            Defensa de Servicios Públicos
          </span>
          <span className="truncate text-xs text-slate-600">
            Acompañamiento comunitario
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-3 md:flex" aria-label="Navegación principal">
          {navItems.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={clsx(
                  "rounded-full px-3 py-2 text-sm",
                  active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100"
                )}
              >
                {it.label}
              </Link>
            );
          })}

          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#1877F2] hover:bg-slate-100"
            aria-label="Abrir Facebook"
          >
            <FacebookIcon className="h-5 w-5" />
            <span className="hidden lg:inline">Facebook</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#25D366] hover:bg-slate-100"
            aria-label="Abrir WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>

          <Link href="/registro" className={primaryBtnClass}>
            Registrar caso
          </Link>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/registro" className={primaryBtnClassMobile}>
            Registrar caso
          </Link>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="grid gap-2">
              {navItems.map((it) => {
                const active = pathname === it.href;
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={clsx(
                      "rounded-xl px-4 py-3 text-sm",
                      active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {it.label}
                  </Link>
                );
              })}

              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-[#1877F2] hover:bg-slate-100"
              >
                <FacebookIcon className="h-5 w-5" />
                Facebook
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-[#25D366] hover:bg-slate-100"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}