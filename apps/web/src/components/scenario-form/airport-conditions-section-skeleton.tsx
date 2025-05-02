import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AirportConditionsSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Airport conditions</CardTitle>
        <CardDescription>
          Provides additional context required to evaluate and clear the flight plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-2 items-start mb-4">
          <div>
            <Skeleton className="h-8" />
          </div>
          <div>
            <Skeleton className="h-8" />
          </div>
          <div>
            <Skeleton className="h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
