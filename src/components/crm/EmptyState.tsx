import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {Icon && <Icon className="w-12 h-12 text-gray-300 mx-auto mb-3" />}
      {title && <h3 className="text-crm-section text-gray-900 mb-1">{title}</h3>}
      <p className="text-gray-500 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" context="crm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
