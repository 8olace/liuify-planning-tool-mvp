import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function requireAdmin(userId: string) {
  const supabase = supabaseServer();

  const { data: user, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !user) {
    return {
      isAuthorized: false,
      error: "User not found",
    };
  }

  if (user.role !== "admin") {
    return {
      isAuthorized: false,
      error: "Unauthorized: Admin access required",
    };
  }

  return {
    isAuthorized: true,
  };
}
