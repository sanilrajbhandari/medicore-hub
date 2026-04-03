import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader = ({ title, subtitle, action, breadcrumbs }: PageHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
    <div>
      {breadcrumbs && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span>/</span>}
              <span className={i === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""}>{b.label}</span>
            </span>
          ))}
        </div>
      )}
      <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
