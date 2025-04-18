'use client';

import { useState } from 'react';
import { DynamicComponent } from '@/components/ui/DynamicComponent';
import { processPrompt, type UIComponent } from '@/lib/ai/promptHandler';
import { generateDatabaseSchema, type DatabaseSchemaType } from '@/lib/ai/schemaGenerator';
import { SchemaVisualizer } from '@/components/ui/SchemaVisualizer';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedComponent, setGeneratedComponent] = useState<UIComponent | null>(null);
  const [generatedSchema, setGeneratedSchema] = useState<DatabaseSchemaType | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Generate both UI component and database schema
      const [component, schema] = await Promise.all([
        processPrompt(prompt),
        generateDatabaseSchema(prompt)
      ]);
      
      setGeneratedComponent(component);
      setGeneratedSchema(schema);
      
      // In a real app, this would save to a database and return a real ID
      setPreviewId('demo-preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!previewId) return;
    
    const url = `${window.location.origin}/preview/${previewId}`;
    navigator.clipboard.writeText(url);
    alert('Preview link copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <Navbar />
      <div className="flex-grow bg-gradient-to-b from-sky-100/50 via-blue-50/30 to-white">
        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Turn your ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              products
            </span>
            , in minutes.
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            The first all-in-one AI platform to easily build fully functioning apps - without coding.
          </p>

          {/* Prompt Input Section */}
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-lg font-medium text-gray-900 mb-4">
                  Describe your application
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 px-4 py-3 text-lg border-2 border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200 bg-white/90"
                  placeholder="e.g., Create a task management app with projects, tasks, and user assignments"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !prompt}
                className={`w-full py-4 px-6 text-lg font-medium rounded-lg transition duration-200 ${
                  loading || !prompt
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white transform hover:scale-105'
                }`}
              >
                {loading ? 'Generating...' : 'Generate Application'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Generated Content */}
          {(generatedComponent || generatedSchema) && (
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Share Button */}
              {previewId && (
                <div className="flex justify-center">
                  <button
                    onClick={handleShare}
                    className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition duration-200 flex items-center space-x-2"
                  >
                    <span>Share Preview</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Schema Preview */}
              {generatedSchema && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Database Schema</h2>
                  <SchemaVisualizer schema={generatedSchema} />
                </div>
              )}

              {/* UI Preview */}
              {generatedComponent && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">UI Preview</h2>
                  <DynamicComponent schema={generatedComponent} />
                </div>
              )}
            </div>
          )}

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition duration-200">
              <h3 className="text-xl font-semibold mb-4 text-sky-900">AI-Powered Generation</h3>
              <p className="text-gray-600">Transform natural language into fully functional UI components instantly.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition duration-200">
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Database Schema</h3>
              <p className="text-gray-600">Automatically generate and visualize your database structure.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition duration-200">
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Instant Preview</h3>
              <p className="text-gray-600">See your components and schema come to life in real-time.</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
