import fs from "fs/promises";
import Papa from "papaparse";
import { Participant } from "./types";

let cache: Participant[] | null = null;

export async function loadParticipants() {
  if (cache) return cache;

  const csv = await fs.readFile("src/data/arcana.csv", "utf8");

  const parsed = Papa.parse<Participant>(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  cache = parsed.data;

  return cache;
}

export function clearCache() {
  cache = null;
}