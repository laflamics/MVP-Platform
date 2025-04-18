'use client';

import { useEffect, useState } from 'react';
import { DynamicComponent } from '@/components/ui/DynamicComponent';
import { SchemaVisualizer } from '@/components/ui/SchemaVisualizer';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import type { UIComponent } from '@/lib/ai/promptHandler';
import type { DatabaseSchemaType } from '@/lib/ai/schemaGenerator';

// In real app, this would come from a database
const mockData = {
  prompt: "Create a task management app with projects, tasks, and user assignments",
  component: {
    type: "form",
    fields: [
      {
        name: "title",
        type: "text",
        label: "Task Title",
        required: true
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        required: false
      },
      {
        name: "dueDate",
        type: "date",
        label: "Due Date",
        required: true
      },
      {
        name: "assignee",
        type: "select",
        label: "Assign To",
        required: true,
        options: ["John Doe", "Jane Smith", "Bob Johnson"]
      }
    ],
    layout: {
      columns: 1,
      spacing: 4,
      alignment: "left"
    }
  },
  schema: {
    tables: [
      {
        name: "Project",
        fields: [
          {
            name: "id",
            type: "string",
            required: true,
            unique: true
          },
          {
            name: "name",
            type: "string",
            required: true
          },
          {
            name: "description",
            type: "string",
            required: false
          }
        ],
        timestamps: true
      },
      {
        name: "Task",
        fields: [
          {
            name: "id",
            type: "string",
            required: true,
            unique: true
          },
          {
            name: "title",
            type: "string",
            required: true
          },
          {
            name: "description",
            type: "string",
            required: false
          },
          {
            name: "dueDate",
            type: "date",
            required: true
          },
          {
            name: "project",
            type: "relation",
            required: true,
            relationWith: "Project",
            relationtype: "oneToMany"
          }
        ],
        timestamps: true
      }
    ]
  }
};

export default function PreviewPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    prompt: string;
    component: UIComponent;
    schema: DatabaseSchemaType;
  } | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData as any);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-2xl text-sky-600">Loading preview...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-2xl text-red-600">
            {error || 'Preview not found'}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <Navbar />
      <div className="flex-grow bg-gradient-to-b from-sky-100/50 via-blue-50/30 to-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Prompt Display */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Generated Application Preview</h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold text-sky-900 mb-2">Prompt</h2>
              <p className="text-gray-700">{data.prompt}</p>
            </div>
          </div>

          <div className="space-y-12">
            {/* Schema Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Database Schema</h2>
              <SchemaVisualizer schema={data.schema} />
            </div>

            {/* UI Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">UI Preview</h2>
              <DynamicComponent schema={data.component} />
            </div>

            {/* Code Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Code</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-sky-900 mb-2">Prisma Schema</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    {`model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  tasks       Task[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  dueDate     DateTime
  project     Project  @relation(fields: [projectId], references: [id])
  projectId   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-sky-900 mb-2">React Component</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    {`export const TaskForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <input
          {...register("title")}
          type="text"
          placeholder="Task Title"
          required
        />
        <textarea
          {...register("description")}
          placeholder="Description"
        />
        <input
          {...register("dueDate")}
          type="date"
          required
        />
        <select {...register("assignee")} required>
          <option value="">Select Assignee</option>
          <option value="john">John Doe</option>
          <option value="jane">Jane Smith</option>
          <option value="bob">Bob Johnson</option>
        </select>
        <button type="submit">
          Create Task
        </button>
      </div>
    </form>
  );
};`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
} 