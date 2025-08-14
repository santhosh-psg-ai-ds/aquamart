// This is a server-side file!
'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - productRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the productRecommendations function.
 * - ProductRecommendationsOutput - The return type for the productRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('The browsing history of the user, as a string of product names.'),
  searchQueries: z.string().describe('The search queries of the user, as a string.'),
});
export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z
    .array(z.string())
    .describe('An array of recommended product names.'),
});
export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function productRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommendation agent.

You will use the user's browsing history and search queries to recommend products that the user might be interested in.

Consider the browsing history and search queries when recommending products. Be concise and only list the names of the products.

Browsing History: {{{browsingHistory}}}
Search Queries: {{{searchQueries}}}

Recommended Products:`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
