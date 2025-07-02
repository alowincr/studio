"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map((issue) => issue.message).join(" ");
    return { success: false, message: `Datos inválidos: ${errorMessages}` };
  }
  
  // For a real application, you would use a service like Resend, SendGrid, 
  // or Nodemailer here to send the email.
  // For this example, we'll simulate a successful submission to avoid exposing credentials.
  console.log("Contact Form Submitted (Simulated):");
  console.log(parsed.data);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { 
    success: true, 
    message: `¡Gracias, ${parsed.data.name}! Tu mensaje ha sido enviado. Alonso se pondrá en contacto contigo pronto.` 
  };
}
