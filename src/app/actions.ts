"use server";

import { z } from "zod";
import { sendContactEmail } from "@/ai/flows/send-contact-email";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Datos inválidos." };
  }

  try {
    const result = await sendContactEmail(parsed.data);
    return result;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Hubo un error al conectar con el servicio de IA. Intenta de nuevo." };
  }
}
