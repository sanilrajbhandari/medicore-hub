import { format, subDays, addDays, setHours, setMinutes } from "date-fns";

const today = new Date();
const time = (h: number, m: number) => format(setMinutes(setHours(today, h), m), "hh:mm a");
const dateStr = (d: Date) => format(d, "yyyy-MM-dd");
const dateDisplay = (d: Date) => format(d, "MMM dd, yyyy");

export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled" | "No-show";
export type PatientStatus = "Active" | "Admitted" | "Discharged";
export type DoctorStatus = "Available" | "In Surgery" | "On Leave";
export type BedStatus = "Available" | "Occupied" | "Maintenance" | "Reserved";

export interface Patient {
  id: string;
  name: string;
  age: number;
  dob: string;
  gender: "Male" | "Female";
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  insuranceProvider: string;
  policyNumber: string;
  insuranceExpiry: string;
  condition: string;
  status: PatientStatus;
  registeredDate: string;
  admitted: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  avatar: string;
  patientsToday: number;
  rating: number;
  status: DoctorStatus;
  gender: "Male" | "Female";
  dob: string;
  phone: string;
  email: string;
  qualification: string;
  licenseNumber: string;
  experience: number;
  bio: string;
  languages: string[];
  consultationFee: number;
  workingDays: string[];
  startTime: string;
  endTime: string;
  maxPatientsPerDay: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient: string;
  doctorId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: "In-Person" | "Video" | "Emergency";
  status: AppointmentStatus;
  reason: string;
  notes: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  headDoctor: string;
  totalDoctors: number;
  totalBeds: number;
  occupied: number;
  description: string;
}

export interface Ward {
  id: string;
  name: string;
  department: string;
  beds: Bed[];
}

export interface Bed {
  id: string;
  number: string;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  type: "Visit" | "Diagnosis" | "Treatment" | "Surgery";
  description: string;
  doctor: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  date: string;
  doctor: string;
  medicines: { name: string; dosage: string; duration: string }[];
}

export interface LabResult {
  id: string;
  patientId: string;
  testName: string;
  date: string;
  status: "Pending" | "Completed";
  result?: string;
  doctor: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  description: string;
}

export interface VitalRecord {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number;
  weight: number;
}

