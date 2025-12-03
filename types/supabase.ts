export type Role = "admin" | "staff";

export interface User {
  id: string;
  email: string | null;
  role: Role;
  created_at: string | null;
}

export interface Shift {
  id: string;
  title: string;
  description: string | null;
  shift_date: string;
  start_time: string;
  end_time: string;
  status: "open" | "accepted" | "completed";
  created_by: string;
  created_at: string;
}

export interface ShiftApplication {
  id: string;
  shift_id: string;
  user_id: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}
