import { getParticipants as getAirtableParticipants } from "./overall_data";
import type { AirtableParticipant } from "./overall_data";

export async function getParticipants(): Promise<AirtableParticipant[]> {
  return await getAirtableParticipants();
}