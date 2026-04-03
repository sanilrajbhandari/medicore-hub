import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { wards, Ward, Bed, patients } from "@/data/mockData";
import { BedDouble, CheckCircle, Wrench, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const bedColorMap: Record<string, string> = {
  Available: "bg-success/20 border-success/40 hover:bg-success/30",
  Occupied: "bg-destructive/20 border-destructive/40 hover:bg-destructive/30",
  Maintenance: "bg-warning/20 border-warning/40 hover:bg-warning/30",
  Reserved: "bg-accent/20 border-accent/40 hover:bg-accent/30",
};

const Wards = () => {
  const navigate = useNavigate();
  const [allWards, setAllWards] = useState<Ward[]>(wards);
  const [selectedWard, setSelectedWard] = useState<string>(wards[0]?.id || "");
  const [hoveredBed, setHoveredBed] = useState<Bed | null>(null);
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [selectedBedForAlloc, setSelectedBedForAlloc] = useState<Bed | null>(null);
  const [allocPatient, setAllocPatient] = useState("");

  const ward = allWards.find(w => w.id === selectedWard);
  const bedStats = (w: Ward) => ({
    total: w.beds.length,
    occupied: w.beds.filter(b => b.status === "Occupied").length,
    available: w.beds.filter(b => b.status === "Available").length,
    maintenance: w.beds.filter(b => b.status === "Maintenance").length,
  });

  const handleAllocate = () => {
    if (!selectedBedForAlloc || !allocPatient) return;
    const pat = patients.find(p => p.id === allocPatient);
    setAllWards(prev => prev.map(w => w.id === selectedWard ? {
      ...w,
      beds: w.beds.map(b => b.id === selectedBedForAlloc.id ? { ...b, status: "Occupied" as const, patientId: allocPatient, patientName: pat?.name } : b),
    } : w));
    setAllocateOpen(false);
    setSelectedBedForAlloc(null);
    setAllocPatient("");
  };

  return (
    <AppLayout>
      <PageHeader title="Wards & Beds" subtitle="Manage ward bed allocations"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Wards & Beds" }]} />

      {/* Ward Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {allWards.map(w => {
          const stats = bedStats(w);
          const isActive = w.id === selectedWard;
          return (
            <Card key={w.id} className={cn("cursor-pointer transition-all", isActive && "ring-2 ring-accent")} onClick={() => setSelectedWard(w.id)}>
              <CardContent className="p-4">
                <h4 className="font-heading font-semibold text-sm truncate">{w.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{w.department}</p>
                <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                  <span className="text-success">{stats.available} free</span>
                  <span className="text-destructive">{stats.occupied} used</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bed Map */}
      {ward && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg">{ward.name} — Bed Map</CardTitle>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-success/40" /> Available</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-destructive/40" /> Occupied</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-warning/40" /> Maintenance</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-accent/40" /> Reserved</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {ward.beds.map(bed => (
                <Popover key={bed.id}>
                  <PopoverTrigger asChild>
                    <button
                      className={cn("relative p-3 rounded-lg border-2 text-center transition-all", bedColorMap[bed.status])}
                      onClick={() => {
                        if (bed.status === "Available") { setSelectedBedForAlloc(bed); setAllocateOpen(true); }
                      }}
                    >
                      <BedDouble className="w-5 h-5 mx-auto mb-1 opacity-60" />
                      <span className="text-xs font-medium">{bed.number}</span>
                    </button>
                  </PopoverTrigger>
                  {bed.status === "Occupied" && bed.patientName && (
                    <PopoverContent className="w-48 p-3" side="top">
                      <p className="text-sm font-medium">{bed.patientName}</p>
                      <p className="text-xs text-muted-foreground">{bed.patientId}</p>
                      <Button variant="link" size="sm" className="px-0 h-auto text-accent" onClick={() => navigate(`/patients/${bed.patientId}`)}>View Patient →</Button>
                    </PopoverContent>
                  )}
                </Popover>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Allocate Dialog */}
      <Dialog open={allocateOpen} onOpenChange={setAllocateOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-heading">Allocate Bed {selectedBedForAlloc?.number}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Select value={allocPatient} onValueChange={setAllocPatient}>
              <SelectTrigger><SelectValue placeholder="Select patient..." /></SelectTrigger>
              <SelectContent>{patients.filter(p => !p.admitted).map(p => <SelectItem key={p.id} value={p.id}>{p.name} ({p.id})</SelectItem>)}</SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setAllocateOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-accent text-accent-foreground" disabled={!allocPatient} onClick={handleAllocate}>Allocate</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Wards;
