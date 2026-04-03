import { CalendarPlus, UserPlus, Stethoscope, FileBarChart, Receipt, BedDouble } from "lucide-react";

const actions = [
  { icon: CalendarPlus, label: "New Appointment", color: "bg-accent/10 text-accent" },
  { icon: UserPlus, label: "Register Patient", color: "bg-success/10 text-success" },
  { icon: Stethoscope, label: "Add Doctor", color: "bg-accent/10 text-accent" },
  { icon: FileBarChart, label: "Generate Report", color: "bg-warning/10 text-warning" },
  { icon: Receipt, label: "New Invoice", color: "bg-success/10 text-success" },
  { icon: BedDouble, label: "Bed Allocation", color: "bg-accent/10 text-accent" },
];

export const QuickActions = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-4">
    <h3 className="font-heading font-semibold mb-4">Quick Actions</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {actions.map((a) => (
        <button
          key={a.label}
          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:shadow-md hover:border-accent/30 transition-all group"
        >
          <div className={`w-10 h-10 rounded-lg ${a.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <a.icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-center">{a.label}</span>
        </button>
      ))}
    </div>
  </div>
);
