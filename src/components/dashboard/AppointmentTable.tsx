import { appointments, AppointmentStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const statusStyles: Record<AppointmentStatus, string> = {
  Confirmed: "bg-accent/10 text-accent border-accent/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-success/10 text-success border-success/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "No-show": "bg-muted text-muted-foreground border-border",
};

export const AppointmentTable = () => {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayAppts = appointments.filter(a => a.date === todayStr).slice(0, 10);

  return (
    <div className="bg-card rounded-xl border border-border shadow-md">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold">Recent Appointments</h3>
      </div>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left p-3 font-medium">Patient</th>
              <th className="text-left p-3 font-medium">Doctor</th>
              <th className="text-left p-3 font-medium">Dept</th>
              <th className="text-left p-3 font-medium">Time</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todayAppts.map((a) => (
              <tr key={a.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium">{a.patient}</td>
                <td className="p-3 text-muted-foreground">{a.doctor}</td>
                <td className="p-3 text-muted-foreground">{a.department}</td>
                <td className="p-3 text-muted-foreground">{a.time}</td>
                <td className="p-3">
                  <Badge variant="outline" className={cn("text-xs", statusStyles[a.status])}>{a.status}</Badge>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><XCircle className="w-3.5 h-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border/50">
        {appointments.map((a) => (
          <div key={a.id} className="p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{a.patient}</span>
              <Badge variant="outline" className={cn("text-xs", statusStyles[a.status])}>{a.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{a.doctor} · {a.department} · {a.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
