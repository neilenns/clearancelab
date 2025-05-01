import { ScenarioInput } from "@workspace/validators";
import { useFormContext, useWatch } from "react-hook-form";
import { CraftSection } from "./craft-section";
import { ProblemsSection } from "./problems-section";

export const ToggleControlledSections = () => {
  const { control } = useFormContext<ScenarioInput>();
  const canClear = useWatch({ control, name: "canClear" });
  const isValid = useWatch({ control, name: "isValid" });

  return (
    <>
      {canClear && <CraftSection />}
      {!isValid && <ProblemsSection />}
    </>
  );
};
