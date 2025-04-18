import React from 'react';
import type { DatabaseSchemaType } from '@/lib/ai/schemaGenerator';

interface SchemaVisualizerProps {
  schema: DatabaseSchemaType;
}

export const SchemaVisualizer: React.FC<SchemaVisualizerProps> = ({ schema }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schema.tables.map((table) => (
        <div
          key={table.name}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-200"
        >
          <div className="border-b border-sky-100 pb-4 mb-4">
            <h3 className="text-xl font-semibold text-sky-900">{table.name}</h3>
          </div>
          
          <div className="space-y-3">
            {table.fields.map((field) => (
              <div key={field.name} className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{field.name}</p>
                  <p className="text-sm text-gray-500">
                    {field.type}
                    {field.relationWith ? ` → ${field.relationWith}` : ''}
                    {field.required ? ' (required)' : ''}
                    {field.unique ? ' (unique)' : ''}
                  </p>
                </div>
                {field.default !== undefined && (
                  <span className="text-sm text-gray-500">
                    Default: {String(field.default)}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {table.timestamps && (
            <div className="mt-4 pt-4 border-t border-sky-100">
              <p className="text-sm text-gray-500">Includes timestamps</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 