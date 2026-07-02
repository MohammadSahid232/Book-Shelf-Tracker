import React from 'react';

export default function Form({ onSubmit, fields, submitText }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center w-full space-y-6">
      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name} className="mb-2 text-slate-900 font-bold text-sm inline-block">
            {field.label}
          </label>
          <input
            type={field.type || 'text'}
            id={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            className="px-2.5 py-2 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 border border-gray-300"
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary w-full">
        {submitText}
      </button>
    </form>
  );
}
