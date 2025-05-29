import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CraftSectionSkeleton() {
  return (
    <Card aria-busy="true" aria-label="Loading CRAFT details section">
      <CardHeader>
        <CardTitle>CRAFT details</CardTitle>
        <CardDescription>
          Provides custom values for the CRAFT clearance when shown to the
          student.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4"
          aria-hidden="true"
        >
          <div className="col-span-4">
            <Skeleton className="h-8" />
          </div>
          <div className="col-span-4">
            <Skeleton className="h-8" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-4">
            <Skeleton className="h-8" />
          </div>
          <div className="col-span-4">
            <Skeleton className="h-8" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-4">
            <Skeleton className="h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
