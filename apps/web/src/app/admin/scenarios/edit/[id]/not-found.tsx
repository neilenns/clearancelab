interface NotFoundProperties {
  id: string;
}

export default function NotFound({ id }: NotFoundProperties) {
  return (
    <main
      aria-label="Error page for scenario not found"
      className="flex h-full flex-col items-center justify-center text-center text-muted-foreground px-4 py-16"
    >
      <h1 className="text-2xl font-semibold mb-2 text-red-600">Scenario not found</h1>
      <p className="mb-4 max-w-md">Scenario {id} doesn&apos;t exist.</p>
    </main>
  );
}
