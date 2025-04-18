import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const DatabaseFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'date', 'enum', 'relation']),
  required: z.boolean(),
  unique: z.boolean().optional(),
  default: z.any().optional(),
  relationWith: z.string().optional(),
  relationtype: z.enum(['oneToOne', 'oneToMany', 'manyToMany']).optional(),
});

const TableSchema = z.object({
  name: z.string(),
  fields: z.array(DatabaseFieldSchema),
  timestamps: z.boolean().optional(),
});

export const DatabaseSchema = z.object({
  tables: z.array(TableSchema),
});

export type DatabaseSchemaType = z.infer<typeof DatabaseSchema>;

export async function generateDatabaseSchema(prompt: string): Promise<DatabaseSchemaType> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a database architect that converts natural language descriptions into database schemas.
          You should output valid JSON that matches the following TypeScript type:
          
          type DatabaseSchema = {
            tables: {
              name: string;
              fields: {
                name: string;
                type: 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'relation';
                required: boolean;
                unique?: boolean;
                default?: any;
                relationWith?: string;
                relationtype?: 'oneToOne' | 'oneToMany' | 'manyToMany';
              }[];
              timestamps?: boolean;
            }[];
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

    const parsedResponse = JSON.parse(response);
    return DatabaseSchema.parse(parsedResponse);
  } catch (error) {
    console.error('Error generating database schema:', error);
    throw error;
  }
}

export function generatePrismaSchema(schema: DatabaseSchemaType): string {
  let prismaSchema = `// This is your Prisma schema file\n\n`;
  prismaSchema += `generator client {\n  provider = "prisma-client-js"\n}\n\n`;
  prismaSchema += `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\n`;

  schema.tables.forEach((table) => {
    prismaSchema += `model ${table.name} {\n`;
    
    table.fields.forEach((field) => {
      let fieldLine = `  ${field.name} `;
      
      if (field.type === 'relation') {
        fieldLine += `${field.relationWith}`;
        if (field.relationtype === 'oneToMany' || field.relationtype === 'manyToMany') {
          fieldLine += '[]';
        }
      } else {
        fieldLine += field.type;
      }
      
      if (field.required) fieldLine += ' @id @default(cuid())';
      if (field.unique) fieldLine += ' @unique';
      if (field.default !== undefined) fieldLine += ` @default(${field.default})`;
      
      prismaSchema += fieldLine + '\n';
    });
    
    if (table.timestamps) {
      prismaSchema += '  createdAt DateTime @default(now())\n';
      prismaSchema += '  updatedAt DateTime @updatedAt\n';
    }
    
    prismaSchema += '}\n\n';
  });

  return prismaSchema;
} 