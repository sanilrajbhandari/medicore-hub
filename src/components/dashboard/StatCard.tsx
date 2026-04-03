import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  sparkData?: { v: number }[];
  subtitle?: string;
  progress?: { value: number; label: string };
  breakdown?: { label: string; value: number; color: string }[];
}

export const StatCard = ({ title, value, icon, change, sparkData, subtitle, progress, breakdown }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-md p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-heading font-bold mt-1">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2">
          {sparkData && (
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}>
                  <Line type="monotone" dataKey="v" stroke="hsl(var(--accent))" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <span className={cn("flex items-center gap-1 text-xs font-medium", change >= 0 ? "text-success" : "text-destructive")}>
            {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </span>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      )}

      {progress && (
        <div className="space-y-1.5">
          <Progress value={progress.value} className="h-2" />
          <p className="text-xs text-muted-foreground">{progress.label}</p>
        </div>
      )}

      {breakdown && (
        <div className="flex gap-3">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
              <span className="text-xs text-muted-foreground">{b.label}: <strong className="text-foreground">{b.value}</strong></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
