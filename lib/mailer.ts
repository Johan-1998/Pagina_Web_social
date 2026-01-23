import nodemailer from "nodemailer";

export type AdminCaseEmailData = {
  shortCode?: string; // radicado corto (ej: 871NDS)
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  neighborhood?: string;
  locality?: string;
  problemType?: string;
  reference?: string;
  description?: string;
  evidenceCount?: number;
};

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

function asText(v: unknown) {
  return (v ?? "").toString().trim();
}

function buildCaseEmail(data: AdminCaseEmailData) {
  const shortCode = asText(data.shortCode);
  const fullName = asText(data.fullName);
  const phone = asText(data.phone);
  const email = asText(data.email);
  const address = asText(data.address);
  const neighborhood = asText(data.neighborhood);
  const locality = asText(data.locality);
  const problemType = asText(data.problemType);
  const reference = asText(data.reference);
  const description = asText(data.description);
  const evidenceCount =
    typeof data.evidenceCount === "number" && Number.isFinite(data.evidenceCount)
      ? data.evidenceCount
      : 0;

  const subject =
    `Nuevo caso${shortCode ? ` - ${shortCode}` : ""}`.trim() || "Nuevo caso (sin radicado)";

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color:#111;">
    <h2 style="margin:0 0 12px 0;">Nuevo caso recibido</h2>

    <div style="padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;">
      <p style="margin:0 0 6px 0;"><strong>Radicado:</strong> ${
        shortCode ? escapeHtml(shortCode) : "No disponible"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Nombre:</strong> ${
        fullName ? escapeHtml(fullName) : "No disponible"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Teléfono:</strong> ${
        phone ? escapeHtml(phone) : "No disponible"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Correo:</strong> ${
        email ? escapeHtml(email) : "No aplica"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Dirección:</strong> ${
        address ? escapeHtml(address) : "No disponible"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Barrio:</strong> ${
        neighborhood ? escapeHtml(neighborhood) : "No disponible"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Localidad:</strong> ${
        locality ? escapeHtml(locality) : "No disponible"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Tipo de problema:</strong> ${
        problemType ? escapeHtml(problemType) : "No disponible"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Referencia:</strong> ${
        reference ? escapeHtml(reference) : "No aplica"
      }</p>
      <p style="margin:0 0 6px 0;"><strong>Evidencias adjuntas:</strong> ${evidenceCount}</p>
    </div>

    <h3 style="margin:16px 0 8px 0;">Descripción</h3>
    <div style="padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#ffffff;">
      ${
        description
          ? escapeHtml(description).replaceAll("\n", "<br/>")
          : "<span style='color:#6b7280'>No se envió descripción.</span>"
      }
    </div>

    <p style="margin-top:14px;color:#6b7280;font-size:12px;">
      Enviado desde la plataforma “Defensa de Servicios Públicos”.
    </p>
  </div>
  `;

  return { subject, html };
}

/**
 * Envía el correo al administrador cuando se registra un caso.
 * Requiere estas variables en Vercel/entorno:
 * ADMIN_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE (opcional)
 */
export async function sendAdminEmail(data: AdminCaseEmailData) {
  const ADMIN_EMAIL = requireEnv("ADMIN_EMAIL");

  const SMTP_HOST = requireEnv("SMTP_HOST");
  const SMTP_PORT = Number(requireEnv("SMTP_PORT"));
  const SMTP_USER = requireEnv("SMTP_USER");
  const SMTP_PASS = requireEnv("SMTP_PASS");
  const SMTP_SECURE = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true si usas 465, false si usas 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const { subject, html } = buildCaseEmail(data);

  await transporter.sendMail({
    from: `"Defensa Servicios Públicos" <${SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject,
    html,
  });
}