import { HTMLAttributes, forwardRef } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: "white" | "sage" | "blush" | "gray";
}

const bgStyles: Record<string, string> = {
  white: "bg-white",
  sage: "bg-sage-50",
  blush: "bg-blush-50",
  gray: "bg-gray-50",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ background = "white", className = "", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`py-20 md:py-24 lg:py-28 ${bgStyles[background]} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
export { Section };
export type { SectionProps };
