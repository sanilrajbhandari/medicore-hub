import { Users, Calendar, BedDouble, DollarSign } from "lucide-react";
import { statsData, sparklineData } from "@/data/mockData";
import { StatCard } from "@/components/dashboard/StatCard";
import { AppointmentTable } from "@/components/dashboard/AppointmentTable";
import { DepartmentOccupancy, AdmissionTrendChart, RevenueExpensesChart } from "@/components/dashboard/Charts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TopDoctors } from "@/components/dashboard/TopDoctors";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { AppLayout } from "@/components/layout/AppLayout";

const Dashboard = () => {
  const bedsPercent = Math.round((statsData.bedsAvailable / statsData.bedsTotal) * 100);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Patients Today"
            value={statsData.patientsToday}
            icon={<Users className="w-5 h-5 text-accent" />}
            change={statsData.patientChange}
            sparkData={sparklineData}
            subtitle="vs yesterday"
          />
          <StatCard
            title="Appointments Today"
            value={statsData.appointmentsToday}
            icon={<Calendar className="w-5 h-5 text-accent" />}
            breakdown={[
              { label: "Pending", value: statsData.appointmentBreakdown.pending, color: "hsl(var(--warning))" },
              { label: "Confirmed", value: statsData.appointmentBreakdown.confirmed, color: "hsl(var(--accent))" },
              { label: "Done", value: statsData.appointmentBreakdown.completed, color: "hsl(var(--success))" },
            ]}
          />
          <StatCard
            title="Available Beds"
            value={`${statsData.bedsAvailable} / ${statsData.bedsTotal}`}
            icon={<BedDouble className="w-5 h-5 text-accent" />}
            progress={{ value: bedsPercent, label: `${bedsPercent}% available` }}
          />
          <StatCard
            title="Revenue Today"
            value={`$${statsData.revenueToday.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5 text-accent" />}
            change={statsData.revenueChange}
            sparkData={sparklineData}
            subtitle="vs yesterday"
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AppointmentTable />
          </div>
          <DepartmentOccupancy />
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AdmissionTrendChart />
          <RevenueExpensesChart />
          <TopDoctors />
        </div>

        {/* Fourth Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <QuickActions />
          <AlertsPanel />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
