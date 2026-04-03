import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { departments, doctors, patients } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Baby, Bone, Ribbon, Scissors, Ear, ScanLine, Siren, Stethoscope, ArrowLeft, Users, BedDouble } from "lucide-react";
import { useParams } from "react-router-dom";
import { StatusBadge } from "@/components/shared/StatusBadge";

const iconMap: Record<string, any> = { Heart, Brain, Baby, Bone, Ribbon, Scissors, Ear, ScanLine, Siren, Stethoscope, Scan: ScanLine };

const Departments = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <PageHeader title="Departments" subtitle={`${departments.length} departments`} breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Departments" }]} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map(dept => {
          const Icon = iconMap[dept.icon] || Stethoscope;
          const occupancy = Math.round((dept.occupied / dept.totalBeds) * 100);
          return (
            <Card key={dept.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/departments/${dept.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-accent" /></div>
                  <div className="min-w-0"><h3 className="font-heading font-semibold truncate">{dept.name}</h3><p className="text-xs text-muted-foreground">{dept.headDoctor}</p></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-muted-foreground" /><span>{dept.totalDoctors} Doctors</span></div>
                  <div className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-muted-foreground" /><span>{dept.totalBeds} Beds</span></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Occupancy</span><span className="font-medium">{occupancy}%</span></div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${occupancy > 85 ? "bg-destructive" : occupancy > 60 ? "bg-warning" : "bg-success"}`} style={{ width: `${occupancy}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default Departments;

// ─── Department Detail ─────────────────────────────────
export const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dept = departments.find(d => d.id === id);

  if (!dept) return <AppLayout><div className="text-center py-16"><h2 className="font-heading text-xl">Department not found</h2><Button variant="outline" className="mt-4" onClick={() => navigate("/departments")}>Back</Button></div></AppLayout>;

  const deptDoctors = doctors.filter(d => d.department === dept.name);
  const deptPatients = patients.filter(p => p.admitted);
  const occupancy = Math.round((dept.occupied / dept.totalBeds) * 100);

  return (
    <AppLayout>
      <PageHeader title={dept.name} subtitle={dept.description}
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Departments", href: "/departments" }, { label: dept.name }]}
        action={<Button variant="outline" size="sm" onClick={() => navigate("/departments")}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold">{dept.totalDoctors}</p><p className="text-xs text-muted-foreground">Doctors</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold">{dept.totalBeds}</p><p className="text-xs text-muted-foreground">Total Beds</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold">{dept.occupied}</p><p className="text-xs text-muted-foreground">Occupied</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold">{occupancy}%</p><p className="text-xs text-muted-foreground">Occupancy</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardContent className="pt-6">
          <h3 className="font-heading font-semibold mb-3">Doctors</h3>
          <div className="space-y-2">{deptDoctors.map(d => (
            <div key={d.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 cursor-pointer" onClick={() => navigate(`/doctors/${d.id}`)}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">{d.name.replace("Dr. ", "").split(" ").map(n => n[0]).join("")}</div>
                <div><p className="text-sm font-medium">{d.name}</p><p className="text-xs text-muted-foreground">{d.specialty}</p></div>
              </div>
              <StatusBadge status={d.status} />
            </div>
          ))}</div>
        </CardContent></Card>
        <Card><CardContent className="pt-6">
          <h3 className="font-heading font-semibold mb-3">Admitted Patients</h3>
          <div className="space-y-2">{deptPatients.slice(0, 8).map(p => (
            <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 cursor-pointer" onClick={() => navigate(`/patients/${p.id}`)}>
              <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.condition}</p></div>
              <StatusBadge status={p.status} />
            </div>
          ))}</div>
        </CardContent></Card>
      </div>
    </AppLayout>
  );
};
