"use server";

import { z } from "zod";

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

  // Here you would typically send an email using a service like Resend, SendGrid, etc.
  // For this example, we'll just simulate a successful submission.
  console.log("Form submitted:", parsed.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "¡Mensaje enviado con éxito!" };
}
