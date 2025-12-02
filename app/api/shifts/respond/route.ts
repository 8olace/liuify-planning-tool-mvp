import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireAdmin } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { application_id, status, admin_id } = body;

    if (!application_id || !status || !admin_id) {
      return NextResponse.json(
        { error: "Missing required fields: application_id, status, admin_id" },
        { status: 400 }
      );
    }

    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'accepted' or 'rejected'" },
        { status: 400 }
      );
    }

    // Verify admin authorization
    const adminCheck = await requireAdmin(admin_id);
    if (!adminCheck.isAuthorized) {
      return NextResponse.json(
        { error: adminCheck.error },
        { status: 403 }
      );
    }

    const supabase = supabaseServer();

    // Update application status
    const { data, error } = await supabase
      .from("shift_applications")
      .update({ status })
      .eq("id", application_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If accepted, update shift status to 'assigned'
    if (status === "accepted") {
      const { error: updateError } = await supabase
        .from("shifts")
        .update({ status: "assigned" })
        .eq("id", data.shift_id);

      if (updateError) {
        console.error("Error updating shift status:", updateError);
      }
    }

    return NextResponse.json(
      { message: `Application ${status} successfully`, application: data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
