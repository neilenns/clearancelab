import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PlanSectionSkeleton() {
  return (
    <Card aria-busy="true" aria-label="Loading plan details section">
      <CardHeader>
        <CardTitle>Flight plan</CardTitle>
        <CardDescription>
          Enter the flight plan details. The flight plan does not have to be
          valid.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-2 items-start mb-4">
          <div className="col-span-2">
            <Skeleton className="h-8" />
          </div>

          <div className="col-span-2">
            <Skeleton className="h-8" />
          </div>

          <div className="col-span-2">
            <Skeleton className="h-8" />
          </div>

          <div className="col-span-2">
            <Skeleton className="h-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-2 items-start mb-4">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <Skeleton className="h-8" />
          </div>
          <div className="w-1/2">
            <Skeleton className="h-8" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Skeleton className="h-8" />
      </CardFooter>
    </Card>
  );
}
