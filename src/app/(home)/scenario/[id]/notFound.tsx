interface NotFoundProps {
  id: string;
}

export default function NotFound({ id }: NotFoundProps) {
  return (
    <main className="p-6 flex flex-col items-center justify-center text-center text-gray-600">
      <h1 className="text-2xl font-semibold mb-2 text-red-600">
        Scenario not found
      </h1>
      <p className="mb-4 max-w-md">Scenario {id} doesn&apos;t exist.</p>
      <p className="text-sm text-gray-400">
        Please select a valid scenario from the sidebar.
      </p>
    </main>
  );
}