export interface Review {
  id: string;
  doctorId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

// ─── PATIENTS ─────────────────────────────────────────
export const patients: Patient[] = [
  { id: "P001", name: "John Smith", age: 45, dob: "1981-03-15", gender: "Male", bloodGroup: "A+", phone: "555-0101", email: "john.smith@email.com", address: "123 Main St, Springfield", emergencyContactName: "Jane Smith", emergencyContactPhone: "555-0201", allergies: ["Penicillin"], chronicConditions: ["Hypertension"], currentMedications: ["Lisinopril 10mg"], insuranceProvider: "BlueCross", policyNumber: "BC-78901", insuranceExpiry: "2027-06-30", condition: "Hypertension", status: "Admitted", registeredDate: "2024-01-15", admitted: true },
  { id: "P002", name: "Mary Johnson", age: 32, dob: "1994-07-22", gender: "Female", bloodGroup: "O+", phone: "555-0102", email: "mary.j@email.com", address: "456 Oak Ave, Lincoln", emergencyContactName: "Robert Johnson", emergencyContactPhone: "555-0202", allergies: [], chronicConditions: [], currentMedications: [], insuranceProvider: "Aetna", policyNumber: "AE-12345", insuranceExpiry: "2026-12-31", condition: "Pregnancy Checkup", status: "Active", registeredDate: "2024-02-10", admitted: false },
  { id: "P003", name: "David Lee", age: 58, dob: "1968-11-03", gender: "Male", bloodGroup: "B+", phone: "555-0103", email: "david.lee@email.com", address: "789 Pine Rd, Madison", emergencyContactName: "Susan Lee", emergencyContactPhone: "555-0203", allergies: ["Sulfa drugs"], chronicConditions: ["Diabetes Type 2"], currentMedications: ["Metformin 500mg", "Insulin"], insuranceProvider: "UnitedHealth", policyNumber: "UH-67890", insuranceExpiry: "2027-03-15", condition: "Diabetes Type 2", status: "Admitted", registeredDate: "2023-11-20", admitted: true },
  { id: "P004", name: "Emma Wilson", age: 27, dob: "1999-04-18", gender: "Female", bloodGroup: "AB+", phone: "555-0104", email: "emma.w@email.com", address: "321 Elm St, Portland", emergencyContactName: "Mark Wilson", emergencyContactPhone: "555-0204", allergies: ["Aspirin"], chronicConditions: ["Migraine"], currentMedications: ["Sumatriptan"], insuranceProvider: "Cigna", policyNumber: "CG-34567", insuranceExpiry: "2026-09-30", condition: "Migraine", status: "Active", registeredDate: "2024-03-05", admitted: false },
  { id: "P005", name: "Carlos Garcia", age: 63, dob: "1963-08-12", gender: "Male", bloodGroup: "O-", phone: "555-0105", email: "carlos.g@email.com", address: "654 Maple Dr, Austin", emergencyContactName: "Maria Garcia", emergencyContactPhone: "555-0205", allergies: [], chronicConditions: ["Cardiac Arrhythmia", "Hypertension"], currentMedications: ["Amiodarone", "Warfarin"], insuranceProvider: "Medicare", policyNumber: "MC-89012", insuranceExpiry: "2027-12-31", condition: "Cardiac Arrhythmia", status: "Admitted", registeredDate: "2023-09-12", admitted: true },
  { id: "P006", name: "Fatima Ali", age: 41, dob: "1985-01-25", gender: "Female", bloodGroup: "A-", phone: "555-0106", email: "fatima.a@email.com", address: "987 Cedar Ln, Denver", emergencyContactName: "Hassan Ali", emergencyContactPhone: "555-0206", allergies: ["Latex"], chronicConditions: ["Asthma"], currentMedications: ["Albuterol inhaler"], insuranceProvider: "BlueCross", policyNumber: "BC-45678", insuranceExpiry: "2026-08-15", condition: "Asthma", status: "Active", registeredDate: "2024-01-28", admitted: false },
  { id: "P007", name: "Tom Brown", age: 55, dob: "1971-06-09", gender: "Male", bloodGroup: "B-", phone: "555-0107", email: "tom.b@email.com", address: "147 Birch Way, Seattle", emergencyContactName: "Lisa Brown", emergencyContactPhone: "555-0207", allergies: [], chronicConditions: [], currentMedications: ["Ibuprofen PRN"], insuranceProvider: "Aetna", policyNumber: "AE-56789", insuranceExpiry: "2027-01-31", condition: "Post-Surgery Recovery", status: "Admitted", registeredDate: "2024-02-18", admitted: true },
  { id: "P008", name: "Sophia Martinez", age: 29, dob: "1997-12-14", gender: "Female", bloodGroup: "AB-", phone: "555-0108", email: "sophia.m@email.com", address: "258 Walnut St, Chicago", emergencyContactName: "Diego Martinez", emergencyContactPhone: "555-0208", allergies: ["Codeine"], chronicConditions: [], currentMedications: [], insuranceProvider: "Cigna", policyNumber: "CG-90123", insuranceExpiry: "2026-11-30", condition: "Fractured Wrist", status: "Active", registeredDate: "2024-03-22", admitted: false },
  { id: "P009", name: "James Taylor", age: 70, dob: "1956-02-28", gender: "Male", bloodGroup: "A+", phone: "555-0109", email: "james.t@email.com", address: "369 Ash Ct, Boston", emergencyContactName: "Patricia Taylor", emergencyContactPhone: "555-0209", allergies: ["Morphine"], chronicConditions: ["COPD", "Hypertension"], currentMedications: ["Tiotropium", "Prednisone"], insuranceProvider: "Medicare", policyNumber: "MC-23456", insuranceExpiry: "2027-12-31", condition: "COPD", status: "Admitted", registeredDate: "2023-07-14", admitted: true },
  { id: "P010", name: "Aisha Khan", age: 36, dob: "1990-09-07", gender: "Female", bloodGroup: "O+", phone: "555-0110", email: "aisha.k@email.com", address: "482 Spruce Rd, Miami", emergencyContactName: "Omar Khan", emergencyContactPhone: "555-0210", allergies: [], chronicConditions: ["Thyroid Disorder"], currentMedications: ["Levothyroxine"], insuranceProvider: "UnitedHealth", policyNumber: "UH-34567", insuranceExpiry: "2027-04-30", condition: "Thyroid Disorder", status: "Active", registeredDate: "2024-04-01", admitted: false },
  { id: "P011", name: "William Clark", age: 48, dob: "1978-05-21", gender: "Male", bloodGroup: "B+", phone: "555-0111", email: "will.c@email.com", address: "591 Poplar Ave, Phoenix", emergencyContactName: "Nancy Clark", emergencyContactPhone: "555-0211", allergies: [], chronicConditions: ["Back Pain"], currentMedications: ["Naproxen"], insuranceProvider: "Aetna", policyNumber: "AE-67890", insuranceExpiry: "2026-10-31", condition: "Back Pain", status: "Active", registeredDate: "2024-02-05", admitted: false },
  { id: "P012", name: "Grace Okonkwo", age: 52, dob: "1974-03-30", gender: "Female", bloodGroup: "A+", phone: "555-0112", email: "grace.o@email.com", address: "703 Willow Ln, Dallas", emergencyContactName: "Emeka Okonkwo", emergencyContactPhone: "555-0212", allergies: ["Ibuprofen"], chronicConditions: [], currentMedications: [], insuranceProvider: "BlueCross", policyNumber: "BC-12345", insuranceExpiry: "2027-02-28", condition: "Kidney Stones", status: "Admitted", registeredDate: "2024-01-10", admitted: true },
  { id: "P013", name: "Henry Adams", age: 67, dob: "1959-07-16", gender: "Male", bloodGroup: "O-", phone: "555-0113", email: "henry.a@email.com", address: "812 Chestnut Blvd, Atlanta", emergencyContactName: "Carol Adams", emergencyContactPhone: "555-0213", allergies: [], chronicConditions: ["Stroke Recovery", "Hypertension"], currentMedications: ["Clopidogrel", "Atorvastatin"], insuranceProvider: "Medicare", policyNumber: "MC-56789", insuranceExpiry: "2027-12-31", condition: "Stroke Recovery", status: "Admitted", registeredDate: "2023-12-01", admitted: true },
  { id: "P014", name: "Nina Petrova", age: 23, dob: "2003-10-11", gender: "Female", bloodGroup: "AB+", phone: "555-0114", email: "nina.p@email.com", address: "924 Magnolia Dr, San Diego", emergencyContactName: "Viktor Petrov", emergencyContactPhone: "555-0214", allergies: ["Peanuts", "Shellfish"], chronicConditions: [], currentMedications: ["EpiPen PRN"], insuranceProvider: "Cigna", policyNumber: "CG-78901", insuranceExpiry: "2026-07-31", condition: "Allergic Reaction", status: "Active", registeredDate: "2024-05-12", admitted: false },
  { id: "P015", name: "Oscar Fernandez", age: 44, dob: "1982-12-04", gender: "Male", bloodGroup: "A-", phone: "555-0115", email: "oscar.f@email.com", address: "135 Sycamore St, Houston", emergencyContactName: "Rosa Fernandez", emergencyContactPhone: "555-0215", allergies: [], chronicConditions: [], currentMedications: [], insuranceProvider: "UnitedHealth", policyNumber: "UH-90123", insuranceExpiry: "2027-05-15", condition: "Appendicitis", status: "Admitted", registeredDate: "2024-03-30", admitted: true },
  { id: "P016", name: "Lily Chen", age: 38, dob: "1988-06-19", gender: "Female", bloodGroup: "B+", phone: "555-0116", email: "lily.c@email.com", address: "246 Dogwood Pl, San Francisco", emergencyContactName: "Wei Chen", emergencyContactPhone: "555-0216", allergies: [], chronicConditions: ["Anemia"], currentMedications: ["Ferrous sulfate"], insuranceProvider: "Aetna", policyNumber: "AE-23456", insuranceExpiry: "2026-12-31", condition: "Anemia", status: "Active", registeredDate: "2024-04-18", admitted: false },
  { id: "P017", name: "Richard Evans", age: 59, dob: "1967-01-08", gender: "Male", bloodGroup: "O+", phone: "555-0117", email: "richard.e@email.com", address: "357 Redwood Ct, Minneapolis", emergencyContactName: "Betty Evans", emergencyContactPhone: "555-0217", allergies: ["ACE inhibitors"], chronicConditions: ["Coronary Artery Disease"], currentMedications: ["Aspirin", "Atorvastatin", "Metoprolol"], insuranceProvider: "Medicare", policyNumber: "MC-34567", insuranceExpiry: "2027-12-31", condition: "Coronary Artery Disease", status: "Active", registeredDate: "2023-10-25", admitted: false },
  { id: "P018", name: "Amara Diallo", age: 31, dob: "1995-04-02", gender: "Female", bloodGroup: "A+", phone: "555-0118", email: "amara.d@email.com", address: "468 Juniper Way, Nashville", emergencyContactName: "Baba Diallo", emergencyContactPhone: "555-0218", allergies: [], chronicConditions: [], currentMedications: [], insuranceProvider: "BlueCross", policyNumber: "BC-67890", insuranceExpiry: "2027-08-31", condition: "Prenatal Care", status: "Active", registeredDate: "2024-06-01", admitted: false },
  { id: "P019", name: "George Mitchell", age: 72, dob: "1954-09-17", gender: "Male", bloodGroup: "AB-", phone: "555-0119", email: "george.m@email.com", address: "579 Hickory Ln, Philadelphia", emergencyContactName: "Margaret Mitchell", emergencyContactPhone: "555-0219", allergies: ["Contrast dye"], chronicConditions: ["Prostate Cancer", "Arthritis"], currentMedications: ["Tamsulosin", "Celecoxib"], insuranceProvider: "Medicare", policyNumber: "MC-67890", insuranceExpiry: "2027-12-31", condition: "Prostate Cancer", status: "Admitted", registeredDate: "2023-08-15", admitted: true },
  { id: "P020", name: "Hannah Baker", age: 25, dob: "2001-11-29", gender: "Female", bloodGroup: "O+", phone: "555-0120", email: "hannah.b@email.com", address: "680 Palm Ave, Tampa", emergencyContactName: "Mike Baker", emergencyContactPhone: "555-0220", allergies: [], chronicConditions: [], currentMedications: [], insuranceProvider: "Cigna", policyNumber: "CG-12345", insuranceExpiry: "2026-06-30", condition: "Sports Injury", status: "Active", registeredDate: "2024-07-10", admitted: false },
  { id: "P021", name: "Samuel Wright", age: 50, dob: "1976-02-14", gender: "Male", bloodGroup: "B-", phone: "555-0121", email: "sam.w@email.com", address: "791 Laurel Dr, Charlotte", emergencyContactName: "Diana Wright", emergencyContactPhone: "555-0221", allergies: ["Metformin"], chronicConditions: ["Gout"], currentMedications: ["Allopurinol"], insuranceProvider: "UnitedHealth", policyNumber: "UH-45678", insuranceExpiry: "2027-09-30", condition: "Gout", status: "Active", registeredDate: "2024-05-08", admitted: false },
  { id: "P022", name: "Elena Rodriguez", age: 34, dob: "1992-08-23", gender: "Female", bloodGroup: "A+", phone: "555-0122", email: "elena.r@email.com", address: "902 Cypress St, Orlando", emergencyContactName: "Miguel Rodriguez", emergencyContactPhone: "555-0222", allergies: [], chronicConditions: ["Endometriosis"], currentMedications: ["Oral contraceptive"], insuranceProvider: "Aetna", policyNumber: "AE-89012", insuranceExpiry: "2026-11-30", condition: "Endometriosis", status: "Active", registeredDate: "2024-03-15", admitted: false },
  { id: "P023", name: "Frank Harris", age: 61, dob: "1965-05-06", gender: "Male", bloodGroup: "O-", phone: "555-0123", email: "frank.h@email.com", address: "113 Beech Rd, Indianapolis", emergencyContactName: "Sarah Harris", emergencyContactPhone: "555-0223", allergies: ["Statins"], chronicConditions: ["Liver Cirrhosis"], currentMedications: ["Lactulose", "Spironolactone"], insuranceProvider: "Medicare", policyNumber: "MC-78901", insuranceExpiry: "2027-12-31", condition: "Liver Cirrhosis", status: "Admitted", registeredDate: "2023-06-20", admitted: true },
  { id: "P024", name: "Isabel Torres", age: 28, dob: "1998-03-11", gender: "Female", bloodGroup: "B+", phone: "555-0124", email: "isabel.t@email.com", address: "224 Hazel Ct, Columbus", emergencyContactName: "Luis Torres", emergencyContactPhone: "555-0224", allergies: [], chronicConditions: [], currentMedications: [], insuranceProvider: "BlueCross", policyNumber: "BC-90123", insuranceExpiry: "2027-07-31", condition: "Routine Checkup", status: "Active", registeredDate: "2024-08-01", admitted: false },
  { id: "P025", name: "Arthur Henderson", age: 76, dob: "1950-12-25", gender: "Male", bloodGroup: "A-", phone: "555-0125", email: "arthur.h@email.com", address: "335 Fir Ave, San Antonio", emergencyContactName: "Helen Henderson", emergencyContactPhone: "555-0225", allergies: ["NSAIDs"], chronicConditions: ["Parkinson's Disease", "Dementia"], currentMedications: ["Levodopa", "Donepezil"], insuranceProvider: "Medicare", policyNumber: "MC-90123", insuranceExpiry: "2027-12-31", condition: "Parkinson's Disease", status: "Admitted", registeredDate: "2023-05-10", admitted: true },
  { id: "P026", name: "Mei Lin Zhang", age: 43, dob: "1983-07-30", gender: "Female", bloodGroup: "AB+", phone: "555-0126", email: "meilin.z@email.com", address: "446 Sequoia Blvd, Detroit", emergencyContactName: "Wei Zhang", emergencyContactPhone: "555-0226", allergies: [], chronicConditions: ["Lupus"], currentMedications: ["Hydroxychloroquine", "Prednisone"], insuranceProvider: "UnitedHealth", policyNumber: "UH-56789", insuranceExpiry: "2027-03-31", condition: "Lupus", status: "Active", registeredDate: "2024-01-05", admitted: false },
  { id: "P027", name: "Brian Campbell", age: 39, dob: "1987-10-18", gender: "Male", bloodGroup: "O+", phone: "555-0127", email: "brian.c@email.com", address: "557 Alder Ln, Jacksonville", emergencyContactName: "Kelly Campbell", emergencyContactPhone: "555-0227", allergies: [], chronicConditions: [], currentMedications: [], insuranceProvider: "Cigna", policyNumber: "CG-23456", insuranceExpiry: "2026-10-31", condition: "Shoulder Dislocation", status: "Active", registeredDate: "2024-06-15", admitted: false },
  { id: "P028", name: "Dorothy Phillips", age: 65, dob: "1961-04-14", gender: "Female", bloodGroup: "B-", phone: "555-0128", email: "dorothy.p@email.com", address: "668 Linden Way, Memphis", emergencyContactName: "George Phillips", emergencyContactPhone: "555-0228", allergies: ["Amoxicillin"], chronicConditions: ["Osteoporosis", "Hypertension"], currentMedications: ["Alendronate", "Amlodipine"], insuranceProvider: "Medicare", policyNumber: "MC-12345", insuranceExpiry: "2027-12-31", condition: "Osteoporosis", status: "Active", registeredDate: "2023-11-08", admitted: false },
  { id: "P029", name: "Kevin Nguyen", age: 33, dob: "1993-06-07", gender: "Male", bloodGroup: "A+", phone: "555-0129", email: "kevin.n@email.com", address: "779 Oak Hill Dr, Portland", emergencyContactName: "Linh Nguyen", emergencyContactPhone: "555-0229", allergies: [], chronicConditions: ["Epilepsy"], currentMedications: ["Levetiracetam"], insuranceProvider: "Aetna", policyNumber: "AE-34567", insuranceExpiry: "2027-01-31", condition: "Epilepsy", status: "Active", registeredDate: "2024-04-22", admitted: false },
  { id: "P030", name: "Victoria Reed", age: 47, dob: "1979-08-03", gender: "Female", bloodGroup: "O-", phone: "555-0130", email: "victoria.r@email.com", address: "890 Ironwood St, Raleigh", emergencyContactName: "Thomas Reed", emergencyContactPhone: "555-0230", allergies: ["Erythromycin"], chronicConditions: ["Rheumatoid Arthritis"], currentMedications: ["Methotrexate", "Folic acid"], insuranceProvider: "BlueCross", policyNumber: "BC-34567", insuranceExpiry: "2027-06-30", condition: "Rheumatoid Arthritis", status: "Active", registeredDate: "2024-02-28", admitted: false },
  { id: "P031", name: "Daniel Cooper", age: 54, dob: "1972-01-19", gender: "Male", bloodGroup: "AB-", phone: "555-0131", email: "daniel.c@email.com", address: "101 Hemlock Rd, Louisville", emergencyContactName: "Rachel Cooper", emergencyContactPhone: "555-0231", allergies: [], chronicConditions: ["Sleep Apnea"], currentMedications: ["CPAP therapy"], insuranceProvider: "UnitedHealth", policyNumber: "UH-67890", insuranceExpiry: "2026-12-31", condition: "Sleep Apnea", status: "Active", registeredDate: "2024-05-20", admitted: false },
  { id: "P032", name: "Priya Sharma", age: 30, dob: "1996-02-10", gender: "Female", bloodGroup: "B+", phone: "555-0132", email: "priya.s@email.com", address: "212 Mimosa Ct, Sacramento", emergencyContactName: "Raj Sharma", emergencyContactPhone: "555-0232", allergies: [], chronicConditions: [], currentMedications: ["Prenatal vitamins"], insuranceProvider: "Cigna", policyNumber: "CG-56789", insuranceExpiry: "2027-04-30", condition: "Prenatal Care", status: "Active", registeredDate: "2024-07-05", admitted: false },
];

// ─── DOCTORS ──────────────────────────────────────────
export const doctors: Doctor[] = [
  { id: "D001", name: "Dr. Sarah Chen", specialty: "Cardiology", department: "Cardiology", avatar: "", patientsToday: 12, rating: 4.9, status: "Available", gender: "Female", dob: "1980-05-12", phone: "555-1001", email: "sarah.chen@medicore.com", qualification: "MD, FACC", licenseNumber: "MC-10001", experience: 15, bio: "Board-certified cardiologist specializing in interventional cardiology and heart failure management.", languages: ["English", "Mandarin"], consultationFee: 250, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "08:00", endTime: "17:00", maxPatientsPerDay: 20 },
  { id: "D002", name: "Dr. James Wilson", specialty: "Neurology", department: "Neurology", avatar: "", patientsToday: 9, rating: 4.8, status: "In Surgery", gender: "Male", dob: "1975-11-28", phone: "555-1002", email: "james.wilson@medicore.com", qualification: "MD, PhD Neuroscience", licenseNumber: "MC-10002", experience: 20, bio: "Expert in neurodegenerative disorders and minimally invasive neurosurgical techniques.", languages: ["English"], consultationFee: 300, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "09:00", endTime: "18:00", maxPatientsPerDay: 15 },
  { id: "D003", name: "Dr. Priya Patel", specialty: "Pediatrics", department: "Pediatrics", avatar: "", patientsToday: 15, rating: 4.7, status: "Available", gender: "Female", dob: "1985-03-20", phone: "555-1003", email: "priya.patel@medicore.com", qualification: "MD, FAAP", licenseNumber: "MC-10003", experience: 12, bio: "Compassionate pediatrician with expertise in childhood development and neonatal care.", languages: ["English", "Hindi", "Gujarati"], consultationFee: 180, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], startTime: "08:00", endTime: "16:00", maxPatientsPerDay: 25 },
  { id: "D004", name: "Dr. Michael Brown", specialty: "Orthopedics", department: "Orthopedics", avatar: "", patientsToday: 8, rating: 4.6, status: "On Leave", gender: "Male", dob: "1978-07-09", phone: "555-1004", email: "michael.brown@medicore.com", qualification: "MD, FAAOS", licenseNumber: "MC-10004", experience: 18, bio: "Orthopedic surgeon specializing in sports medicine and joint replacement.", languages: ["English", "Spanish"], consultationFee: 275, workingDays: ["Mon", "Tue", "Wed", "Thu"], startTime: "08:00", endTime: "16:00", maxPatientsPerDay: 16 },
  { id: "D005", name: "Dr. Emily Davis", specialty: "Dermatology", department: "Dermatology", avatar: "", patientsToday: 11, rating: 4.9, status: "Available", gender: "Female", dob: "1987-09-14", phone: "555-1005", email: "emily.davis@medicore.com", qualification: "MD, FAAD", licenseNumber: "MC-10005", experience: 10, bio: "Dermatologist with a focus on skin cancer detection, cosmetic dermatology, and autoimmune skin conditions.", languages: ["English", "French"], consultationFee: 220, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "09:00", endTime: "17:00", maxPatientsPerDay: 20 },
  { id: "D006", name: "Dr. Robert Kim", specialty: "General Surgery", department: "Surgery", avatar: "", patientsToday: 6, rating: 4.5, status: "In Surgery", gender: "Male", dob: "1973-02-03", phone: "555-1006", email: "robert.kim@medicore.com", qualification: "MD, FACS", licenseNumber: "MC-10006", experience: 22, bio: "General surgeon with expertise in laparoscopic and minimally invasive surgical procedures.", languages: ["English", "Korean"], consultationFee: 300, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "07:00", endTime: "16:00", maxPatientsPerDay: 10 },
  { id: "D007", name: "Dr. Lisa Wang", specialty: "Oncology", department: "Oncology", avatar: "", patientsToday: 7, rating: 4.8, status: "Available", gender: "Female", dob: "1982-12-01", phone: "555-1007", email: "lisa.wang@medicore.com", qualification: "MD, FASCO", licenseNumber: "MC-10007", experience: 14, bio: "Medical oncologist specializing in breast and lung cancer treatment protocols.", languages: ["English", "Mandarin", "Cantonese"], consultationFee: 350, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "08:00", endTime: "17:00", maxPatientsPerDay: 12 },
  { id: "D008", name: "Dr. Ahmed Hassan", specialty: "ENT", department: "ENT", avatar: "", patientsToday: 10, rating: 4.7, status: "Available", gender: "Male", dob: "1979-06-18", phone: "555-1008", email: "ahmed.hassan@medicore.com", qualification: "MD, FACS", licenseNumber: "MC-10008", experience: 16, bio: "Otolaryngologist with subspecialty in pediatric ENT and cochlear implant surgery.", languages: ["English", "Arabic"], consultationFee: 200, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], startTime: "08:00", endTime: "16:00", maxPatientsPerDay: 18 },
  { id: "D009", name: "Dr. Rachel Green", specialty: "Gynecology", department: "Gynecology", avatar: "", patientsToday: 13, rating: 4.8, status: "Available", gender: "Female", dob: "1984-08-22", phone: "555-1009", email: "rachel.green@medicore.com", qualification: "MD, FACOG", licenseNumber: "MC-10009", experience: 13, bio: "OB/GYN specialist with focus on high-risk pregnancies and minimally invasive gynecological surgery.", languages: ["English"], consultationFee: 230, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "08:00", endTime: "17:00", maxPatientsPerDay: 20 },
  { id: "D010", name: "Dr. Mark Stevens", specialty: "Emergency Medicine", department: "Emergency", avatar: "", patientsToday: 20, rating: 4.6, status: "Available", gender: "Male", dob: "1976-04-05", phone: "555-1010", email: "mark.stevens@medicore.com", qualification: "MD, FACEP", licenseNumber: "MC-10010", experience: 19, bio: "Emergency medicine physician with expertise in trauma care and critical stabilization.", languages: ["English", "Spanish"], consultationFee: 200, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], startTime: "06:00", endTime: "18:00", maxPatientsPerDay: 30 },
  { id: "D011", name: "Dr. Sophie Laurent", specialty: "Radiology", department: "Radiology", avatar: "", patientsToday: 14, rating: 4.7, status: "Available", gender: "Female", dob: "1981-10-30", phone: "555-1011", email: "sophie.laurent@medicore.com", qualification: "MD, FACR", licenseNumber: "MC-10011", experience: 15, bio: "Diagnostic radiologist with subspecialty in interventional radiology and breast imaging.", languages: ["English", "French"], consultationFee: 280, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "08:00", endTime: "17:00", maxPatientsPerDay: 20 },
  { id: "D012", name: "Dr. David Park", specialty: "Psychiatry", department: "General Medicine", avatar: "", patientsToday: 8, rating: 4.5, status: "Available", gender: "Male", dob: "1983-01-15", phone: "555-1012", email: "david.park@medicore.com", qualification: "MD, FAPA", licenseNumber: "MC-10012", experience: 11, bio: "Psychiatrist focusing on anxiety, depression, and PTSD treatment with integrative approaches.", languages: ["English", "Korean"], consultationFee: 260, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "09:00", endTime: "17:00", maxPatientsPerDay: 12 },
  { id: "D013", name: "Dr. Ana Morales", specialty: "Internal Medicine", department: "General Medicine", avatar: "", patientsToday: 16, rating: 4.8, status: "Available", gender: "Female", dob: "1986-05-27", phone: "555-1013", email: "ana.morales@medicore.com", qualification: "MD, FACP", licenseNumber: "MC-10013", experience: 11, bio: "Internist with expertise in managing complex chronic diseases and preventive medicine.", languages: ["English", "Spanish", "Portuguese"], consultationFee: 190, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "08:00", endTime: "17:00", maxPatientsPerDay: 22 },
  { id: "D014", name: "Dr. Thomas Müller", specialty: "Anesthesiology", department: "Surgery", avatar: "", patientsToday: 5, rating: 4.9, status: "In Surgery", gender: "Male", dob: "1974-09-08", phone: "555-1014", email: "thomas.muller@medicore.com", qualification: "MD, FASA", licenseNumber: "MC-10014", experience: 21, bio: "Anesthesiologist with expertise in cardiac anesthesia and pain management.", languages: ["English", "German"], consultationFee: 350, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "06:00", endTime: "16:00", maxPatientsPerDay: 8 },
  { id: "D015", name: "Dr. Nadia Okafor", specialty: "Nephrology", department: "General Medicine", avatar: "", patientsToday: 9, rating: 4.6, status: "Available", gender: "Female", dob: "1988-11-13", phone: "555-1015", email: "nadia.okafor@medicore.com", qualification: "MD, FASN", licenseNumber: "MC-10015", experience: 9, bio: "Nephrologist specializing in kidney transplant evaluation and dialysis management.", languages: ["English", "Igbo"], consultationFee: 240, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "08:00", endTime: "17:00", maxPatientsPerDay: 15 },
  { id: "D016", name: "Dr. Alex Turner", specialty: "Pulmonology", department: "General Medicine", avatar: "", patientsToday: 10, rating: 4.7, status: "Available", gender: "Male", dob: "1980-03-22", phone: "555-1016", email: "alex.turner@medicore.com", qualification: "MD, FCCP", licenseNumber: "MC-10016", experience: 16, bio: "Pulmonologist focusing on COPD, asthma, and critical care pulmonary medicine.", languages: ["English"], consultationFee: 230, workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], startTime: "08:00", endTime: "17:00", maxPatientsPerDay: 18 },
];

