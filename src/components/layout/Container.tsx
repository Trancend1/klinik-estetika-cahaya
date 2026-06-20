import { HTMLAttributes, forwardRef } from "react";

type ContainerContext = "public" | "crm";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  context?: ContainerContext;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ context = "public", className = "", children, ...props }, ref) => {
    const width = context === "public"
      ? "max-w-7xl mx-auto px-5 md:px-8 lg:px-10"
      : "max-w-full";

    return (
      <div ref={ref} className={`${width} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
export { Container };
export type { ContainerProps, ContainerContext };
