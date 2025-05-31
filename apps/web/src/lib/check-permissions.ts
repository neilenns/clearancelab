import { getAuth0Client } from "@/lib/auth0";
import { Permissions } from "@workspace/validators"; // Adjust the path if needed
import { ENV } from "./environment";

/**
 * Checks if the user has the required permissions.
 *
 * @param requiredPermissions - A single permission or an array of permissions to check.
 * @returns A boolean indicating whether the user has the required permissions.
 */
export async function checkPermissions(
  requiredPermissions: Permissions | Permissions[],
): Promise<boolean> {
  const session = await getAuth0Client().getSession();
  const userPermissions = session?.user.permissions || [];

  if (ENV.AUTH_DISABLED) {
    return true;
  }

  const permissionsArray = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  return permissionsArray.every((permission) =>
    userPermissions.includes(permission),
  );
}
