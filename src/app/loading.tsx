import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-8">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Loading dashboard...</span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="rounded-xl shadow-sm">
              <CardHeader className="space-y-2 pb-3">
                <Skeleton className="h-4 w-32" />
              </CardHeader>

              <CardContent>
                <Skeleton className="h-12 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {[...Array(2)].map((_, index) => (
            <Card key={index} className="rounded-xl shadow-sm">
              <CardHeader className="space-y-2 pb-3">
                <Skeleton className="h-5 w-40" />
              </CardHeader>

              <CardContent className="space-y-3">
                <Skeleton className="h-64 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}