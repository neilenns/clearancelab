import ScenarioForm from "../../scenario-form";

interface Props {
  params: { id: string };
}

export default async function EditScenarioPage({ params }: Props) {
  const id = params.id;

  // Fetch from your database
  const res = await fetch(`http://localhost:3000/api/scenarios/${id}`);
  const scenario = await res.json();

  async function updateScenario(values: {
    title: string;
    description: string;
  }) {
    "use server";

    await fetch(`http://localhost:3000/api/scenarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Scenario</h1>
      <ScenarioForm
        initialValues={{
          title: scenario.title,
          description: scenario.description,
        }}
        onSubmit={updateScenario}
        submitLabel="Update"
      />
    </div>
  );
}
