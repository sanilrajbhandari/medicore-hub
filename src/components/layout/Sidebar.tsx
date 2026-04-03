import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  LayoutGrid, Calendar, Users, Stethoscope, Heart, Building2, BedDouble,
  Pill, FlaskConical, Receipt, Package, BarChart3, Briefcase, Settings,
  LogOut, Cross, ChevronLeft, Menu, X
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const navSections = [
  {
    label: "MAIN",
    items: [
      { title: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
      { title: "Appointments", icon: Calendar, path: "/appointments" },
      { title: "Patients", icon: Users, path: "/patients" },
    ],
  },
  {
    label: "CLINICAL",
    items: [
      { title: "Doctors", icon: Stethoscope, path: "/doctors" },
      { title: "Nurses", icon: Heart, path: "/nurses" },
      { title: "Departments", icon: Building2, path: "/departments" },
      { title: "Wards & Beds", icon: BedDouble, path: "/wards" },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { title: "Pharmacy", icon: Pill, path: "/pharmacy" },
      { title: "Laboratory", icon: FlaskConical, path: "/laboratory" },
      { title: "Billing & Invoices", icon: Receipt, path: "/billing" },
      { title: "Inventory", icon: Package, path: "/inventory" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { title: "Reports & Analytics", icon: BarChart3, path: "/reports" },
      { title: "Staff & HR", icon: Briefcase, path: "/staff" },
      { title: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

export const AppSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/20 shrink-0">
          <Cross className="w-5 h-5 text-accent" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <h2 className="font-heading font-bold text-sm text-sidebar-accent-foreground truncate">MediCore HMS</h2>
            <p className="text-[10px] text-sidebar-foreground/60">v1.0.0</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-sidebar-accent"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* User */}
      {!collapsed && user && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold text-accent">
                {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-sidebar" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{user.name}</p>
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded bg-accent/20 text-accent">{user.role}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold tracking-wider text-sidebar-foreground/40 uppercase">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group relative",
                      active
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-accent" />}
                    <item.icon className={cn("w-[18px] h-[18px] shrink-0", active ? "text-accent" : "text-sidebar-foreground/50")} />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-sidebar-border">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="w-[18px] h-[18px]" />
              {!collapsed && <span>Logout</span>}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading">Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to sign out of MediCore HMS?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-card shadow-md border border-border flex items-center justify-center"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-foreground/30 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-40 w-[260px] transform transition-transform duration-200",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:block shrink-0 h-screen sticky top-0 transition-all duration-200",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}>
        {sidebarContent}
      </aside>
    </>
  );
};