// ─── APPOINTMENTS ─────────────────────────────────────
const appointmentReasons = ["Routine Checkup", "Follow-up", "Consultation", "Lab Review", "Prescription Refill", "Emergency", "Pre-Surgery", "Post-Surgery"];
const generateAppointments = (): Appointment[] => {
  const appts: Appointment[] = [];
  let counter = 1;
  for (let dayOffset = -5; dayOffset <= 25; dayOffset++) {
    const d = addDays(today, dayOffset);
    const count = dayOffset === 0 ? 10 : Math.floor(Math.random() * 5) + 2;
    for (let j = 0; j < count; j++) {
      const h = 8 + Math.floor(Math.random() * 9);
      const m = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      const doc = doctors[Math.floor(Math.random() * doctors.length)];
      const pat = patients[Math.floor(Math.random() * patients.length)];
      const statuses: AppointmentStatus[] = dayOffset < 0 ? ["Completed", "Cancelled", "No-show"] : dayOffset === 0 ? ["Confirmed", "Pending", "Completed"] : ["Confirmed", "Pending"];
      appts.push({
        id: `A${String(counter++).padStart(3, "0")}`,
        patientId: pat.id,
        patient: pat.name,
        doctorId: doc.id,
        doctor: doc.name,
        department: doc.department,
        date: dateStr(d),
        time: format(setMinutes(setHours(d, h), m), "hh:mm a"),
        type: Math.random() > 0.85 ? "Emergency" : Math.random() > 0.7 ? "Video" : "In-Person",
        status: statuses[Math.floor(Math.random() * statuses.length)],
        reason: appointmentReasons[Math.floor(Math.random() * appointmentReasons.length)],
        notes: "",
      });
    }
  }
  return appts;
};
export const appointments: Appointment[] = generateAppointments();

