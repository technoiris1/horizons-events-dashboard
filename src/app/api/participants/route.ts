import { NextResponse } from "next/server";
import { getParticipants } from "@/lib/participants";

export async function GET() {
  try {
    const participants = await getParticipants();

    return NextResponse.json({
      success: true,
      count: participants.length,
      data: participants,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load participants.",
      },
      { status: 500 }
    );
  }
}