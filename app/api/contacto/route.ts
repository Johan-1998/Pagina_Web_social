import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { ok: false, message: "Completa nombre, teléfono y mensaje." },
        { status: 400 }
      );
    }

    // 1) Guardar en BD (tu modelo usa "name")
    await prisma.contactMessage.create({
      data: { name, phone, message },
    });

    // 2) Enviar correo al administrador (SMTP de Gmail que ya tienes)
    const ADMIN_EMAIL = requireEnv("ADMIN_EMAIL");

    const SMTP_HOST = requireEnv("SMTP_HOST");
    const SMTP_PORT = Number(requireEnv("SMTP_PORT"));
    const SMTP_USER = requireEnv("SMTP_USER");
    const SMTP_PASS = requireEnv("SMTP_PASS");
    const SMTP_SECURE = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE, // true si usas 465
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `Nuevo mensaje de contacto - ${name}`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.4">
        <h2 style="margin:0 0 10px 0;">Nuevo mensaje desde Contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="padding:12px;border:1px solid #ddd;border-radius:8px;background:#fafafa;">
          ${escapeHtml(message).replaceAll("\n", "<br/>")}
        </div>
        <p style="margin-top:14px;color:#666;font-size:12px;">
          Enviado desde la plataforma “Defensa de Servicios Públicos”.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Defensa Servicios Públicos" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("ERROR /api/contacto:", e?.message || e);
    return NextResponse.json(
      { ok: false, message: "No pudimos enviar tu mensaje ahora. Intenta de nuevo o usa WhatsApp." },
      { status: 500 }
    );
  }
}