// ─── DEPARTMENTS ──────────────────────────────────────
export const departments: Department[] = [
  { id: "DEP01", name: "Cardiology", icon: "Heart", headDoctor: "Dr. Sarah Chen", totalDoctors: 4, totalBeds: 30, occupied: 24, description: "Diagnosis and treatment of heart and cardiovascular diseases." },
  { id: "DEP02", name: "Neurology", icon: "Brain", headDoctor: "Dr. James Wilson", totalDoctors: 3, totalBeds: 25, occupied: 18, description: "Treatment of nervous system disorders including brain and spinal cord." },
  { id: "DEP03", name: "Pediatrics", icon: "Baby", headDoctor: "Dr. Priya Patel", totalDoctors: 5, totalBeds: 35, occupied: 28, description: "Medical care for infants, children, and adolescents." },
  { id: "DEP04", name: "Orthopedics", icon: "Bone", headDoctor: "Dr. Michael Brown", totalDoctors: 3, totalBeds: 20, occupied: 15, description: "Treatment of musculoskeletal system including bones, joints, and muscles." },
  { id: "DEP05", name: "Oncology", icon: "Ribbon", headDoctor: "Dr. Lisa Wang", totalDoctors: 4, totalBeds: 22, occupied: 20, description: "Cancer diagnosis, treatment, and supportive care." },
  { id: "DEP06", name: "Surgery", icon: "Scissors", headDoctor: "Dr. Robert Kim", totalDoctors: 5, totalBeds: 28, occupied: 22, description: "General and specialized surgical procedures." },
  { id: "DEP07", name: "ENT", icon: "Ear", headDoctor: "Dr. Ahmed Hassan", totalDoctors: 2, totalBeds: 15, occupied: 9, description: "Ear, nose, and throat disorders treatment." },
  { id: "DEP08", name: "Dermatology", icon: "Scan", headDoctor: "Dr. Emily Davis", totalDoctors: 2, totalBeds: 10, occupied: 5, description: "Skin, hair, and nail conditions diagnosis and treatment." },
  { id: "DEP09", name: "Emergency", icon: "Siren", headDoctor: "Dr. Mark Stevens", totalDoctors: 6, totalBeds: 40, occupied: 35, description: "24/7 emergency medical care and trauma treatment." },
  { id: "DEP10", name: "Radiology", icon: "ScanLine", headDoctor: "Dr. Sophie Laurent", totalDoctors: 3, totalBeds: 5, occupied: 2, description: "Medical imaging and diagnostic radiology services." },
  { id: "DEP11", name: "Gynecology", icon: "Heart", headDoctor: "Dr. Rachel Green", totalDoctors: 3, totalBeds: 20, occupied: 14, description: "Women's reproductive health and maternity care." },
  { id: "DEP12", name: "General Medicine", icon: "Stethoscope", headDoctor: "Dr. Ana Morales", totalDoctors: 6, totalBeds: 35, occupied: 25, description: "Primary care and internal medicine for adult patients." },
];

