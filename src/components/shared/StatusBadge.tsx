import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  // Patient
  Active: "bg-success/10 text-success border-success/20",
  Admitted: "bg-accent/10 text-accent border-accent/20",
  Discharged: "bg-muted text-muted-foreground border-border",
  // Appointment
  Confirmed: "bg-accent/10 text-accent border-accent/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-success/10 text-success border-success/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "No-show": "bg-muted text-muted-foreground border-border",
  // Doctor
  Available: "bg-success/10 text-success border-success/20",
  "In Surgery": "bg-accent/10 text-accent border-accent/20",
  "On Leave": "bg-warning/10 text-warning border-warning/20",
  // Billing
  Paid: "bg-success/10 text-success border-success/20",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
  // Bed
  Occupied: "bg-destructive/10 text-destructive border-destructive/20",
  Maintenance: "bg-warning/10 text-warning border-warning/20",
  Reserved: "bg-accent/10 text-accent border-accent/20",
  // Types
  "In-Person": "bg-accent/10 text-accent border-accent/20",
  Video: "bg-success/10 text-success border-success/20",
  Emergency: "bg-destructive/10 text-destructive border-destructive/20",
};

export const StatusBadge = ({ status, className }: { status: string; className?: string }) => (
  <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", statusColors[status] || "bg-muted text-muted-foreground border-border", className)}>
    {status}
  </span>
);
