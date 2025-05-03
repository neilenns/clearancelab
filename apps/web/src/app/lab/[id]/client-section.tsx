"use client";

import { Answer } from "@/components/answer";
import FPE from "@/components/fpe/fpe";
import { Button } from "@/components/ui/button";
import { Scenario } from "@workspace/validators";
import Link from "next/link";

interface ClientSectionProperties {
  scenario: Scenario;
  canEdit: boolean;
}

export default function ClientSection({
  scenario,
  canEdit,
}: ClientSectionProperties) {
  return (
    <main className="p-6 overflow-y-auto">
      {canEdit && (
        <Button asChild>
          <Link href={`/admin/scenarios/edit/${scenario._id}`}>Edit</Link>
        </Button>
      )}
      <FPE scenario={scenario} />
      <Answer scenario={scenario} />
    </main>
  );
}
