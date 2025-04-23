"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ScenarioFormProps {
  initialValues?: {
    title: string;
    description: string;
  };
  submitLabel?: string;
  onSubmit: (values: { title: string; description: string }) => Promise<void>;
}

export default function ScenarioForm({
  initialValues = { title: "", description: "" },
  submitLabel = "Save",
  onSubmit,
}: ScenarioFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setSaving(true);
    await onSubmit({ title, description });
    router.push("/admin/scenarios");
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
