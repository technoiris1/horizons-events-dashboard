import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  throw new Error(
    "Missing Airtable env vars. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in .env.local."
  );
}

Airtable.configure({
  apiKey,
});

export const base = Airtable.base(baseId);