import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SlideDrawer } from "@/components/shared/SlideDrawer";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { patients, Patient } from "@/data/mockData";
import { Plus, Search, ChevronLeft, ChevronRight, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const PER_PAGE = 10;

const Patients = () => {
  const navigate = useNavigate();
  const [allPatients, setAllPatients] = useState<Patient[]>(patients);
  const [search, setSearch] = useState("");
  const [filterBlood, setFilterBlood] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);

  const filtered = useMemo(() => {
    return allPatients.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search);
      const matchBlood = filterBlood === "all" || p.bloodGroup === filterBlood;
      const matchStatus = filterStatus === "all" || p.status === filterStatus;
      return matchSearch && matchBlood && matchStatus;
    });
  }, [allPatients, search, filterBlood, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openRegister = () => { setEditPatient(null); setDrawerOpen(true); };
  const openEdit = (p: Patient) => { setEditPatient(p); setDrawerOpen(true); };

  const handleSave = (p: Patient) => {
    if (editPatient) {
      setAllPatients(prev => prev.map(x => x.id === p.id ? p : x));
    } else {
      setAllPatients(prev => [p, ...prev]);
    }
    setDrawerOpen(false);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Patients"
        subtitle={`${filtered.length} patients found`}
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Patients" }]}
        action={<Button onClick={openRegister} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="w-4 h-4 mr-1" /> Register New Patient</Button>}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, ID, phone..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Select value={filterBlood} onValueChange={(v) => { setFilterBlood(v); setPage(1); }}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Blood Group" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Blood</SelectItem>
            {BLOOD_GROUPS.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setPage(1); }}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Admitted">Admitted</SelectItem>
            <SelectItem value="Discharged">Discharged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <EmptyState title="No patients found" description="Try adjusting your search or filters" />
      ) : (
        <>
          <div className="bg-card rounded-xl border border-border shadow-md overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground bg-muted/30">
                  <th className="text-left p-3 font-medium">ID</th>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Age/Gender</th>
                  <th className="text-left p-3 font-medium">Blood</th>
                  <th className="text-left p-3 font-medium">Contact</th>
                  <th className="text-left p-3 font-medium">Registered</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr></thead>
                <tbody>
                  {paginated.map(p => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/patients/${p.id}`)}>
                      <td className="p-3 text-muted-foreground text-xs font-mono">{p.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                            {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="font-medium">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{p.age}y / {p.gender}</td>
                      <td className="p-3"><span className="px-1.5 py-0.5 bg-destructive/10 text-destructive text-xs rounded font-medium">{p.bloodGroup}</span></td>
                      <td className="p-3 text-muted-foreground">{p.phone}</td>
                      <td className="p-3 text-muted-foreground text-xs">{p.registeredDate}</td>
                      <td className="p-3"><StatusBadge status={p.status} /></td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openEdit(p); }}>Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile */}
            <div className="lg:hidden divide-y divide-border/50">
              {paginated.map(p => (
                <div key={p.id} className="p-3 space-y-1 cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/patients/${p.id}`)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                        {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-medium text-sm">{p.name}</span>
                        <p className="text-xs text-muted-foreground">{p.id} · {p.age}y · {p.bloodGroup}</p>
                      </div>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">
                Showing {(page - 1) * PER_PAGE + 1}-{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft className="w-4 h-4" /></Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
                  <Button key={n} variant={n === page ? "default" : "outline"} size="icon" className={cn("h-8 w-8", n === page && "bg-accent text-accent-foreground")} onClick={() => setPage(n)}>{n}</Button>
                ))}
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>
          )}
        </>
      )}

      <PatientDrawer open={drawerOpen} onOpenChange={setDrawerOpen} patient={editPatient} onSave={handleSave} />
    </AppLayout>
  );
};

// ─── Registration / Edit Drawer ────────────────────────
interface DrawerProps { open: boolean; onOpenChange: (o: boolean) => void; patient: Patient | null; onSave: (p: Patient) => void; }

