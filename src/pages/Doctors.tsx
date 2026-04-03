import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SlideDrawer } from "@/components/shared/SlideDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { doctors, Doctor, departments } from "@/data/mockData";
import { Plus, Search, Star, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

const Doctors = () => {
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState<Doctor[]>(doctors);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return allDoctors.filter(d => {
      const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
      const matchDept = filterDept === "all" || d.department === filterDept;
      const matchStatus = filterStatus === "all" || d.status === filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [allDoctors, search, filterDept, filterStatus]);

  return (
    <AppLayout>
      <PageHeader
        title="Doctors"
        subtitle={`${filtered.length} doctors`}
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Doctors" }]}
        action={<Button onClick={() => setDrawerOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="w-4 h-4 mr-1" /> Add Doctor</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterDept} onValueChange={setFilterDept}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="In Surgery">In Surgery</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border border-border rounded-lg overflow-hidden">
          <Button variant={viewMode === "card" ? "default" : "ghost"} size="icon" className={cn("h-9 w-9 rounded-none", viewMode === "card" && "bg-accent text-accent-foreground")} onClick={() => setViewMode("card")}><LayoutGrid className="w-4 h-4" /></Button>
          <Button variant={viewMode === "table" ? "default" : "ghost"} size="icon" className={cn("h-9 w-9 rounded-none", viewMode === "table" && "bg-accent text-accent-foreground")} onClick={() => setViewMode("table")}><List className="w-4 h-4" /></Button>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(d => (
            <div key={d.id} className="bg-card rounded-xl border border-border shadow-md p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-lg font-bold text-accent shrink-0">
                  {d.name.replace("Dr. ", "").split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-semibold text-foreground truncate">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.specialty}</p>
                  <p className="text-xs text-muted-foreground">{d.department} · {d.experience}y exp</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={cn("w-3.5 h-3.5", i < Math.floor(d.rating) ? "fill-warning text-warning" : "text-muted")} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{d.rating}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/doctors/${d.id}`)}>View Profile</Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-muted-foreground bg-muted/30">
              <th className="text-left p-3 font-medium">Doctor</th>
              <th className="text-left p-3 font-medium">Specialty</th>
              <th className="text-left p-3 font-medium">Department</th>
              <th className="text-left p-3 font-medium">Exp</th>
              <th className="text-left p-3 font-medium">Rating</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr></thead>
            <tbody>{filtered.map(d => (
              <tr key={d.id} className="border-b border-border/50 hover:bg-muted/30 cursor-pointer" onClick={() => navigate(`/doctors/${d.id}`)}>
                <td className="p-3 font-medium">{d.name}</td>
                <td className="p-3 text-muted-foreground">{d.specialty}</td>
                <td className="p-3 text-muted-foreground">{d.department}</td>
                <td className="p-3 text-muted-foreground">{d.experience}y</td>
                <td className="p-3"><span className="flex items-center gap-1"><Star className="w-3 h-3 fill-warning text-warning" />{d.rating}</span></td>
                <td className="p-3"><StatusBadge status={d.status} /></td>
                <td className="p-3 text-right"><Button variant="ghost" size="sm">View</Button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      <AddDoctorDrawer open={drawerOpen} onOpenChange={setDrawerOpen} onSave={(d) => { setAllDoctors(prev => [d, ...prev]); setDrawerOpen(false); }} />
    </AppLayout>
  );
};

const AddDoctorDrawer = ({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (o: boolean) => void; onSave: (d: Doctor) => void }) => {
  const [form, setForm] = useState<Partial<Doctor>>({ workingDays: [] });
  const update = (key: keyof Doctor, value: any) => setForm(prev => ({ ...prev, [key]: value }));
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleSave = () => {
    const doc: Doctor = {
      id: `D${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      name: `Dr. ${form.name || "New Doctor"}`,
      specialty: form.specialty || "",
      department: form.department || "",
      avatar: "",
      patientsToday: 0,
      rating: 0,
      status: "Available",
      gender: (form.gender as any) || "Male",
      dob: form.dob || "",
      phone: form.phone || "",
      email: form.email || "",
      qualification: form.qualification || "",
      licenseNumber: form.licenseNumber || "",
      experience: form.experience || 0,
      bio: form.bio || "",
      languages: [],
      consultationFee: form.consultationFee || 0,
      workingDays: form.workingDays || [],
      startTime: form.startTime || "08:00",
      endTime: form.endTime || "17:00",
      maxPatientsPerDay: form.maxPatientsPerDay || 20,
    };
    onSave(doc);
  };

  return (
    <SlideDrawer open={open} onOpenChange={onOpenChange} title="Add New Doctor" wide>
      <div className="space-y-6 pb-6">
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Personal</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Full Name *</Label><Input value={form.name || ""} onChange={e => update("name", e.target.value)} /></div>
            <div><Label>Gender</Label><Select value={form.gender || ""} onValueChange={v => update("gender", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent></Select></div>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Professional</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Specialization *</Label><Input value={form.specialty || ""} onChange={e => update("specialty", e.target.value)} /></div>
            <div><Label>Department *</Label><Select value={form.department || ""} onValueChange={v => update("department", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Qualification</Label><Input value={form.qualification || ""} onChange={e => update("qualification", e.target.value)} /></div>
            <div><Label>License Number</Label><Input value={form.licenseNumber || ""} onChange={e => update("licenseNumber", e.target.value)} /></div>
            <div><Label>Experience (years)</Label><Input type="number" value={form.experience || ""} onChange={e => update("experience", parseInt(e.target.value) || 0)} /></div>
            <div><Label>Consultation Fee ($)</Label><Input type="number" value={form.consultationFee || ""} onChange={e => update("consultationFee", parseInt(e.target.value) || 0)} /></div>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Contact</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Phone</Label><Input value={form.phone || ""} onChange={e => update("phone", e.target.value)} /></div>
            <div><Label>Email</Label><Input type="email" value={form.email || ""} onChange={e => update("email", e.target.value)} /></div>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3">Schedule</h4>
          <div className="flex flex-wrap gap-3 mb-3">
            {days.map(day => (
              <label key={day} className="flex items-center gap-1.5 text-sm">
                <Checkbox checked={form.workingDays?.includes(day)} onCheckedChange={(c) => update("workingDays", c ? [...(form.workingDays || []), day] : (form.workingDays || []).filter(d => d !== day))} />
                {day}
              </label>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Start Time</Label><Input type="time" value={form.startTime || "08:00"} onChange={e => update("startTime", e.target.value)} /></div>
            <div><Label>End Time</Label><Input type="time" value={form.endTime || "17:00"} onChange={e => update("endTime", e.target.value)} /></div>
          </div>
        </div>
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">Add Doctor</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        </div>
      </div>
    </SlideDrawer>
  );
};

export default Doctors;
