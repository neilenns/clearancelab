import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  capitalizeFirst,
  getFormattedClearanceLimit,
  getFormattedDepartureFrequency,
  spellSquawk,
} from "@workspace/plantools";
import { Scenario } from "@workspace/validators";

interface CraftTableProperties {
  scenario: Scenario;
  className?: string;
}

export function CraftTable({ scenario, className }: CraftTableProperties) {
  const { craft } = scenario;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="font-bold">CRAFT</p>

      <Table aria-label="CRAFT components">
        <TableBody>
          <TableRow key="C">
            <TableCell>C</TableCell>
            <TableCell>
              Cleared to {getFormattedClearanceLimit(scenario)}
            </TableCell>
          </TableRow>
          <TableRow key="R">
            <TableCell>R</TableCell>
            <TableCell>via the {craft?.route}.</TableCell>
          </TableRow>
          <TableRow key="A">
            <TableCell>A</TableCell>
            <TableCell>{capitalizeFirst(craft?.altitude ?? "")}.</TableCell>
          </TableRow>
          <TableRow key="F">
            <TableCell>F</TableCell>
            <TableCell>
              Departure {getFormattedDepartureFrequency(scenario)}.
            </TableCell>
          </TableRow>
          <TableRow key="T">
            <TableCell>T</TableCell>
            <TableCell>
              Squawk {spellSquawk(scenario.plan.bcn?.toString() ?? "")}.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
