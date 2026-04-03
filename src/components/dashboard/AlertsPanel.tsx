import { alerts } from "@/data/mockData";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  danger: { icon: AlertCircle, cls: "text-destructive bg-destructive/10" },
  warning: { icon: AlertTriangle, cls: "text-warning bg-warning/10" },
  info: { icon: Info, cls: "text-accent bg-accent/10" },
};

export const AlertsPanel = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-4">
    <h3 className="font-heading font-semibold mb-4">Alerts & Notifications</h3>
    <div className="space-y-2 max-h-72 overflow-y-auto">
      {alerts.map((a) => {
        const { icon: Icon, cls } = iconMap[a.type];
        return (
          <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", cls)}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm">{a.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
