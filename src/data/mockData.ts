import { format, subDays, addHours, setHours, setMinutes } from "date-fns";

const today = new Date();
const time = (h: number, m: number) => format(setMinutes(setHours(today, h), m), "hh:mm a");

export const doctors = [
  { id: "D001", name: "Dr. Sarah Chen", specialty: "Cardiology", avatar: "", patientsToday: 12, rating: 4.9, status: "Available" },
  { id: "D002", name: "Dr. James Wilson", specialty: "Neurology", avatar: "", patientsToday: 9, rating: 4.8, status: "In Surgery" },
  { id: "D003", name: "Dr. Priya Patel", specialty: "Pediatrics", avatar: "", patientsToday: 15, rating: 4.7, status: "Available" },
  { id: "D004", name: "Dr. Michael Brown", specialty: "Orthopedics", avatar: "", patientsToday: 8, rating: 4.6, status: "On Leave" },
  { id: "D005", name: "Dr. Emily Davis", specialty: "Dermatology", avatar: "", patientsToday: 11, rating: 4.9, status: "Available" },
  { id: "D006", name: "Dr. Robert Kim", specialty: "General Surgery", avatar: "", patientsToday: 6, rating: 4.5, status: "In Surgery" },
  { id: "D007", name: "Dr. Lisa Wang", specialty: "Oncology", avatar: "", patientsToday: 7, rating: 4.8, status: "Available" },
  { id: "D008", name: "Dr. Ahmed Hassan", specialty: "ENT", avatar: "", patientsToday: 10, rating: 4.7, status: "Available" },
];

export const patients = [
  { id: "P001", name: "John Smith", age: 45, gender: "Male", phone: "555-0101", condition: "Hypertension", admitted: true },
  { id: "P002", name: "Mary Johnson", age: 32, gender: "Female", phone: "555-0102", condition: "Pregnancy Checkup", admitted: false },
  { id: "P003", name: "David Lee", age: 58, gender: "Male", phone: "555-0103", condition: "Diabetes Type 2", admitted: true },
  { id: "P004", name: "Emma Wilson", age: 27, gender: "Female", phone: "555-0104", condition: "Migraine", admitted: false },
  { id: "P005", name: "Carlos Garcia", age: 63, gender: "Male", phone: "555-0105", condition: "Cardiac Arrhythmia", admitted: true },
  { id: "P006", name: "Fatima Ali", age: 41, gender: "Female", phone: "555-0106", condition: "Asthma", admitted: false },
  { id: "P007", name: "Tom Brown", age: 55, gender: "Male", phone: "555-0107", condition: "Post-Surgery Recovery", admitted: true },
  { id: "P008", name: "Sophia Martinez", age: 29, gender: "Female", phone: "555-0108", condition: "Fractured Wrist", admitted: false },
  { id: "P009", name: "James Taylor", age: 70, gender: "Male", phone: "555-0109", condition: "COPD", admitted: true },
  { id: "P010", name: "Aisha Khan", age: 36, gender: "Female", phone: "555-0110", condition: "Thyroid Disorder", admitted: false },
  { id: "P011", name: "William Clark", age: 48, gender: "Male", phone: "555-0111", condition: "Back Pain", admitted: false },
  { id: "P012", name: "Grace Okonkwo", age: 52, gender: "Female", phone: "555-0112", condition: "Kidney Stones", admitted: true },
  { id: "P013", name: "Henry Adams", age: 67, gender: "Male", phone: "555-0113", condition: "Stroke Recovery", admitted: true },
  { id: "P014", name: "Nina Petrova", age: 23, gender: "Female", phone: "555-0114", condition: "Allergic Reaction", admitted: false },
  { id: "P015", name: "Oscar Fernandez", age: 44, gender: "Male", phone: "555-0115", condition: "Appendicitis", admitted: true },
  { id: "P016", name: "Lily Chen", age: 38, gender: "Female", phone: "555-0116", condition: "Anemia", admitted: false },
];

