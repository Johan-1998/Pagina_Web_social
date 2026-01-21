import { NextRequest, NextResponse } from "next/server";
import { caseSchema } from "@/lib/validators";
import { prisma } from "@/lib/db";
import { sendAdminEmail } from "@/lib/mailer";
import { randomUUID } from "crypto";
import { uploadToR2 } from "@/lib/r2";

export const runtime = "nodejs";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180);
}

// ===== Código corto: 3 números + 3 letras (ej: 381QPD) =====
function randomDigits3() {
  return String(Math.floor(Math.random() * 1000)).padStart(3, "0");
}
function randomLetters3() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let out = "";
  for (let i = 0; i < 3; i++) out += letters[Math.floor(Math.random() * letters.length)];
  return out;
}
async function generateUniqueShortCode() {
  for (let i = 0; i < 30; i++) {
    const code = `${randomDigits3()}${randomLetters3()}`;
    const exists = await prisma.case.findUnique({ where: { shortCode: code } });
    if (!exists) return code;
  }
  throw new Error("No se pudo generar un código corto único. Intenta de nuevo.");
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const payload = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      address: String(form.get("address") || ""),
      neighborhood: String(form.get("neighborhood") || ""),
      locality: String(form.get("locality") || ""),
      problemType: String(form.get("problemType") || ""),
      reference: String(form.get("reference") || ""),
      description: String(form.get("description") || "")
    };

    const parsed = caseSchema.safeParse(payload);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Revisa los datos del formulario.";
      return NextResponse.json({ ok: false, message: msg }, { status: 400 });
    }

    // Crear caso con código corto
    const shortCode = await generateUniqueShortCode();

    const created = await prisma.case.create({
      data: {
        shortCode,
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email ? parsed.data.email : null,
        address: parsed.data.address,
        neighborhood: parsed.data.neighborhood,
        locality: parsed.data.locality,
        problemType: parsed.data.problemType,
        reference: parsed.data.reference ? parsed.data.reference : null,
        description: parsed.data.description
      }
    });

    // Evidencias (múltiples, ilimitadas en cantidad; limitamos por tamaño y tipo)
    const maxBytes = Number(process.env.MAX_FILE_BYTES || "26214400"); // 25MB por archivo
    const evidences = form.getAll("evidence");

    for (const item of evidences) {
      if (!(item instanceof File)) continue;

      if (item.size > maxBytes) {
        return NextResponse.json(
          {
            ok: false,
            message: `Uno de los archivos supera el tamaño permitido (${Math.round(
              maxBytes / 1024 / 1024
            )}MB). Por favor envía archivos más livianos.`
          },
          { status: 413 }
        );
      }

      const mime = item.type || "application/octet-stream";
      const allowed =
        mime.startsWith("image/") || mime === "application/pdf" || mime.startsWith("video/");
      if (!allowed) {
        return NextResponse.json(
          { ok: false, message: "Uno de los archivos no es permitido. Usa imágenes, PDF o video." },
          { status: 400 }
        );
      }

      const bytes = Buffer.from(await item.arrayBuffer());

      // Guardamos en R2 con un key único
      const storedName = `${created.shortCode}/${randomUUID()}-${safeName(item.name || "archivo")}`;

      await uploadToR2({
        key: storedName,
        body: bytes,
        contentType: mime
      });

      // Guardamos metadata en la BD
      await prisma.evidence.create({
        data: {
          caseId: created.id,
          originalName: item.name || "archivo",
          storedName, // aquí queda el "key" de R2
          mimeType: mime,
          sizeBytes: item.size,
          localPath: "" // en producción con R2 no aplica; lo dejamos vacío para no romper tu modelo actual
        }
      });
    }

    // Email al admin (sin adjuntos, solo resumen)
    const html =
      `<div style="font-family: Arial, sans-serif; line-height: 1.4;">` +
      `<h2>Nuevo caso registrado</h2>` +
      `<p><strong>Código del caso:</strong> ${created.shortCode}</p>` +
      `<p><strong>Nombre:</strong> ${created.fullName}</p>` +
      `<p><strong>Teléfono:</strong> ${created.phone}</p>` +
      `<p><strong>Email:</strong> ${created.email ?? "No informado"}</p>` +
      `<p><strong>Dirección:</strong> ${created.address}</p>` +
      `<p><strong>Barrio / Localidad:</strong> ${created.neighborhood} / ${created.locality}</p>` +
      `<p><strong>Tipo de problema:</strong> ${created.problemType}</p>` +
      `<p><strong>Referencia:</strong> ${created.reference ?? "No informado"}</p>` +
      `<p><strong>Descripción:</strong><br/>${created.description.replace(/\n/g, "<br/>")}</p>` +
      `<p style="color:#475569">Evidencias: guardadas de forma privada en almacenamiento seguro.</p>` +
      `</div>`;

    await sendAdminEmail(
      `Nuevo caso ${created.shortCode}: ${created.problemType} (${created.locality})`,
      html
    );

    return NextResponse.json({
      ok: true,
      message:
        "Listo. Recibimos tu caso. En las próximas horas hábiles revisaremos la información y te contactaremos por WhatsApp.",
      caseId: created.shortCode
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "En este momento no pudimos recibir tu caso. Por favor intenta de nuevo o escríbenos por WhatsApp."
      },
      { status: 500 }
    );
  }
}