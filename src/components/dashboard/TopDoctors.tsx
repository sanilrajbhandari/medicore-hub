import { doctors } from "@/data/mockData";
import { Star } from "lucide-react";

export const TopDoctors = () => {
  const sorted = [...doctors].sort((a, b) => b.patientsToday - a.patientsToday).slice(0, 5);

  return (
    <div className="bg-card rounded-xl border border-border shadow-md p-4">
      <h3 className="font-heading font-semibold mb-4">Top Performing Doctors</h3>
      <div className="space-y-3">
        {sorted.map((d) => (
          <div key={d.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent shrink-0">
              {d.name.split(" ").slice(1).map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.specialty}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold">{d.patientsToday}</p>
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-warning fill-warning" />
                <span className="text-xs text-muted-foreground">{d.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
