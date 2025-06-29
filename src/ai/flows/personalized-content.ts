// src/ai/flows/personalized-content.ts
'use server';

/**
 * @fileOverview An AI agent that personalizes portfolio content based on user interests.
 *
 * - personalizeContent - A function that personalizes the portfolio content.
 * - PersonalizeContentInput - The input type for the personalizeContent function.
 * - PersonalizeContentOutput - The return type for the personalizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeContentInputSchema = z.object({
  visitorProfile: z
    .string()
    .describe('Description of the visitor profile and interests.'),
  portfolioContent: z.string().describe('The original content of the portfolio.'),
});
export type PersonalizeContentInput = z.infer<typeof PersonalizeContentInputSchema>;

const PersonalizeContentOutputSchema = z.object({
  personalizedContent: z
    .string()
    .describe('The portfolio content adapted to the visitor profile.'),
});
export type PersonalizeContentOutput = z.infer<typeof PersonalizeContentOutputSchema>;

export async function personalizeContent(input: PersonalizeContentInput): Promise<PersonalizeContentOutput> {
  return personalizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeContentPrompt',
  input: {schema: PersonalizeContentInputSchema},
  output: {schema: PersonalizeContentOutputSchema},
  prompt: `You are an expert in tailoring content to user interests.

You will receive a visitor profile and the original content of a portfolio.
Your task is to adapt the portfolio content to match the visitor's interests, highlighting the most relevant projects and skills.

Visitor Profile:
{{{visitorProfile}}}

Original Portfolio Content:
{{{portfolioContent}}}

Personalized Portfolio Content:`, // Removed media since no images are being used
});

const personalizeContentFlow = ai.defineFlow(
  {
    name: 'personalizeContentFlow',
    inputSchema: PersonalizeContentInputSchema,
    outputSchema: PersonalizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
