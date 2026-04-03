import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { patients, medicalRecords, prescriptions, labResults, invoices, appointments, generateVitals } from "@/data/mockData";
import { ArrowLeft, Edit, UserCheck, UserMinus, Phone, Mail, MapPin, Shield, AlertTriangle, Pill, FileText, TestTube, DollarSign, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find(p => p.id === id);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!patient) return <AppLayout><div className="text-center py-16"><h2 className="font-heading text-xl">Patient not found</h2><Button variant="outline" className="mt-4" onClick={() => navigate("/patients")}>Back to Patients</Button></div></AppLayout>;

  const records = medicalRecords.filter(r => r.patientId === id);
  const rxs = prescriptions.filter(r => r.patientId === id);
  const labs = labResults.filter(r => r.patientId === id);
  const bills = invoices.filter(r => r.patientId === id);
  const appts = appointments.filter(a => a.patientId === id);
  const vitals = generateVitals(id!);

  return (
    <AppLayout>
      <PageHeader
        title=""
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Patients", href: "/patients" }, { label: patient.name }]}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/patients")}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"><Edit className="w-4 h-4 mr-1" /> Edit</Button>
            <Button size="sm" variant={patient.admitted ? "destructive" : "default"} onClick={() => setConfirmOpen(true)}>
              {patient.admitted ? <><UserMinus className="w-4 h-4 mr-1" /> Discharge</> : <><UserCheck className="w-4 h-4 mr-1" /> Admit</>}
            </Button>
          </div>
        }
      />

      {/* Hero */}
      <div className="bg-card rounded-xl border border-border shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-2xl font-bold text-accent shrink-0">
            {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-xl font-bold text-foreground">{patient.name}</h2>
            <div className="flex flex-wrap gap-2 mt-1.5">
              <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{patient.id}</span>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded font-medium">{patient.bloodGroup}</span>
              <StatusBadge status={patient.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{patient.age}y · {patient.gender} · {patient.condition}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-heading flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> Contact</CardTitle></CardHeader><CardContent className="text-sm space-y-1.5">
              <p><span className="text-muted-foreground">Phone:</span> {patient.phone}</p>
              <p><span className="text-muted-foreground">Email:</span> {patient.email}</p>
              <p><span className="text-muted-foreground">Address:</span> {patient.address}</p>
            </CardContent></Card>
            <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-heading flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-warning" /> Emergency Contact</CardTitle></CardHeader><CardContent className="text-sm space-y-1.5">
              <p><span className="text-muted-foreground">Name:</span> {patient.emergencyContactName}</p>
              <p><span className="text-muted-foreground">Phone:</span> {patient.emergencyContactPhone}</p>
            </CardContent></Card>
            <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-heading flex items-center gap-2"><Shield className="w-4 h-4 text-success" /> Insurance</CardTitle></CardHeader><CardContent className="text-sm space-y-1.5">
              <p><span className="text-muted-foreground">Provider:</span> {patient.insuranceProvider}</p>
              <p><span className="text-muted-foreground">Policy:</span> {patient.policyNumber}</p>
              <p><span className="text-muted-foreground">Expires:</span> {patient.insuranceExpiry}</p>
            </CardContent></Card>
            <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-heading flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-destructive" /> Allergies</CardTitle></CardHeader><CardContent>
              {patient.allergies.length ? <div className="flex flex-wrap gap-1">{patient.allergies.map((a, i) => <span key={i} className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded-full">{a}</span>)}</div> : <p className="text-sm text-muted-foreground">None reported</p>}
            </CardContent></Card>
            <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-heading flex items-center gap-2"><Activity className="w-4 h-4 text-warning" /> Conditions</CardTitle></CardHeader><CardContent>
              {patient.chronicConditions.length ? <div className="flex flex-wrap gap-1">{patient.chronicConditions.map((c, i) => <span key={i} className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full">{c}</span>)}</div> : <p className="text-sm text-muted-foreground">None reported</p>}
            </CardContent></Card>
            <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-heading flex items-center gap-2"><Pill className="w-4 h-4 text-accent" /> Current Medications</CardTitle></CardHeader><CardContent>
              {patient.currentMedications.length ? <div className="space-y-1">{patient.currentMedications.map((m, i) => <p key={i} className="text-sm">{m}</p>)}</div> : <p className="text-sm text-muted-foreground">None</p>}
            </CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card><CardContent className="pt-6">
            {records.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No medical records</p> : (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {records.map(r => (
                  <div key={r.id} className="relative">
                    <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-card" />
                    <div className="text-xs text-muted-foreground mb-0.5">{r.date} · {r.type}</div>
                    <p className="text-sm font-medium">{r.description}</p>
                    <p className="text-xs text-muted-foreground">{r.doctor}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card><CardContent className="pt-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-muted-foreground"><th className="text-left p-2 font-medium">Date</th><th className="text-left p-2 font-medium">Time</th><th className="text-left p-2 font-medium">Doctor</th><th className="text-left p-2 font-medium">Status</th></tr></thead>
              <tbody>{appts.slice(0, 20).map(a => <tr key={a.id} className="border-b border-border/50"><td className="p-2">{a.date}</td><td className="p-2">{a.time}</td><td className="p-2">{a.doctor}</td><td className="p-2"><StatusBadge status={a.status} /></td></tr>)}</tbody>
            </table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <div className="space-y-3">
            {rxs.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No prescriptions</p> : rxs.map(rx => (
              <Card key={rx.id}><CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div><p className="text-sm font-medium">{rx.date}</p><p className="text-xs text-muted-foreground">{rx.doctor}</p></div>
                  <Button variant="outline" size="sm"><FileText className="w-3.5 h-3.5 mr-1" /> PDF</Button>
                </div>
                <div className="space-y-1">{rx.medicines.map((m, i) => <p key={i} className="text-sm">{m.name} — {m.dosage} ({m.duration})</p>)}</div>
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="labs">
          <Card><CardContent className="pt-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-muted-foreground"><th className="text-left p-2 font-medium">Test</th><th className="text-left p-2 font-medium">Date</th><th className="text-left p-2 font-medium">Status</th><th className="text-left p-2 font-medium">Result</th></tr></thead>
              <tbody>{labs.map(l => <tr key={l.id} className="border-b border-border/50"><td className="p-2 font-medium">{l.testName}</td><td className="p-2">{l.date}</td><td className="p-2"><StatusBadge status={l.status} /></td><td className="p-2 text-muted-foreground">{l.result || "—"}</td></tr>)}</tbody>
            </table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card><CardContent className="pt-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-muted-foreground"><th className="text-left p-2 font-medium">Invoice</th><th className="text-left p-2 font-medium">Date</th><th className="text-left p-2 font-medium">Description</th><th className="text-right p-2 font-medium">Amount</th><th className="text-left p-2 font-medium">Status</th></tr></thead>
              <tbody>{bills.map(b => <tr key={b.id} className="border-b border-border/50"><td className="p-2 font-mono text-xs">{b.id}</td><td className="p-2">{b.date}</td><td className="p-2">{b.description}</td><td className="p-2 text-right font-medium">${b.amount.toLocaleString()}</td><td className="p-2"><StatusBadge status={b.status} /></td></tr>)}</tbody>
            </table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="vitals">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { title: "Blood Pressure", keys: [{ k: "systolic", color: "hsl(var(--destructive))" }, { k: "diastolic", color: "hsl(var(--accent))" }] },
              { title: "Heart Rate", keys: [{ k: "heartRate", color: "hsl(var(--accent))" }] },
              { title: "Temperature (°F)", keys: [{ k: "temperature", color: "hsl(var(--warning))" }] },
              { title: "Weight (lbs)", keys: [{ k: "weight", color: "hsl(var(--success))" }] },
            ].map(chart => (
              <Card key={chart.title}><CardHeader className="pb-2"><CardTitle className="text-sm font-heading">{chart.title}</CardTitle></CardHeader><CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitals}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                      <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" />
                      <Tooltip />
                      {chart.keys.map(kk => <Line key={kk.k} type="monotone" dataKey={kk.k} stroke={kk.color} strokeWidth={2} dot={false} />)}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ConfirmDialog open={confirmOpen} onOpenChange={setConfirmOpen} title={patient.admitted ? "Discharge Patient" : "Admit Patient"} description={`Are you sure you want to ${patient.admitted ? "discharge" : "admit"} ${patient.name}?`} confirmLabel={patient.admitted ? "Discharge" : "Admit"} onConfirm={() => setConfirmOpen(false)} />
    </AppLayout>
  );
};

export default PatientDetail;
