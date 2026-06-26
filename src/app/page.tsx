import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Clock3,
  CheckCircle,
} from "lucide-react";

interface Stats {
  success: boolean;
  count: number;
  approvedHours: number;
  loggedHours: number;
}

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/stats", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const stats: Stats = await res.json();

  return (
    <div className="flex flex-col gap-8 p-8">

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
            Participant Analytics Dashboard
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
    </div>
  );
}