import ScenarioForm from "../scenario-form";

export default function NewScenarioPage() {
  async function createScenario(values: {
    title: string;
    description: string;
  }) {
    "use server";

    // Replace this with your DB insert logic
    await fetch("http://localhost:3000/api/scenarios", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Scenario</h1>
      <ScenarioForm onSubmit={createScenario} submitLabel="Create" />
    </div>
  );
}
