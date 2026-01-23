import { z } from "zod";

const phoneRegex = /^[0-9+\s()-]{7,20}$/;

export const caseSchema = z.object({
  fullName: z.string().trim().min(1, "Por favor escribe tu nombre completo."),
  phone: z
    .string()
    .trim()
    .min(1, "Por favor escribe tu teléfono.")
    .regex(phoneRegex, "Revisa el teléfono. Usa solo números y, si quieres, + y espacios."),
  email: z.string().trim().email("Revisa el correo.").optional().or(z.literal("")),
  address: z.string().trim().min(1, "Por favor escribe la dirección del caso."),
  neighborhood: z.string().trim().min(1, "Por favor escribe el barrio."),
  locality: z.string().trim().min(1, "Por favor escribe la localidad."),
  problemType: z.string().trim().min(1, "Por favor selecciona el tipo de problema."),
  reference: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().min(1, "Cuéntanos el problema con tus palabras.")
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Por favor escribe tu nombre."),
  phone: z
    .string()
    .trim()
    .min(1, "Por favor escribe tu teléfono.")
    .regex(phoneRegex, "Revisa el teléfono. Usa solo números y, si quieres, + y espacios."),
  message: z.string().trim().min(1, "Por favor escribe tu mensaje.")
});