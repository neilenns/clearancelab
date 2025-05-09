import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExplanationsDndListSkeleton } from "./explanations-dnd-list-skeleton";

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
        <ExplanationsDndListSkeleton />
      </CardContent>
    </Card>
  );
}
