import { base } from "@/lib/airtable";
import { Participant } from "@/lib/types";

export type AirtableParticipant = Participant & { id: string };

export async function getParticipants(): Promise<AirtableParticipant[]> {
  const overall_records = await base("Arcana participants")
    .select()
    .all();

  return overall_records.map((record) => ({
    id: record.id,
    ...(record.fields as Participant),
  }));
}