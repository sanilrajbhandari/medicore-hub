import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Bell, Moon, Sun, User, Lock, LogOut } from "lucide-react";
import { alerts } from "@/data/mockData";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/appointments": "Appointments",
  "/patients": "Patients",
  "/doctors": "Doctors",
  "/nurses": "Nurses",
  "/departments": "Departments",
  "/wards": "Wards & Beds",
  "/pharmacy": "Pharmacy",
  "/laboratory": "Laboratory",
  "/billing": "Billing & Invoices",
  "/inventory": "Inventory",
  "/reports": "Reports & Analytics",
  "/staff": "Staff & HR",
  "/settings": "Settings",
};

export const AppHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("hms_theme") === "dark");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("hms_theme", dark ? "dark" : "light");
  }, [dark]);

  const title = pageTitles[location.pathname] || "MediCore HMS";

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur border-b border-border flex items-center gap-4 px-4 lg:px-6">
      <div className="lg:hidden w-10" />
      <h1 className="font-heading font-semibold text-lg text-foreground hidden sm:block">{title}</h1>

      <div className="flex-1 max-w-md mx-auto lg:mx-0 lg:ml-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search patients, doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setDark(!dark)}
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {alerts.length}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-3 border-b border-border">
              <h3 className="font-heading font-semibold text-sm">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {alerts.slice(0, 5).map((a) => (
                <div key={a.id} className="px-3 py-2.5 border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <p className="text-sm">{a.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                {user?.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
            <DropdownMenuItem><Lock className="w-4 h-4 mr-2" />Change Password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); navigate("/"); }} className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
