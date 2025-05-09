import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ExplanationsSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explanations</CardTitle>
        <CardDescription id="explanations-section-description">
          A list of explanations for the filed flight plan, describing any
          issues or offering tips to the student.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="flex items-end space-x-4 mb-4"
          aria-busy="true"
          aria-label="Loading explanations"
        >
          <div className="w-6">
            <Skeleton aria-hidden="true" />
          </div>
          <div className="w-28">
            <Skeleton aria-hidden="true" />
          </div>
          <div className="flex-1">
            <Skeleton aria-hidden="true" />
          </div>
          <div className="flex-1">
            <Skeleton aria-hidden="true" />
          </div>
          <div className="w-10">
            <Skeleton aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
