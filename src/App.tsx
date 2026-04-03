import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/components/layout/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";
import Appointments from "./pages/Appointments";
import Departments, { DepartmentDetail } from "./pages/Departments";
import Wards from "./pages/Wards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
            <Route path="/patients/:id" element={<PrivateRoute><PatientDetail /></PrivateRoute>} />
            <Route path="/doctors" element={<PrivateRoute><Doctors /></PrivateRoute>} />
            <Route path="/doctors/:id" element={<PrivateRoute><DoctorDetail /></PrivateRoute>} />
            <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
            <Route path="/departments" element={<PrivateRoute><Departments /></PrivateRoute>} />
            <Route path="/departments/:id" element={<PrivateRoute><DepartmentDetail /></PrivateRoute>} />
            <Route path="/wards" element={<PrivateRoute><Wards /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
