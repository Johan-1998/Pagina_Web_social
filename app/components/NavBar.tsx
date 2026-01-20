"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/registro", label: "Registrar" },
  { href: "/como-funciona", label: "Proceso" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" }
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-[var(--border)]">
      <div className="max-w-[1080px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-[220px]">
          <div className="font-bold">Defensa de Servicios Públicos – Bogotá</div>
          <div className="text-sm text-[var(--muted)]">Registro ciudadano y acompañamiento comunitario</div>
        </div>

        <nav className="hidden md:flex gap-2" aria-label="Navegación principal">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "px-3 py-2 rounded-xl border",
                  active ? "bg-white border-[var(--border)]" : "bg-white/60 border-transparent hover:border-[var(--border)] hover:bg-white"
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/registro"
          className="inline-flex items-center justify-center px-4 py-3 rounded-xl text-white font-bold min-h-[52px]"
          style={{ background: "var(--primary)" }}
        >
          Registrar caso
        </Link>
      </div>
    </header>
  );
}