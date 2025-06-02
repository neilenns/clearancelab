import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  capitalizeFirst,
  getFormattedClearanceLimit,
  getFormattedDepartureFrequency,
  getTelephony,
  spellSquawk,
} from "@workspace/plantools";
import { Scenario } from "@workspace/validators";

interface CraftTableProperties {
  scenario: Scenario;
  className?: string;
}

export function CraftTable({ scenario, className }: CraftTableProperties) {
  const { craft } = scenario;

  if (!craft) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  // Check for special values that indicate these portions of CRAFT should have empty values
  // displayed.
  const hasClearanceLimit = craft.clearanceLimit !== "none";
  const hasRoute = craft.route !== "none";
  const hasAltitude = craft.altitude !== "none";

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="font-bold">CRAFT</p>

      <div className="w-full max-w-2xl">
        <Table aria-label="CRAFT components">
          <TableBody>
            <TableRow key="telephony">
              <TableCell></TableCell>
              <TableCell className="font-bold">
                {getTelephony(scenario)}
              </TableCell>
            </TableRow>
            <TableRow key="C">
              <TableCell>C</TableCell>
              <TableCell className="whitespace-normal">
                {hasClearanceLimit &&
                  `Cleared to ${getFormattedClearanceLimit(scenario)}`}
              </TableCell>
            </TableRow>
            <TableRow key="R">
              <TableCell>R</TableCell>
              <TableCell className="whitespace-normal">
                {hasRoute && `via the ${craft.route}.`}
              </TableCell>
            </TableRow>
            <TableRow key="A">
              <TableCell>A</TableCell>
              <TableCell className="whitespace-normal">
                {hasAltitude && `${capitalizeFirst(craft.altitude ?? "")}.`}
              </TableCell>
            </TableRow>
            <TableRow key="F">
              <TableCell>F</TableCell>
              <TableCell className="whitespace-normal">
                Departure {getFormattedDepartureFrequency(scenario)}.
              </TableCell>
            </TableRow>
            <TableRow key="T">
              <TableCell>T</TableCell>
              <TableCell className="whitespace-normal">
                Squawk {spellSquawk(scenario.plan.bcn?.toString() ?? "")}.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
