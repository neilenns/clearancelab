import { Ban, CircleCheckBig } from "lucide-react";

interface YesNoIconProperties {
  value: boolean;
}

export const YesNoIcon = ({ value }: YesNoIconProperties) => {
  return value ? (
    <CircleCheckBig
      className="h-4 w-4 text-[var(--color-alert-ok)]"
      aria-label="Yes"
    />
  ) : (
    <Ban className="h-4 w-4 text-[var(--color-alert-error)]" aria-label="No" />
  );
};
