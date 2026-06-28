import { columns } from "@/app/components/participants/columns"
import DataTable from "@/app/components/participants/data-table"
import { Participant } from "@/lib/types"

interface ApiResponse {
  success: boolean;
  data: Participant[];
}

export default async function ParticipantsPage() {
  const res = await fetch(
    "http://localhost:3000/api/participants",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch participants");
  }

  const participants: ApiResponse =
    await res.json();

  return (
    <div className="p-8">
      <DataTable
        columns={columns}
        data={participants.data}
      />
    </div>
  );
}