import { HTMLAttributes, forwardRef } from "react";

type CardVariant = "default" | "service" | "testimonial" | "stat";
type CardContext = "public" | "crm";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  context?: CardContext;
}

const contextStyles: Record<CardContext, string> = {
  public: "rounded-2xl",
  crm: "rounded-lg",
};

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white border border-gray-300",
  service: "bg-white border border-gray-300",
  testimonial: "bg-blush-50 border border-gray-300",
  stat: "bg-white border border-gray-300",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", context = "public", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${contextStyles[context]}
          ${variant === "stat" ? "p-5" : "p-6"}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export { Card };
export type { CardProps, CardVariant, CardContext };
