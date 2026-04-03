import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { admissionTrend, revenueExpenses, departments } from "@/data/mockData";

export const DepartmentOccupancy = () => {
  const data = departments.map((d) => ({
    name: d.name.length > 10 ? d.name.slice(0, 10) + "…" : d.name,
    occupancy: Math.round((d.occupied / d.totalBeds) * 100),
  }));

  return (
    <div className="bg-card rounded-xl border border-border shadow-md p-4">
      <h3 className="font-heading font-semibold mb-4">Department Occupancy</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={12} />
            <YAxis type="category" dataKey="name" width={80} fontSize={11} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar dataKey="occupancy" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const AdmissionTrendChart = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-4">
    <h3 className="font-heading font-semibold mb-4">Patient Admission Trend</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={admissionTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" fontSize={10} tickLine={false} interval={4} />
          <YAxis fontSize={11} tickLine={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="admissions" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="discharges" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const RevenueExpensesChart = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-4">
    <h3 className="font-heading font-semibold mb-4">Revenue vs Expenses</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueExpenses} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="expenses" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
