import nodemailer from "nodemailer";

function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

export async function sendAdminEmail(subject: string, html: string) {
  const host = required("SMTP_HOST");
  const port = Number(required("SMTP_PORT"));
  const secure = (process.env.SMTP_SECURE || "false") === "true";
  const user = required("SMTP_USER");
  const pass = required("SMTP_PASS");
  const admin = required("ADMIN_EMAIL");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from: `"Defensa Servicios Públicos" <${user}>`,
    to: admin,
    subject,
    html
  });
}