export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export const appointments = [
  { id: "A001", patient: "John Smith", doctor: "Dr. Sarah Chen", department: "Cardiology", time: time(9, 0), status: "Confirmed" as AppointmentStatus },
  { id: "A002", patient: "Mary Johnson", doctor: "Dr. Priya Patel", department: "Pediatrics", time: time(9, 30), status: "Completed" as AppointmentStatus },
  { id: "A003", patient: "David Lee", doctor: "Dr. Emily Davis", department: "Dermatology", time: time(10, 0), status: "Pending" as AppointmentStatus },
  { id: "A004", patient: "Emma Wilson", doctor: "Dr. James Wilson", department: "Neurology", time: time(10, 30), status: "Confirmed" as AppointmentStatus },
  { id: "A005", patient: "Carlos Garcia", doctor: "Dr. Sarah Chen", department: "Cardiology", time: time(11, 0), status: "Pending" as AppointmentStatus },
  { id: "A006", patient: "Fatima Ali", doctor: "Dr. Ahmed Hassan", department: "ENT", time: time(11, 30), status: "Confirmed" as AppointmentStatus },
  { id: "A007", patient: "Tom Brown", doctor: "Dr. Robert Kim", department: "General Surgery", time: time(12, 0), status: "Completed" as AppointmentStatus },
  { id: "A008", patient: "Sophia Martinez", doctor: "Dr. Michael Brown", department: "Orthopedics", time: time(13, 0), status: "Pending" as AppointmentStatus },
  { id: "A009", patient: "James Taylor", doctor: "Dr. Lisa Wang", department: "Oncology", time: time(13, 30), status: "Confirmed" as AppointmentStatus },
  { id: "A010", patient: "Aisha Khan", doctor: "Dr. Emily Davis", department: "Dermatology", time: time(14, 0), status: "Pending" as AppointmentStatus },
];

export const departments = [
  { name: "Cardiology", totalBeds: 30, occupied: 24 },
  { name: "Neurology", totalBeds: 25, occupied: 18 },
  { name: "Pediatrics", totalBeds: 35, occupied: 28 },
  { name: "Orthopedics", totalBeds: 20, occupied: 15 },
  { name: "Oncology", totalBeds: 22, occupied: 20 },
  { name: "General Surgery", totalBeds: 28, occupied: 22 },
  { name: "ENT", totalBeds: 15, occupied: 9 },
  { name: "Dermatology", totalBeds: 10, occupied: 5 },
];

export const admissionTrend = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(today, 29 - i), "MMM dd"),
  admissions: Math.floor(Math.random() * 20) + 10,
  discharges: Math.floor(Math.random() * 18) + 8,
}));

export const revenueExpenses = [
  { month: "Oct", revenue: 420000, expenses: 310000 },
  { month: "Nov", revenue: 480000, expenses: 340000 },
  { month: "Dec", revenue: 510000, expenses: 360000 },
  { month: "Jan", revenue: 390000, expenses: 290000 },
  { month: "Feb", revenue: 460000, expenses: 320000 },
  { month: "Mar", revenue: 530000, expenses: 350000 },
];

export const alerts = [
  { id: 1, type: "danger" as const, message: "ICU Bed capacity at 95%", time: "5 min ago" },
  { id: 2, type: "warning" as const, message: "Low stock: Amoxicillin (12 units left)", time: "15 min ago" },
  { id: 3, type: "info" as const, message: "Lab results ready for Patient P003", time: "30 min ago" },
  { id: 4, type: "warning" as const, message: "Dr. Michael Brown on leave tomorrow", time: "1 hr ago" },
  { id: 5, type: "danger" as const, message: "Emergency admission: Trauma case incoming", time: "2 hr ago" },
  { id: 6, type: "info" as const, message: "Monthly report generated successfully", time: "3 hr ago" },
  { id: 7, type: "warning" as const, message: "Low stock: Insulin vials (8 units left)", time: "4 hr ago" },
];

export const sparklineData = [
  { v: 35 }, { v: 42 }, { v: 38 }, { v: 45 }, { v: 40 }, { v: 48 }, { v: 52 },
];

export const statsData = {
  patientsToday: 156,
  patientChange: 12.5,
  appointmentsToday: 48,
  appointmentBreakdown: { pending: 14, confirmed: 22, completed: 12 },
  bedsAvailable: 47,
  bedsTotal: 185,
  revenueToday: 84250,
  revenueChange: 8.3,
};