// ─── WARDS & BEDS ─────────────────────────────────────
const createBeds = (wardName: string, total: number, occupiedCount: number, maintenanceCount: number): Bed[] => {
  const beds: Bed[] = [];
  const occupiedPatients = patients.filter(p => p.admitted);
  let occIdx = 0;
  for (let i = 1; i <= total; i++) {
    let status: BedStatus = "Available";
    let patientId: string | undefined;
    let patientName: string | undefined;
    if (i <= occupiedCount && occIdx < occupiedPatients.length) {
      status = "Occupied";
      patientId = occupiedPatients[occIdx % occupiedPatients.length].id;
      patientName = occupiedPatients[occIdx % occupiedPatients.length].name;
      occIdx++;
    } else if (i <= occupiedCount + maintenanceCount) {
      status = "Maintenance";
    } else if (Math.random() > 0.9) {
      status = "Reserved";
    }
    beds.push({ id: `${wardName}-B${String(i).padStart(2, "0")}`, number: `${wardName.charAt(0)}${String(i).padStart(2, "0")}`, status, patientId, patientName });
  }
  return beds;
};

export const wards: Ward[] = [
  { id: "W01", name: "General Ward", department: "General Medicine", beds: createBeds("GEN", 30, 20, 2) },
  { id: "W02", name: "ICU", department: "Emergency", beds: createBeds("ICU", 15, 13, 1) },
  { id: "W03", name: "Emergency", department: "Emergency", beds: createBeds("EMR", 20, 16, 1) },
  { id: "W04", name: "Maternity", department: "Gynecology", beds: createBeds("MAT", 18, 12, 1) },
  { id: "W05", name: "Pediatric", department: "Pediatrics", beds: createBeds("PED", 20, 14, 2) },
  { id: "W06", name: "Private", department: "General Medicine", beds: createBeds("PVT", 12, 8, 1) },
];

