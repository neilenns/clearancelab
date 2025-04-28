import { ScenarioFormSkeleton } from "@/components/scenario-form/scenario-form-skeleton";

export default function Loading() {
  return (
    <div className="p-4" aria-live="polite" aria-busy="true">
      <h1 className="text-xl font-bold mb-4">Edit Scenario</h1>
      <ScenarioFormSkeleton />
    </div>
  );
}
