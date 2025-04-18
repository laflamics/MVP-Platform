import React from 'react';
import { type UIComponent } from '@/lib/ai/promptHandler';
import { useForm } from 'react-hook-form';

interface DynamicComponentProps {
  schema: UIComponent;
  onSubmit?: (data: any) => void;
}

export const DynamicComponent: React.FC<DynamicComponentProps> = ({
  schema,
  onSubmit = (data) => console.log(data),
}) => {
  const { register, handleSubmit } = useForm();

  const renderField = (field: UIComponent['fields'][0]) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'date':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              {...register(field.name)}
              type={field.type}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <select
              {...register(field.name)}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  const renderComponent = () => {
    switch (schema.type) {
      case 'form':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div
              className={`grid ${
                schema.layout?.columns
                  ? `grid-cols-${schema.layout.columns}`
                  : 'grid-cols-1'
              } gap-${schema.layout?.spacing || 4}`}
            >
              {schema.fields.map(renderField)}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        );
      case 'table':
        // Table implementation will be added later
        return <div>Table Component (Coming Soon)</div>;
      case 'chart':
        // Chart implementation will be added later
        return <div>Chart Component (Coming Soon)</div>;
      case 'list':
        return (
          <div className="space-y-2">
            {schema.fields.map((field) => (
              <div
                key={field.name}
                className="p-4 border border-gray-200 rounded-md"
              >
                <h3 className="font-medium">{field.label}</h3>
                {/* Add list item content here */}
              </div>
            ))}
          </div>
        );
      case 'card':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            {schema.fields.map((field) => (
              <div key={field.name} className="mb-4">
                <h3 className="text-lg font-medium">{field.label}</h3>
                {/* Add card content here */}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full ${
        schema.layout?.alignment === 'center'
          ? 'text-center'
          : schema.layout?.alignment === 'right'
          ? 'text-right'
          : 'text-left'
      }`}
    >
      {renderComponent()}
    </div>
  );
}; 