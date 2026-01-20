import "./globals.css";
import NavBar from "./components/NavBar";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export const metadata = {
  title: "Defensa de Servicios Públicos – Bogotá",
  description: "Registro ciudadano y acompañamiento comunitario"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="text-[18px]">
        <NavBar />
        <main className="max-w-[1080px] mx-auto px-4 py-6">{children}</main>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}