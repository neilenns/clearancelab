import { NextRequest, NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";

// This method of protecting routes comes from https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#middleware
export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return authRes;
  }

  const session = await auth0.getSession(request);

  if (!session) {
    // user is not authenticated, redirect to login page
    return NextResponse.redirect(
      new URL(
        `/auth/login?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.nextUrl.origin
      )
    );
  }

  // the headers from the auth middleware should always be returned
  return authRes;
}
