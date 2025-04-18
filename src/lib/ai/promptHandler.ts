import OpenAI from 'openai';
import { z } from 'zod';

// Create OpenAI client with public runtime config
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Enable client-side usage
});

// Schema for UI component generation
const UIComponentSchema = z.object({
  type: z.enum(['form', 'table', 'chart', 'list', 'card']),
  fields: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'number', 'email', 'password', 'date', 'select']),
    label: z.string(),
    required: z.boolean().optional(),
    options: z.array(z.string()).optional(),
  })),
  layout: z.object({
    columns: z.number().optional(),
    spacing: z.number().optional(),
    alignment: z.enum(['left', 'center', 'right']).optional(),
  }).optional(),
});

export type UIComponent = z.infer<typeof UIComponentSchema>;

export async function processPrompt(prompt: string): Promise<UIComponent> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that converts natural language descriptions into UI component specifications.
          You should output valid JSON that matches the following TypeScript type:
          
          type UIComponent = {
            type: 'form' | 'table' | 'chart' | 'list' | 'card';
            fields: {
              name: string;
              type: 'text' | 'number' | 'email' | 'password' | 'date' | 'select';
              label: string;
              required?: boolean;
              options?: string[];
            }[];
            layout?: {
              columns?: number;
              spacing?: number;
              alignment?: 'left' | 'center' | 'right';
            };
          }
          
          Only output the JSON, nothing else.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error("No response from OpenAI");

    // Parse and validate the response
    const parsedResponse = JSON.parse(response);
    return UIComponentSchema.parse(parsedResponse);
  } catch (error) {
    console.error('Error processing prompt:', error);
    throw error;
  }
}

export async function generateApiEndpoints(schema: UIComponent): Promise<string> {
  // Implementation for generating API endpoints based on the UI schema
  // This will be implemented later
  return "";
} 