import { ReactNode } from "react";
import { FileX } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
      {icon || <FileX className="w-6 h-6 text-muted-foreground" />}
    </div>
    <h3 className="font-heading font-semibold text-foreground mb-1">{title}</h3>
    {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);
