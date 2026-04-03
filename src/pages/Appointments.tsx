import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { appointments, Appointment, AppointmentStatus, patients, doctors, departments } from "@/data/mockData";
import { Plus, Search, CalendarIcon, List as ListIcon, ChevronLeft, ChevronRight, Eye, RefreshCw, XCircle } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isSameMonth, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

const Appointments = () => {
  const [allAppts, setAllAppts] = useState<Appointment[]>(appointments);
  const [view, setView] = useState<"calendar" | "list">("list");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDept, setFilterDept] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [bookOpen, setBookOpen] = useState(false);
  const [detailAppt, setDetailAppt] = useState<Appointment | null>(null);

  const filtered = useMemo(() => {
    return allAppts.filter(a => {
      const matchSearch = !search || a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || a.status === filterStatus;
      const matchDept = filterDept === "all" || a.department === filterDept;
      return matchSearch && matchStatus && matchDept;
    });
  }, [allAppts, search, filterStatus, filterDept]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const getApptsByDate = (date: Date) => allAppts.filter(a => isSameDay(parseISO(a.date), date));

  const statusColor: Record<AppointmentStatus, string> = { Confirmed: "bg-accent", Pending: "bg-warning", Completed: "bg-success", Cancelled: "bg-destructive", "No-show": "bg-muted-foreground" };

  const updateStatus = (id: string, status: AppointmentStatus) => {
    setAllAppts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    if (detailAppt?.id === id) setDetailAppt(prev => prev ? { ...prev, status } : null);
  };

  return (
    <AppLayout>
      <PageHeader title="Appointments" subtitle={`${filtered.length} appointments`}
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Appointments" }]}
        action={<Button onClick={() => setBookOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="w-4 h-4 mr-1" /> Book Appointment</Button>} />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search patient or doctor..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Confirmed">Confirmed</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Cancelled">Cancelled</SelectItem><SelectItem value="No-show">No-show</SelectItem></SelectContent>
        </Select>
        <Select value={filterDept} onValueChange={setFilterDept}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Depts</SelectItem>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
        </Select>
        <div className="flex border border-border rounded-lg overflow-hidden">
          <Button variant={view === "calendar" ? "default" : "ghost"} size="sm" className={cn("rounded-none", view === "calendar" && "bg-accent text-accent-foreground")} onClick={() => setView("calendar")}><CalendarIcon className="w-4 h-4 mr-1" />Calendar</Button>
          <Button variant={view === "list" ? "default" : "ghost"} size="sm" className={cn("rounded-none", view === "list" && "bg-accent text-accent-foreground")} onClick={() => setView("list")}><ListIcon className="w-4 h-4 mr-1" />List</Button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="flex-1 bg-card rounded-xl border border-border shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeft className="w-4 h-4" /></Button>
              <h3 className="font-heading font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight className="w-4 h-4" /></Button>
            </div>
            <div className="grid grid-cols-7 gap-px">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} className="text-center text-xs font-medium text-muted-foreground p-2">{d}</div>)}
              {Array.from({ length: startDay }).map((_, i) => <div key={`e${i}`} />)}
              {monthDays.map(day => {
                const dayAppts = getApptsByDate(day);
                const isToday = isSameDay(day, new Date());
                const isSelected = selectedDay && isSameDay(day, selectedDay);
                return (
                  <button key={day.toISOString()} onClick={() => setSelectedDay(day)}
                    className={cn("p-2 min-h-[60px] text-left rounded-lg border transition-colors", isSelected ? "border-accent bg-accent/5" : "border-transparent hover:bg-muted/50", isToday && "ring-1 ring-accent")}>
                    <span className={cn("text-xs font-medium", isToday && "text-accent")}>{format(day, "d")}</span>
                    {dayAppts.length > 0 && <div className="flex gap-0.5 mt-1 flex-wrap">{dayAppts.slice(0, 3).map(a => <div key={a.id} className={cn("w-1.5 h-1.5 rounded-full", statusColor[a.status])} />)}{dayAppts.length > 3 && <span className="text-[9px] text-muted-foreground">+{dayAppts.length - 3}</span>}</div>}
                  </button>
                );
              })}
            </div>
          </div>
          {selectedDay && (
            <div className="w-full lg:w-80 bg-card rounded-xl border border-border shadow-md p-4">
              <h3 className="font-heading font-semibold text-sm mb-3">{format(selectedDay, "EEEE, MMM d")}</h3>
              <div className="space-y-2">
                {getApptsByDate(selectedDay).length === 0 ? <p className="text-sm text-muted-foreground">No appointments</p> : getApptsByDate(selectedDay).map(a => (
                  <div key={a.id} className="p-2.5 rounded-lg border border-border hover:bg-muted/30 cursor-pointer" onClick={() => setDetailAppt(a)}>
                    <div className="flex items-center justify-between"><span className="text-sm font-medium">{a.patient}</span><StatusBadge status={a.status} /></div>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time} · {a.doctor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-md overflow-hidden">
          {filtered.length === 0 ? <EmptyState title="No appointments found" /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground bg-muted/30">
                  <th className="text-left p-3 font-medium">ID</th><th className="text-left p-3 font-medium">Patient</th><th className="text-left p-3 font-medium">Doctor</th><th className="text-left p-3 font-medium">Dept</th><th className="text-left p-3 font-medium">Date & Time</th><th className="text-left p-3 font-medium">Type</th><th className="text-left p-3 font-medium">Status</th><th className="text-right p-3 font-medium">Actions</th>
                </tr></thead>
                <tbody>{filtered.slice(0, 30).map(a => (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                    <td className="p-3 font-medium">{a.patient}</td>
                    <td className="p-3 text-muted-foreground">{a.doctor}</td>
                    <td className="p-3 text-muted-foreground">{a.department}</td>
                    <td className="p-3 text-muted-foreground">{a.date} {a.time}</td>
                    <td className="p-3"><StatusBadge status={a.type} /></td>
                    <td className="p-3"><StatusBadge status={a.status} /></td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDetailAppt(a)}><Eye className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => updateStatus(a.id, "Cancelled")}><XCircle className="w-3.5 h-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Book Appointment Dialog */}
      <BookAppointmentDialog open={bookOpen} onOpenChange={setBookOpen} onBook={(a) => { setAllAppts(prev => [a, ...prev]); setBookOpen(false); }} />

      {/* Appointment Detail */}
      {detailAppt && (
        <Dialog open={!!detailAppt} onOpenChange={() => setDetailAppt(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-heading">Appointment {detailAppt.id}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground text-xs">Patient</p><p className="font-medium">{detailAppt.patient}</p></div>
                <div><p className="text-muted-foreground text-xs">Doctor</p><p className="font-medium">{detailAppt.doctor}</p></div>
                <div><p className="text-muted-foreground text-xs">Department</p><p>{detailAppt.department}</p></div>
                <div><p className="text-muted-foreground text-xs">Date & Time</p><p>{detailAppt.date} {detailAppt.time}</p></div>
                <div><p className="text-muted-foreground text-xs">Type</p><StatusBadge status={detailAppt.type} /></div>
                <div><p className="text-muted-foreground text-xs">Status</p><StatusBadge status={detailAppt.status} /></div>
                <div className="col-span-2"><p className="text-muted-foreground text-xs">Reason</p><p>{detailAppt.reason}</p></div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                <Button size="sm" onClick={() => updateStatus(detailAppt.id, "Confirmed")} className="bg-accent text-accent-foreground hover:bg-accent/90">Confirm</Button>
                <Button size="sm" variant="outline" onClick={() => updateStatus(detailAppt.id, "Completed")} className="text-success border-success/30">Complete</Button>
                <Button size="sm" variant="outline" onClick={() => updateStatus(detailAppt.id, "No-show")}>No-show</Button>
                <Button size="sm" variant="destructive" onClick={() => updateStatus(detailAppt.id, "Cancelled")}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
};

// ─── Book Appointment Dialog ──────────────────────────
const BookAppointmentDialog = ({ open, onOpenChange, onBook }: { open: boolean; onOpenChange: (o: boolean) => void; onBook: (a: Appointment) => void }) => {
  const [step, setStep] = useState(1);
  const [patientId, setPatientId] = useState("");
  const [deptId, setDeptId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState("");
  const [type, setType] = useState<"In-Person" | "Video" | "Emergency">("In-Person");
  const [reason, setReason] = useState("");

  const filteredDoctors = deptId ? doctors.filter(d => d.department === deptId) : doctors;
  const selectedPatient = patients.find(p => p.id === patientId);
  const selectedDoctor = doctors.find(d => d.id === doctorId);
  const timeSlots = ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"];

  const handleBook = () => {
    const appt: Appointment = {
      id: `A${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      patientId, patient: selectedPatient?.name || "",
      doctorId, doctor: selectedDoctor?.name || "",
      department: selectedDoctor?.department || "",
      date: date ? format(date, "yyyy-MM-dd") : "",
      time: timeSlot, type, status: "Pending", reason, notes: "",
    };
    onBook(appt);
    setStep(1); setPatientId(""); setDeptId(""); setDoctorId(""); setDate(undefined); setTimeSlot(""); setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { setStep(1); } onOpenChange(o); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle className="font-heading">Book Appointment — Step {step}/4</DialogTitle></DialogHeader>
        {step === 1 && (
          <div className="space-y-3">
            <Label>Select Patient</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger><SelectValue placeholder="Choose patient..." /></SelectTrigger>
              <SelectContent>{patients.map(p => <SelectItem key={p.id} value={p.id}>{p.name} ({p.id})</SelectItem>)}</SelectContent>
            </Select>
            <Button className="w-full bg-accent text-accent-foreground" disabled={!patientId} onClick={() => setStep(2)}>Next</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <div><Label>Department</Label><Select value={deptId} onValueChange={v => { setDeptId(v); setDoctorId(""); }}><SelectTrigger><SelectValue placeholder="Choose department..." /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Doctor</Label><Select value={doctorId} onValueChange={setDoctorId}><SelectTrigger><SelectValue placeholder="Choose doctor..." /></SelectTrigger><SelectContent>{filteredDoctors.map(d => <SelectItem key={d.id} value={d.id}>{d.name} — {d.specialty}</SelectItem>)}</SelectContent></Select></div>
            <div className="flex gap-2"><Button variant="outline" onClick={() => setStep(1)}>Back</Button><Button className="flex-1 bg-accent text-accent-foreground" disabled={!doctorId} onClick={() => setStep(3)}>Next</Button></div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3">
            <Label>Select Date</Label>
            <div className="flex justify-center"><Calendar mode="single" selected={date} onSelect={setDate} className="p-3 pointer-events-auto" disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))} /></div>
            <Label>Select Time</Label>
            <div className="grid grid-cols-4 gap-1.5">{timeSlots.map(t => <Button key={t} variant={timeSlot === t ? "default" : "outline"} size="sm" className={cn(timeSlot === t && "bg-accent text-accent-foreground")} onClick={() => setTimeSlot(t)}>{t}</Button>)}</div>
            <div className="flex gap-2"><Button variant="outline" onClick={() => setStep(2)}>Back</Button><Button className="flex-1 bg-accent text-accent-foreground" disabled={!date || !timeSlot} onClick={() => setStep(4)}>Next</Button></div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-3">
            <div><Label>Appointment Type</Label><Select value={type} onValueChange={v => setType(v as any)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="In-Person">In-Person</SelectItem><SelectItem value="Video">Video</SelectItem><SelectItem value="Emergency">Emergency</SelectItem></SelectContent></Select></div>
            <div><Label>Reason for Visit</Label><Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Describe the reason..." /></div>
            <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
              <p><span className="text-muted-foreground">Patient:</span> {selectedPatient?.name}</p>
              <p><span className="text-muted-foreground">Doctor:</span> {selectedDoctor?.name}</p>
              <p><span className="text-muted-foreground">Date:</span> {date ? format(date, "PPP") : ""}</p>
              <p><span className="text-muted-foreground">Time:</span> {timeSlot}</p>
              <p><span className="text-muted-foreground">Type:</span> {type}</p>
            </div>
            <div className="flex gap-2"><Button variant="outline" onClick={() => setStep(3)}>Back</Button><Button className="flex-1 bg-accent text-accent-foreground" onClick={handleBook}>Confirm Booking</Button></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Appointments;
