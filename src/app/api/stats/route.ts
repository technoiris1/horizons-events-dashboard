import { NextResponse } from "next/server";
import {loadParticipants} from "@/lib/csv"

export async function GET() {
  try {
    const participants = await loadParticipants();
    let approvedHours = 0
    let loggedHours = 0
    let inreviewHours = 0
    let unsubmittedHours = 0
    let rejectedHours = 0
    for (const participant of participants) {
        approvedHours += Number(participant["Approved hours"] ?? 0);
        loggedHours += Number(participant["Tracked hours"] ?? 0);
        inreviewHours += Number(participant["Hours in review"] ?? 0);
        unsubmittedHours += Number(participant["Un-submitted hours"] ?? 0)        
    }

    rejectedHours = loggedHours - (approvedHours + inreviewHours + unsubmittedHours)
    return NextResponse.json({
      success: true,
      count: participants.length,
      approvedHours: approvedHours,
      loggedHours: loggedHours,
      rejectedHours : rejectedHours,
      inreviewHours: inreviewHours,
      unsubmittedHours : unsubmittedHours
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