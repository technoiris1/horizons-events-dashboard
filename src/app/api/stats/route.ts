import { NextResponse } from "next/server";
import { getStats } from "@/lib/stats";

export async function GET() {
  try {
    const stats = await getStats();

    return NextResponse.json(stats);
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