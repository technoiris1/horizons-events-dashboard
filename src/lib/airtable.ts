import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY!,
});

export const base_auth = Airtable.base(process.env.AIRTABLE_BASE_ID_AUTH!);
export const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);