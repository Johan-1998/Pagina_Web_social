import { z } from "zod";

export const caseSchema = z.object({
  fullName: z.string().min(3, "Escribe tu nombre completo."),
  phone: z.string().min(7, "Revisa el teléfono."),
  email: z.string().email("Correo inválido.").optional().or(z.literal("")),
  address: z.string().min(5, "Escribe la dirección del caso."),
  neighborhood: z.string().min(2, "Escribe el barrio."),
  locality: z.string().min(2, "Escribe la localidad."),
  problemType: z.string().min(2, "Selecciona el tipo de problema."),
  reference: z.string().optional().or(z.literal("")),
  description: z.string().min(20, "Cuéntanos un poco más (mínimo 20 caracteres).")
});

export const contactSchema = z.object({
  name: z.string().min(3, "Escribe tu nombre."),
  phone: z.string().min(7, "Revisa el teléfono."),
  message: z.string().min(10, "Escribe un mensaje más claro (mínimo 10 caracteres).")
});