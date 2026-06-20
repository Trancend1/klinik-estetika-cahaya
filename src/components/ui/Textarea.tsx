import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-crm-label text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2 border rounded-md text-crm-body resize-y min-h-[80px]
            focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500
            ${error ? "border-error-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-error-500 text-crm-meta">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
export type { TextareaProps };
