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
  prompt: `You are a virtual assistant for a personal portfolio. Your task is to process contact form submissions.

You will receive the following data:
- From Name: {{{name}}}
- From Email: {{{email}}}
- Subject: {{{subject}}}
- Message: {{{message}}}

You MUST respond with a JSON object that strictly adheres to the following structure:
{
  "success": boolean,
  "message": "string"
}

Based on the input, generate a response.
The response language must be Spanish.
Set the 'success' field to \`true\`.
For the 'message' field, create a friendly confirmation message to the user.
Example confirmation message: "¡Gracias, {{{name}}}! Tu mensaje ha sido enviado. Alonso se pondrá en contacto contigo pronto."
Do NOT include any text or markdown formatting outside of the JSON object.`,
});

const sendContactEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      console.error("AI response was null or failed to parse.", {input});
      throw new Error("The AI model did not return a valid output that matches the schema.");
    }
    return output;
  }
);
