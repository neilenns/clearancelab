import { Spinner } from "./ui/spinner";

export function Loading() {
  return (
    <div role="status" aria-live="polite">
      <Spinner size="medium">
        <span>Loading...</span>
      </Spinner>
    </div>
  );
}
