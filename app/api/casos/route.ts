import { NextRequest, NextResponse } from "next/server";
import { caseSchema } from "@/lib/validators";
import { prisma } from "@/lib/db";
import { sendAdminEmail } from "@/lib/mailer";
import { uploadToR2 } from "@/lib/r2";

export const runtime = "nodejs";

function sanitizeFileName(name: string) {
  return name
    .replace(/[^\w.\-() ]+/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 140);
}

async function generateUniqueShortCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randLetters = () =>
    Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");

  for (let i = 0; i < 30; i++) {
    const nums = String(Math.floor(Math.random() * 900) + 100); // 100-999
    const code = `${nums}${randLetters()}`; // ej: 871NDS

    const exists = await prisma.case.findUnique({ where: { shortCode: code } });
    if (!exists) return code;
  }

  return `${Date.now().toString().slice(-3)}AAA`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const payload = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || "").trim() || null,
      address: String(form.get("address") || ""),
      neighborhood: String(form.get("neighborhood") || ""),
      locality: String(form.get("locality") || ""),
      problemType: String(form.get("problemType") || ""),
      reference: String(form.get("reference") || "").trim() || null,
      description: String(form.get("description") || ""),
    };

    const parsed = caseSchema.safeParse(payload);
    if (!parsed.success) {
      const msg = parsed.error.issues?.[0]?.message || "Revisa los datos del formulario.";
      return NextResponse.json({ ok: false, message: msg }, { status: 400 });
    }

    // 1) Crear caso
    const shortCode = await generateUniqueShortCode();

    const created = await prisma.case.create({
      data: {
        shortCode,
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email,
        address: parsed.data.address,
        neighborhood: parsed.data.neighborhood,
        locality: parsed.data.locality,
        problemType: parsed.data.problemType,
        reference: parsed.data.reference,
        description: parsed.data.description,
      },
    });

    // 2) Evidencias opcionales
    const files = form.getAll("files").filter((x): x is File => x instanceof File);
    const bucket = process.env.R2_BUCKET || ""; // solo para armar localPath

    let uploadedCount = 0;
    let uploadErrors = 0;

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const safeName = sanitizeFileName(file.name || "archivo");
      const key = `cases/${created.shortCode}/${Date.now()}_${safeName}`;

      try {
        const buf = Buffer.from(await file.arrayBuffer());

        // ✅ 1) subir a R2
        await uploadToR2({
          key,
          body: buf,
          contentType: file.type || "application/octet-stream",
        });

        // ✅ 2) SOLO si subió, guardamos Evidence
        await prisma.evidence.create({
          data: {
            caseId: created.id,
            originalName: safeName,
            storedName: key,
            mimeType: file.type || "application/octet-stream",
            sizeBytes: file.size,
            localPath: bucket ? `r2://${bucket}/${key}` : key,
          },
        });

        uploadedCount++;
      } catch (e: any) {
        uploadErrors++;
        console.error("ERROR subiendo a R2:", {
          shortCode: created.shortCode,
          file: { name: file?.name, type: file?.type, size: file?.size },
          key,
          message: e?.message || e,
        });
        // no tumbamos el caso; solo seguimos con los demás archivos
      }
    }

    // 3) Email (sin romper tu firma: puede ser 1 o 2 args)
    const mailPayload = {
      shortCode: created.shortCode,
      fullName: created.fullName,
      phone: created.phone,
      email: created.email || "",
      address: created.address,
      neighborhood: created.neighborhood,
      locality: created.locality,
      problemType: created.problemType,
      reference: created.reference || "",
      description: created.description,
      evidenceCount: uploadedCount,
    };

    // 3) Email (NO cambies tu mailer; llámalo como antes: 1 solo argumento)
    try {
      await (sendAdminEmail as any)({
        shortCode: created.shortCode,
        fullName: created.fullName,
        phone: created.phone,
        email: created.email || "",
        address: created.address,
        neighborhood: created.neighborhood,
        locality: created.locality,
        problemType: created.problemType,
        reference: created.reference || "",
        description: created.description,
        evidenceCount: uploadedCount,
      });
    } catch (e: any) {
      console.error("ERROR enviando email:", e?.message || e);
    }


    return NextResponse.json({
      ok: true,
      shortCode: created.shortCode,
      id: created.id,
      uploadedCount,
      uploadErrors,
    });
  } catch (e: any) {
    console.error("ERROR /api/casos:", e?.message || e);
    return NextResponse.json(
      { ok: false, message: "No se pudo procesar tu caso. Intenta de nuevo." },
      { status: 500 }
    );
  }
}