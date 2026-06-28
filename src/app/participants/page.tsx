import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Participant {
  [key: string]: string | number | null;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: Participant[];
}

export default async function ParticipantsPage() {
  const res = await fetch("http://localhost:3000/api/participants", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch participants.");
  }

  const { data }: ApiResponse = await res.json();

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Participant Analytics
        </h1>

        <p className="text-muted-foreground">
          Browse all hackathon participants.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Participants ({data.length.toLocaleString()})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-muted/50 backdrop-blur">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">
                    Name
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Country
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    Approved
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    In Review
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    Unsubmitted
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    Submitted
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    Tracked
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((participant, index) => (
                  <tr
                    key={participant["Slack ID"]?.toString() ?? index}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    <td className="px-4 py-3 font-medium">
                      {participant["Display Name"]}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {participant["Email"]}
                    </td>

                    <td className="px-4 py-3">
                      {participant["Country"]}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {participant["Approved hours"]}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {participant["Hours in review"]}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {participant["Un-submitted hours"]}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {participant["Submitted hours"]}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold">
                      {participant["Tracked hours"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}