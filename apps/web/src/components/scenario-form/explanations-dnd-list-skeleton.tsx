import { Skeleton } from "@/components/ui/skeleton";

export const ExplanationsDndListSkeleton = () => {
  return (
    <div
      className="flex items-end space-x-4 mb-4"
      aria-busy="true"
      aria-label="Loading explanations"
      role="row"
    >
      <div className="w-6" role="cell">
        <Skeleton className="h-8" />
      </div>
      <div className="w-28" role="cell">
        <Skeleton className="h-8" />
      </div>
      <div className="flex-1" role="cell">
        <Skeleton className="h-8" />
      </div>
      <div className="flex-1" role="cell">
        <Skeleton className="h-8" />
      </div>
      <div className="w-10" role="cell">
        <Skeleton className="h-8" />
      </div>
    </div>
  );
};
