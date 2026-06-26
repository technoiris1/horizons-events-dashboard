import { NextResponse } from "next/server";
import {loadParticipants} from "@/lib/csv"

export async function GET() {
  try {
    const participants = await loadParticipants();

    return NextResponse.json({
      success: true,
      count: participants.length,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load participants count.",
      },
      { status: 500 }
    );
  }
}