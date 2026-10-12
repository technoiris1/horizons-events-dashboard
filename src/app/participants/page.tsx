import { getParticipants } from "@/lib/participants";
import { columns } from "@/app/components/participants/columns"
import DataTable from "@/app/components/participants/data-table"

export default async function ParticipantsPage() {
  const participants = await getParticipants();

  return (
    <div className="p-8">
      <div className="mb-6 rounded-xl border-4 border-yellow-400 bg-yellow-300 px-6 py-4 text-center text-3xl font-black uppercase tracking-wide text-yellow-950 shadow-lg">
        THIS IS DUMMY DATA
      </div>
      <DataTable
        columns={columns}
        data={participants}
      />
    </div>
  );
}