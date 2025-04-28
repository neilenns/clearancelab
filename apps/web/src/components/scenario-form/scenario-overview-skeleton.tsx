import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ScenarioOverviewSkeleton() {
  return (
    <Card aria-busy="true" aria-label="Loading scenario overview section">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-4">
            <Skeleton className="h-8" />
          </div>

          <div className="col-span-4">
            <Skeleton className="h-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-8">
            <Skeleton className="h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
