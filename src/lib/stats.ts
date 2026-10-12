import { getParticipants } from "@/lib/participants";

export interface Stats {
  success: boolean;
  count: number;
  approvedHours: number;
  loggedHours: number;
  rejectedHours: number;
  inreviewHours: number;
  unsubmittedHours: number;
  countries: {
    country: string;
    count: number;
  }[];
}

export async function getStats(): Promise<Stats> {
  const participants = await getParticipants();

  let approvedHours = 0;
  let loggedHours = 0;
  let inreviewHours = 0;
  let unsubmittedHours = 0;
  const countryCounts: Record<string, number> = {};

  for (const participant of participants) {
    approvedHours += Number(participant["Approved hours"] ?? 0);
    loggedHours += Number(participant["Tracked hours"] ?? 0);
    inreviewHours += Number(participant["Hours in review"] ?? 0);
    unsubmittedHours += Number(participant["Un-submitted hours"] ?? 0);

    const country = String(participant["Country"] ?? "Unknown");
    countryCounts[country] = (countryCounts[country] ?? 0) + 1;
  }

  const countries = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  const topCountries = countries.slice(0, 9);
  const otherCount = countries.slice(9).reduce((sum, country) => sum + country.count, 0);

  if (otherCount > 0) {
    topCountries.push({
      country: "Other",
      count: otherCount,
    });
  }

  const rejectedHours = loggedHours - (approvedHours + inreviewHours + unsubmittedHours);

  return {
    success: true,
    count: participants.length,
    approvedHours,
    loggedHours,
    rejectedHours,
    inreviewHours,
    unsubmittedHours,
    countries: topCountries,
  };
}
