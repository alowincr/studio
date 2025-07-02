"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API key is not configured.");
    return { success: false, message: "El servicio de correo no está configurado. Contacta al administrador." };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'alonsocarbajalarc215@gmail.com',
      subject: `Nuevo mensaje de tu portafolio: ${subject}`,
      reply_to: email,
      html: `
        <h1>Nuevo mensaje de contacto desde tu portafolio</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, message: "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde." };
    }

    return { 
      success: true, 
      message: `¡Gracias, ${name}! Tu mensaje ha sido enviado. Alonso se pondrá en contacto contigo pronto.` 
    };

  } catch (exception) {
    console.error("Contact Form Error:", exception);
    return { success: false, message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo." };
  }
}
