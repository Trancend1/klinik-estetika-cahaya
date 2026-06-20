import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Context = "public" | "crm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  context?: Context;
}

const variantStyles: Record<Context, Record<Variant, string>> = {
  public: {
    primary:
      "bg-sage-500 text-white hover:bg-sage-700 focus:ring-sage-300",
    secondary:
      "bg-white text-sage-700 border border-sage-300 hover:bg-sage-50 focus:ring-sage-300",
    ghost:
      "bg-transparent text-sage-700 hover:bg-sage-50 focus:ring-sage-300",
  },
  crm: {
    primary:
      "bg-sage-500 text-white hover:bg-sage-700 focus:ring-sage-300",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", context = "public", className = "", children, ...props }, ref) => {
    const radius = context === "public" ? "rounded-full" : "rounded-md";
    const base = context === "public" ? "px-6 py-3 text-base" : "px-4 py-2 text-crm-body";

    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-medium
          ${base} ${radius}
          focus:outline-none focus:ring-2 focus:ring-offset-2
          transition-colors duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[context][variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps, Variant, Context };
