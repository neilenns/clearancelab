export default function HomePage() {
  return (
    <main className="p-6 flex flex-col items-center justify-center text-center text-gray-600">
      <h1 className="text-2xl font-semibold mb-2">
        Welcome to flight plan practice!
      </h1>
      <p className="mb-4 max-w-md">
        Select a scenario from the list on the left.
      </p>
      <p className="text-sm text-gray-400">
        You can also copy a screenshot or share a direct link to a specific
        scenario.
      </p>
    </main>
  );
}
