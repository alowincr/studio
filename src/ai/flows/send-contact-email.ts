'use server';
/**
 * @fileOverview A flow to handle sending an email from the contact form.
 *
 * - sendContactEmail - A function that handles sending the contact form data.
 * - ContactFormInput - The input type for the sendContactEmail function.
 * - ContactFormOutput - The return type for the sendContactEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email of the person sending the message.'),
  subject: z.string().describe('The subject of the message.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  success: z.boolean().describe('Whether the email was sent successfully.'),
  message: z.string().describe('A confirmation message.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function sendContactEmail(input: ContactFormInput): Promise<ContactFormOutput> {
  return sendContactEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sendContactEmailPrompt',
  input: {schema: ContactFormInputSchema},
  output: {schema: ContactFormOutputSchema},
  prompt: `You are a virtual assistant responsible for processing contact form submissions for a personal portfolio. Your task is to simulate sending an email to the portfolio owner, Alonso Carbajal, at alonsocarbajalarc215@gmail.com.

  Do NOT actually send an email. This is a simulation.

  The details from the form are as follows:
  - From Name: {{{name}}}
  - From Email: {{{email}}}
  - Subject: {{{subject}}}
  - Message: {{{message}}}

  Your response should be a simple confirmation. Respond in Spanish. Set the success field to true and provide a friendly confirmation message. For example: "¡Gracias, {{name}}! Tu mensaje ha sido enviado. Alonso se pondrá en contacto contigo pronto."
  `,
});

const sendContactEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // The prompt is designed to always return a valid output, so we can use the non-null assertion.
    return output!;
  }
);