// ─── MEDICAL RECORDS ──────────────────────────────────
export const medicalRecords: MedicalRecord[] = [
  { id: "MR001", patientId: "P001", date: "2024-01-20", type: "Visit", description: "Initial consultation for hypertension management", doctor: "Dr. Sarah Chen" },
  { id: "MR002", patientId: "P001", date: "2024-02-15", type: "Diagnosis", description: "Stage 2 hypertension confirmed, started on Lisinopril", doctor: "Dr. Sarah Chen" },
  { id: "MR003", patientId: "P001", date: "2024-03-10", type: "Visit", description: "Follow-up: BP improved, continue current medications", doctor: "Dr. Sarah Chen" },
  { id: "MR004", patientId: "P003", date: "2023-12-01", type: "Diagnosis", description: "Diabetes Type 2 diagnosed, A1C 8.2%", doctor: "Dr. Ana Morales" },
  { id: "MR005", patientId: "P003", date: "2024-01-15", type: "Treatment", description: "Started Metformin 500mg, dietary counseling", doctor: "Dr. Ana Morales" },
  { id: "MR006", patientId: "P005", date: "2024-02-20", type: "Surgery", description: "Cardiac catheterization performed, stent placed", doctor: "Dr. Sarah Chen" },
  { id: "MR007", patientId: "P007", date: "2024-02-25", type: "Surgery", description: "Laparoscopic cholecystectomy completed", doctor: "Dr. Robert Kim" },
  { id: "MR008", patientId: "P009", date: "2024-01-10", type: "Diagnosis", description: "COPD exacerbation, started on Tiotropium", doctor: "Dr. Alex Turner" },
  { id: "MR009", patientId: "P012", date: "2024-01-15", type: "Treatment", description: "Lithotripsy for kidney stones", doctor: "Dr. Nadia Okafor" },
  { id: "MR010", patientId: "P013", date: "2024-01-05", type: "Visit", description: "Stroke rehabilitation progress assessment", doctor: "Dr. James Wilson" },
];

