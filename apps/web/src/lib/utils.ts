// eslint-disable-next-line unicorn/prevent-abbreviations
import { Scenario } from "@workspace/validators";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateIssueTitle(scenario: Scenario): string {
  const title = `Issue with scenario ${scenario.plan?.dep} - ${scenario.plan?.dest} (${scenario.plan.aid})`;

  return encodeURIComponent(title);
}
export function generateIssueBody(scenario: Scenario): string {
  const scenarioUrl = `https://clearancelab.badcasserole.com/lab/${scenario._id}`;
  const bodyContent = `Scenario: ${scenarioUrl}
  
## Issue details

Explain the issue and what the proposed solution is.`;

  return encodeURIComponent(bodyContent);
}
