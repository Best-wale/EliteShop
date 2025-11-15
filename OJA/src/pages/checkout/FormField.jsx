import React from "react";

function FormField({ label, name, type = "text", placeholder = "" }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
      />
    </div>
  );
}

export default FormField;
