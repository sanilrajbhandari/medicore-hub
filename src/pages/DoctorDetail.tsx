import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doctors, appointments, patients, reviews } from "@/data/mockData";
import { ArrowLeft, Star, Users, Calendar, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) return <AppLayout><div className="text-center py-16"><h2 className="font-heading text-xl">Doctor not found</h2><Button variant="outline" className="mt-4" onClick={() => navigate("/doctors")}>Back</Button></div></AppLayout>;

  const docAppts = appointments.filter(a => a.doctorId === id);
  const thisMonth = docAppts.filter(a => a.date.startsWith(new Date().toISOString().slice(0, 7))).length;
  const docReviews = reviews.filter(r => r.doctorId === id);
  const docPatients = [...new Set(docAppts.map(a => a.patientId))].map(pid => patients.find(p => p.id === pid)).filter(Boolean);
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  return (
    <AppLayout>
      <PageHeader title="" breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Doctors", href: "/doctors" }, { label: doctor.name }]}
        action={<Button variant="outline" size="sm" onClick={() => navigate("/doctors")}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>} />

      <div className="bg-card rounded-xl border border-border shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-2xl font-bold text-accent shrink-0">
            {doctor.name.replace("Dr. ", "").split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-xl font-bold">{doctor.name}</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{doctor.specialty}</span>
              <span className="text-xs bg-muted px-2 py-0.5 rounded">{doctor.department}</span>
              <StatusBadge status={doctor.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{doctor.experience} years experience · {doctor.qualification}</p>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} className={cn("w-4 h-4", i < Math.floor(doctor.rating) ? "fill-warning text-warning" : "text-muted")} />)}
              <span className="text-sm font-medium ml-1">{doctor.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card><CardContent className="p-4 text-center"><Users className="w-5 h-5 mx-auto mb-1 text-accent" /><p className="text-xl font-bold">{docPatients.length}</p><p className="text-xs text-muted-foreground">Total Patients</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Calendar className="w-5 h-5 mx-auto mb-1 text-accent" /><p className="text-xl font-bold">{doctor.patientsToday}</p><p className="text-xs text-muted-foreground">Today</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Clock className="w-5 h-5 mx-auto mb-1 text-accent" /><p className="text-xl font-bold">{thisMonth}</p><p className="text-xs text-muted-foreground">This Month</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><TrendingUp className="w-5 h-5 mx-auto mb-1 text-accent" /><p className="text-xl font-bold">{doctor.rating}</p><p className="text-xs text-muted-foreground">Avg Rating</p></CardContent></Card>
      </div>

      <Tabs defaultValue="about">
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card><CardContent className="pt-6 space-y-4">
            <div><h4 className="font-heading font-semibold text-sm mb-1">Bio</h4><p className="text-sm text-muted-foreground">{doctor.bio}</p></div>
            <div><h4 className="font-heading font-semibold text-sm mb-1">Qualification</h4><p className="text-sm">{doctor.qualification}</p></div>
            <div><h4 className="font-heading font-semibold text-sm mb-1">Languages</h4><div className="flex gap-1.5">{doctor.languages.map(l => <span key={l} className="px-2 py-0.5 bg-muted text-xs rounded">{l}</span>)}</div></div>
            <div className="grid grid-cols-2 gap-4">
              <div><h4 className="font-heading font-semibold text-sm mb-1">Contact</h4><p className="text-sm text-muted-foreground">{doctor.phone}</p><p className="text-sm text-muted-foreground">{doctor.email}</p></div>
              <div><h4 className="font-heading font-semibold text-sm mb-1">Consultation Fee</h4><p className="text-sm font-semibold">${doctor.consultationFee}</p></div>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card><CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="p-2 text-left font-medium w-16">Time</th>{doctor.workingDays.map(d => <th key={d} className="p-2 text-center font-medium">{d}</th>)}</tr></thead>
                <tbody>{hours.map(h => {
                  const inRange = h >= doctor.startTime && h < doctor.endTime;
                  return (
                    <tr key={h} className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground text-xs">{h}</td>
                      {doctor.workingDays.map(d => <td key={d} className="p-2 text-center"><div className={cn("w-full h-6 rounded", inRange ? "bg-accent/10 border border-accent/20" : "bg-muted/30")} /></td>)}
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card><CardContent className="pt-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-muted-foreground"><th className="text-left p-2 font-medium">Date</th><th className="text-left p-2 font-medium">Time</th><th className="text-left p-2 font-medium">Patient</th><th className="text-left p-2 font-medium">Status</th></tr></thead>
              <tbody>{docAppts.slice(0, 20).map(a => <tr key={a.id} className="border-b border-border/50 cursor-pointer hover:bg-muted/30"><td className="p-2">{a.date}</td><td className="p-2">{a.time}</td><td className="p-2">{a.patient}</td><td className="p-2"><StatusBadge status={a.status} /></td></tr>)}</tbody>
            </table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-3">
            {docReviews.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No reviews yet</p> : docReviews.map(r => (
              <Card key={r.id}><CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">{r.patientName.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                    <div><p className="text-sm font-medium">{r.patientName}</p><p className="text-xs text-muted-foreground">{r.date}</p></div>
                  </div>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={cn("w-3 h-3", i < r.rating ? "fill-warning text-warning" : "text-muted")} />)}</div>
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patients">
          <Card><CardContent className="pt-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-muted-foreground"><th className="text-left p-2 font-medium">Patient</th><th className="text-left p-2 font-medium">Condition</th><th className="text-left p-2 font-medium">Status</th></tr></thead>
              <tbody>{docPatients.map(p => p && <tr key={p.id} className="border-b border-border/50 cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/patients/${p.id}`)}><td className="p-2 font-medium">{p.name}</td><td className="p-2 text-muted-foreground">{p.condition}</td><td className="p-2"><StatusBadge status={p.status} /></td></tr>)}</tbody>
            </table>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default DoctorDetail;