// ─── PRESCRIPTIONS ────────────────────────────────────
export const prescriptions: Prescription[] = [
  { id: "RX001", patientId: "P001", date: "2024-03-10", doctor: "Dr. Sarah Chen", medicines: [{ name: "Lisinopril", dosage: "10mg once daily", duration: "3 months" }, { name: "Aspirin", dosage: "81mg once daily", duration: "Ongoing" }] },
  { id: "RX002", patientId: "P003", date: "2024-02-15", doctor: "Dr. Ana Morales", medicines: [{ name: "Metformin", dosage: "500mg twice daily", duration: "6 months" }, { name: "Insulin Glargine", dosage: "20 units at bedtime", duration: "Ongoing" }] },
  { id: "RX003", patientId: "P004", date: "2024-03-20", doctor: "Dr. James Wilson", medicines: [{ name: "Sumatriptan", dosage: "50mg as needed", duration: "As needed" }] },
  { id: "RX004", patientId: "P005", date: "2024-03-01", doctor: "Dr. Sarah Chen", medicines: [{ name: "Amiodarone", dosage: "200mg once daily", duration: "6 months" }, { name: "Warfarin", dosage: "5mg once daily", duration: "Ongoing" }] },
  { id: "RX005", patientId: "P009", date: "2024-02-10", doctor: "Dr. Alex Turner", medicines: [{ name: "Tiotropium", dosage: "18mcg inhaled daily", duration: "Ongoing" }, { name: "Prednisone", dosage: "20mg taper", duration: "2 weeks" }] },
];