const PatientDrawer = ({ open, onOpenChange, patient, onSave }: DrawerProps) => {
  const [form, setForm] = useState<Partial<Patient>>({});
  const [allergies, setAllergies] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [condInput, setCondInput] = useState("");
  const [dob, setDob] = useState<Date | undefined>();

  useState(() => {
    if (patient) {
      setForm(patient);
      setAllergies(patient.allergies);
      setConditions(patient.chronicConditions);
      setDob(patient.dob ? new Date(patient.dob) : undefined);
    } else {
      setForm({});
      setAllergies([]);
      setConditions([]);
      setDob(undefined);
    }
  });

  const update = (key: keyof Patient, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const age = dob ? Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0;
    const newPatient: Patient = {
      id: patient?.id || `P${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      name: (form.name || ""),
      age,
      dob: dob ? format(dob, "yyyy-MM-dd") : "",
      gender: (form.gender as "Male" | "Female") || "Male",
      bloodGroup: form.bloodGroup || "O+",
      phone: form.phone || "",
      email: form.email || "",
      address: form.address || "",
      emergencyContactName: form.emergencyContactName || "",
      emergencyContactPhone: form.emergencyContactPhone || "",
      allergies,
      chronicConditions: conditions,
      currentMedications: form.currentMedications || [],
      insuranceProvider: form.insuranceProvider || "",
      policyNumber: form.policyNumber || "",
      insuranceExpiry: form.insuranceExpiry || "",
      condition: form.condition || "",
      status: (form.status as any) || "Active",
      registeredDate: patient?.registeredDate || format(new Date(), "yyyy-MM-dd"),
      admitted: form.status === "Admitted",
    };
    onSave(newPatient);
  };

  const addTag = (type: "allergy" | "condition") => {
    if (type === "allergy" && allergyInput.trim()) { setAllergies(prev => [...prev, allergyInput.trim()]); setAllergyInput(""); }
    if (type === "condition" && condInput.trim()) { setConditions(prev => [...prev, condInput.trim()]); setCondInput(""); }
  };

  return (
    <SlideDrawer open={open} onOpenChange={onOpenChange} title={patient ? "Edit Patient" : "Register New Patient"} wide>
      <div className="space-y-6 pb-6">
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Personal Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Full Name *</Label><Input value={form.name || ""} onChange={e => update("name", e.target.value)} placeholder="John Smith" /></div>
            <div>
              <Label>Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />{dob ? format(dob, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dob} onSelect={setDob} className="p-3 pointer-events-auto" /></PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Gender *</Label>
              <Select value={form.gender || ""} onValueChange={v => update("gender", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Blood Group *</Label>
              <Select value={form.bloodGroup || ""} onValueChange={v => update("bloodGroup", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>{BLOOD_GROUPS.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Contact Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Phone *</Label><Input value={form.phone || ""} onChange={e => update("phone", e.target.value)} /></div>
            <div><Label>Email</Label><Input type="email" value={form.email || ""} onChange={e => update("email", e.target.value)} /></div>
            <div className="sm:col-span-2"><Label>Address</Label><Input value={form.address || ""} onChange={e => update("address", e.target.value)} /></div>
            <div><Label>Emergency Contact Name</Label><Input value={form.emergencyContactName || ""} onChange={e => update("emergencyContactName", e.target.value)} /></div>
            <div><Label>Emergency Contact Phone</Label><Input value={form.emergencyContactPhone || ""} onChange={e => update("emergencyContactPhone", e.target.value)} /></div>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Medical Information</h4>
          <div className="space-y-3">
            <div>
              <Label>Known Allergies</Label>
              <div className="flex gap-2"><Input value={allergyInput} onChange={e => setAllergyInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag("allergy"))} placeholder="Type and press Enter" /><Button type="button" variant="outline" size="sm" onClick={() => addTag("allergy")}>Add</Button></div>
              <div className="flex flex-wrap gap-1.5 mt-2">{allergies.map((a, i) => <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded-full">{a}<button onClick={() => setAllergies(prev => prev.filter((_, j) => j !== i))}><X className="w-3 h-3" /></button></span>)}</div>
            </div>
            <div>
              <Label>Chronic Conditions</Label>
              <div className="flex gap-2"><Input value={condInput} onChange={e => setCondInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag("condition"))} placeholder="Type and press Enter" /><Button type="button" variant="outline" size="sm" onClick={() => addTag("condition")}>Add</Button></div>
              <div className="flex flex-wrap gap-1.5 mt-2">{conditions.map((c, i) => <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full">{c}<button onClick={() => setConditions(prev => prev.filter((_, j) => j !== i))}><X className="w-3 h-3" /></button></span>)}</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Insurance Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Provider</Label><Input value={form.insuranceProvider || ""} onChange={e => update("insuranceProvider", e.target.value)} /></div>
            <div><Label>Policy Number</Label><Input value={form.policyNumber || ""} onChange={e => update("policyNumber", e.target.value)} /></div>
            <div><Label>Expiry Date</Label><Input type="date" value={form.insuranceExpiry || ""} onChange={e => update("insuranceExpiry", e.target.value)} /></div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">{patient ? "Update Patient" : "Register Patient"}</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        </div>
      </div>
    </SlideDrawer>
  );
};

export default Patients;
