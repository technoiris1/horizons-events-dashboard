import { loadParticipants } from "./csv";

export async function getParticipants() {
  return await loadParticipants();
}