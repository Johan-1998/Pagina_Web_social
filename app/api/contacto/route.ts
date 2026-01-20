import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { prisma } from "@/lib/db";
import { sendAdminEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Revisa los datos del formulario.";
      return NextResponse.json({ ok: false, message: msg }, { status: 400 });
    }

    const saved = await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        message: parsed.data.message
      }
    });

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.4;">
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>ID:</strong> ${saved.id}</p>
        <p><strong>Nombre:</strong> ${saved.name}</p>
        <p><strong>Teléfono:</strong> ${saved.phone}</p>
        <p><strong>Mensaje:</strong><br/>${saved.message.replace(/\n/g, "<br/>")}</p>
      </div>
    `;
    await sendAdminEmail("Nuevo mensaje de contacto", html);

    return NextResponse.json({
      ok: true,
      message: "Gracias. Recibimos tu mensaje y te responderemos en horario de atención."
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "No pudimos enviar tu mensaje ahora. Intenta de nuevo o usa WhatsApp." },
      { status: 500 }
    );
  }
}