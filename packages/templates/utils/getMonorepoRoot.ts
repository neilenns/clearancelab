import path from "path";
import { fileURLToPath } from "url";

export function getMonorepoRoot(...segments: string[]): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, "../../..", ...segments);
}
