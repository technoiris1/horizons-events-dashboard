import { getParticipants } from "@/lib/participants";
import { columns } from "@/app/components/participants/columns"
import DataTable from "@/app/components/participants/data-table"

export default async function ParticipantsPage() {
  const participants = await getParticipants();

  return (
    <div className="p-8">
      <DataTable
        columns={columns}
        data={participants}
      />
    </div>
  );
}