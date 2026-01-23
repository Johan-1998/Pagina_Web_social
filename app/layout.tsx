import "./globals.css";
import type { Metadata } from "next";
import SiteFooter from "./components/SiteFooter";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Defensa de Servicios Públicos – Bogotá",
  description: "Registro ciudadano y acompañamiento comunitario",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <NavBar />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}