// ─── LAB RESULTS ──────────────────────────────────────
export const labResults: LabResult[] = [
  { id: "LR001", patientId: "P001", testName: "Complete Blood Count", date: "2024-03-08", status: "Completed", result: "WBC: 7.2, RBC: 4.8, Hgb: 14.2", doctor: "Dr. Sarah Chen" },
  { id: "LR002", patientId: "P001", testName: "Lipid Panel", date: "2024-03-08", status: "Completed", result: "Total Chol: 210, LDL: 130, HDL: 52, Trig: 140", doctor: "Dr. Sarah Chen" },
  { id: "LR003", patientId: "P003", testName: "HbA1c", date: "2024-02-12", status: "Completed", result: "7.8%", doctor: "Dr. Ana Morales" },
  { id: "LR004", patientId: "P003", testName: "Fasting Blood Glucose", date: "2024-03-15", status: "Pending", doctor: "Dr. Ana Morales" },
  { id: "LR005", patientId: "P005", testName: "ECG", date: "2024-03-05", status: "Completed", result: "Sinus rhythm, occasional PVCs", doctor: "Dr. Sarah Chen" },
  { id: "LR006", patientId: "P009", testName: "Pulmonary Function Test", date: "2024-02-20", status: "Completed", result: "FEV1: 58% predicted", doctor: "Dr. Alex Turner" },
  { id: "LR007", patientId: "P012", testName: "Kidney Function Panel", date: "2024-01-18", status: "Completed", result: "Creatinine: 1.4, BUN: 22, GFR: 65", doctor: "Dr. Nadia Okafor" },
  { id: "LR008", patientId: "P019", testName: "PSA Test", date: "2024-03-01", status: "Pending", doctor: "Dr. Ana Morales" },
];

// ─── INVOICES ─────────────────────────────────────────
export const invoices: Invoice[] = [
  { id: "INV001", patientId: "P001", date: "2024-03-10", amount: 450, status: "Paid", description: "Cardiology consultation + ECG" },
  { id: "INV002", patientId: "P003", date: "2024-02-15", amount: 380, status: "Paid", description: "Endocrinology consultation + blood work" },
  { id: "INV003", patientId: "P005", date: "2024-03-01", amount: 12500, status: "Pending", description: "Cardiac catheterization + stent placement" },
  { id: "INV004", patientId: "P007", date: "2024-02-25", amount: 8200, status: "Paid", description: "Laparoscopic surgery + 3 day stay" },
  { id: "INV005", patientId: "P009", date: "2024-02-10", amount: 1200, status: "Overdue", description: "Pulmonology consultation + PFT" },
  { id: "INV006", patientId: "P012", date: "2024-01-18", amount: 6500, status: "Paid", description: "Lithotripsy procedure" },
  { id: "INV007", patientId: "P014", date: "2024-05-12", amount: 320, status: "Paid", description: "Emergency room visit + allergy treatment" },
  { id: "INV008", patientId: "P019", date: "2024-03-01", amount: 2800, status: "Pending", description: "Oncology consultation + biopsy" },
];

// ─── VITALS ───────────────────────────────────────────
export const generateVitals = (patientId: string): VitalRecord[] => {
  return Array.from({ length: 14 }, (_, i) => ({
    date: format(subDays(today, 13 - i), "MMM dd"),
    systolic: 110 + Math.floor(Math.random() * 40),
    diastolic: 65 + Math.floor(Math.random() * 25),
    heartRate: 60 + Math.floor(Math.random() * 30),
    temperature: +(97 + Math.random() * 3).toFixed(1),
    weight: 150 + Math.floor(Math.random() * 20),
  }));
};

// ─── REVIEWS ──────────────────────────────────────────
export const reviews: Review[] = [
  { id: "RV001", doctorId: "D001", patientName: "John Smith", rating: 5, comment: "Dr. Chen is incredibly thorough. She explained everything clearly and made me feel at ease.", date: "2024-03-15" },
  { id: "RV002", doctorId: "D001", patientName: "Carlos Garcia", rating: 5, comment: "Excellent cardiologist. Very attentive and caring.", date: "2024-02-28" },
  { id: "RV003", doctorId: "D002", patientName: "Henry Adams", rating: 4, comment: "Dr. Wilson is very knowledgeable. Wait times could be shorter.", date: "2024-01-20" },
  { id: "RV004", doctorId: "D003", patientName: "Mary Johnson", rating: 5, comment: "Dr. Patel is wonderful with children. My kids love her!", date: "2024-03-05" },
  { id: "RV005", doctorId: "D005", patientName: "Aisha Khan", rating: 5, comment: "Dr. Davis resolved my skin issue in one visit. Highly recommended.", date: "2024-02-14" },
  { id: "RV006", doctorId: "D007", patientName: "George Mitchell", rating: 4, comment: "Compassionate care during a difficult time. Thank you Dr. Wang.", date: "2024-01-30" },
  { id: "RV007", doctorId: "D008", patientName: "Fatima Ali", rating: 5, comment: "Dr. Hassan fixed my ear issue completely. Great doctor!", date: "2024-03-18" },
  { id: "RV008", doctorId: "D010", patientName: "Oscar Fernandez", rating: 4, comment: "Quick and efficient in the ER. Saved my life.", date: "2024-04-02" },
  { id: "RV009", doctorId: "D013", patientName: "Victoria Reed", rating: 5, comment: "Dr. Morales takes time to listen. Best internist I've had.", date: "2024-03-10" },
  { id: "RV010", doctorId: "D003", patientName: "Hannah Baker", rating: 4, comment: "Very patient and understanding. Great with young adults too.", date: "2024-07-15" },
];

// ─── DASHBOARD DATA (keeping legacy references) ──────
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
