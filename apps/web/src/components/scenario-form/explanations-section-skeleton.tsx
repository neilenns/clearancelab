import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ExplanationsSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explanations</CardTitle>
        <CardDescription id="explanations-section-description">
          A list of explanations for the filed flight plan, describing any issues or offering tips
          to the student.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="grid grid-cols-[auto_1fr_1fr_auto] items-start mb-4 gap-2"
          aria-busy="true"
          aria-label="Loading explanations"
        >
          <div>
            <Skeleton aria-hidden="true" />
          </div>
          <div>
            <Skeleton aria-hidden="true" />
          </div>
          <div>
            <Skeleton aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
