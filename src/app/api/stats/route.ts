import { NextResponse } from "next/server";
import { getParticipants } from "@/lib/participants";

export async function GET() {
  try {
    const participants = await getParticipants();
    let approvedHours = 0
    let loggedHours = 0
    let inreviewHours = 0
    let unsubmittedHours = 0
    let rejectedHours = 0
    const countryCounts: Record<string, number> = {};

    for (const participant of participants) {
        approvedHours += Number(participant["Approved hours"] ?? 0);
        loggedHours += Number(participant["Tracked hours"] ?? 0);
        inreviewHours += Number(participant["Hours in review"] ?? 0);
        unsubmittedHours += Number(participant["Un-submitted hours"] ?? 0)        
        const country = String(participant["Country"] ?? "Unknown");
        countryCounts[country] = (countryCounts[country] ?? 0) + 1;
    }


    const countries = Object.entries(countryCounts)
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort((a, b) => b.count - a.count);
  
  const topCountries = countries.slice(0, 9);
  
  const otherCount = countries
    .slice(9)
    .reduce((sum, country) => sum + country.count, 0);
  
  if (otherCount > 0) {
    topCountries.push({
      country: "Other",
      count: otherCount,
    });
  }

    rejectedHours = loggedHours - (approvedHours + inreviewHours + unsubmittedHours)
    return NextResponse.json({
      success: true,
      count: participants.length,
      approvedHours: approvedHours,
      loggedHours: loggedHours,
      rejectedHours : rejectedHours,
      inreviewHours: inreviewHours,
      unsubmittedHours : unsubmittedHours,
      countries: topCountries,
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