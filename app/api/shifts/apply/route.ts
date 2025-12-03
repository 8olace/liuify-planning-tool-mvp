import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { shift_id, user_id } = body;

    if (!shift_id || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields: shift_id, user_id" },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Check if user already applied for this shift
    const { data: existingApp, error: checkError } = await supabase
      .from("shift_applications")
      .select("id")
      .eq("shift_id", shift_id)
      .eq("user_id", user_id)
      .single();

    if (existingApp) {
      return NextResponse.json(
        { error: "You have already applied for this shift" },
        { status: 409 }
      );
    }

    // Create new application
    const { data, error } = await supabase
      .from("shift_applications")
      .insert({
        shift_id,
        user_id,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Application submitted successfully", application: data },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
