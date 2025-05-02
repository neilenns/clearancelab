import { NextRequest, NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import { SessionData } from "@auth0/nextjs-auth0/types";

// This method of protecting routes comes from https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#middleware
export async function middleware(request: NextRequest) {
  let authorizationResponse: NextResponse;

  try {
    authorizationResponse = await auth0.middleware(request);
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authorizationResponse;
  }

  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return authorizationResponse;
  }

  let session: SessionData | null;

  try {
    session = await auth0.getSession(request);
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (!session) {
    // user is not authenticated, redirect to login page
    return NextResponse.redirect(
      new URL(
        `/auth/login?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.nextUrl.origin,
      ),
    );
  }

  // The headers from the auth middleware should always be returned
  return authorizationResponse;
}
