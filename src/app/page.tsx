  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import {
    Users,
    Clock3,
    CheckCircle,
  } from "lucide-react";

  import HoursPieChart from "@/app/components/hours-pie-chart";
  import CountryPieChart from "@/app/components/countries-pie-chart"
  import { getStats } from "@/lib/stats";

  export default async function Home() {
    const stats = await getStats();

    return (
      <div className="flex flex-col gap-8 p-8">
        <div className="rounded-xl border-4 border-yellow-400 bg-yellow-300 px-6 py-4 text-center text-3xl font-black uppercase tracking-wide text-yellow-950 shadow-lg">
          THIS IS DUMMY DATA
        </div>

        <div className="flex items-center gap-4">
          <img
            src="https://horizons.hackclub.com/logos/arcana.webp"
            alt="Arcana"
            className="h-12 w-auto"
          />

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Horizons Arcana
            </h1>

            <p className="text-muted-foreground">
              deets abt your event ig
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">

          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Signups
              </CardTitle>

              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-5xl font-bold tracking-tight">
                {stats.count.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved Hours
              </CardTitle>

              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-5xl font-bold tracking-tight">
                {Math.round(stats.approvedHours).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tracked Hours
              </CardTitle>

              <Clock3 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-5xl font-bold tracking-tight">
                {Math.round(stats.loggedHours).toLocaleString()}
              </div>
            </CardContent>
          </Card>


        </div>
        <div className="grid gap-6 xl:grid-cols-2">

<Card className="rounded-xl shadow-sm">
  <CardHeader>
    <CardTitle>Tracked Hours Breakdown</CardTitle>
  </CardHeader>

  <CardContent>
    <HoursPieChart
      approved={stats.approvedHours}
      rejected={stats.rejectedHours}
      inReview={stats.inreviewHours}
      unsubmitted={stats.unsubmittedHours}
    />
  </CardContent>
</Card>

<Card className="rounded-xl shadow-sm">
  <CardHeader>
    <CardTitle>Participants by Country</CardTitle>
  </CardHeader>

  <CardContent>
    <CountryPieChart
      countries={stats.countries}
    />
  </CardContent>
</Card>

</div>
      </div>
    );
  }