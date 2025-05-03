export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center text-center">
      <div className="py-5">
        <h3>Select a scenario</h3>
      </div>
      <p>Choose a scenario from the sidebar to start practicing.</p>
      <p>
        Tip: Use the{" "}
        <kbd className="rounded border border-muted px-1.5 py-0.5 text-sm font-mono bg-muted text-muted-foreground">
          S
        </kbd>{" "}
        key to show a random scenario. Use the{" "}
        <kbd className="rounded border border-muted px-1.5 py-0.5 text-sm font-mono bg-muted text-muted-foreground">
          A
        </kbd>{" "}
        key to show the answer.
      </p>
    </main>
  );
}
