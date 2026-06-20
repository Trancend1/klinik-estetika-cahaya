import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-crm-label text-gray-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2 border rounded-md text-crm-body bg-white
            focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500
            ${error ? "border-error-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-error-500 text-crm-meta">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export { Select };
export type { SelectProps };
