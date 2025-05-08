"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useMemo, useState } from "react";

interface UseCheckPermissionsResult {
  permissionsStatus: Record<string, boolean>;
  isLoading: boolean;
  error?: Error;
}

/**
 * Custom hook to check for a specific set of permissions from the user's session.
 *
 * @param permissionsToVerify An array of permission strings to check.
 * @returns An object containing the status of each requested permission,
 *          loading state, and error state.
 *
 * @example
 * const { permissionsStatus, isLoading, error } = useCheckPermissions(['read:data', 'write:data']);
 * if (!isLoading && permissionsStatus['read:data']) {
 *   // User can read data
 * }
 */
export function useCheckPermissions(
  permissionsToVerify: string[],
): UseCheckPermissionsResult {
  const { user, error: userError, isLoading: userIsLoading } = useUser();

  // Memoize initial status creation to prevent re-running if permissionsToVerify reference changes unnecessarily
  const initialStatus = useMemo(() => {
    return permissionsToVerify.reduce(
      (acc, permission) => {
        acc[permission] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    );
  }, [permissionsToVerify]);

  const [permissionsStatus, setPermissionsStatus] =
    useState<Record<string, boolean>>(initialStatus);
  // isLoading state for this hook, distinct from useUser's isLoading,
  // but driven by it.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (userIsLoading) {
      setIsLoading(true);
      setError(undefined);
      // Reset to initial state based on current permissionsToVerify
      setPermissionsStatus(
        permissionsToVerify.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );
      return;
    }

    if (userError) {
      setIsLoading(false);
      setError(userError);
      setPermissionsStatus(
        permissionsToVerify.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );
      return;
    }

    // User data is loaded and no error from useUser
    setIsLoading(false);
    setError(undefined);

    if (user) {
      const userActualPermissions = (user.permissions as string[]) || [];

      const newStatus = permissionsToVerify.reduce(
        (acc, permissionKey) => {
          acc[permissionKey] = userActualPermissions.includes(permissionKey);
          return acc;
        },
        {} as Record<string, boolean>,
      );
      setPermissionsStatus(newStatus);
    } else {
      // No user session, all requested permissions are considered false.
      setPermissionsStatus(
        permissionsToVerify.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );
    }
    // permissionsToVerify is included in the dependency array.
    // If the parent component passes a new array instance on every render,
    // this effect will re-run. Memoize permissionsToVerify in the parent if it's dynamic.
  }, [user, userError, userIsLoading, permissionsToVerify]);

  return { permissionsStatus, isLoading, error };
}
