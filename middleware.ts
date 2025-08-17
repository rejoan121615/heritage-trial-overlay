// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Example: you store auth token in cookies
  const token = req.cookies.get("authToken");

  // Redirect unauthenticated users visiting root `/` → `/login`
  if (pathname === "/" && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only match root URL
export const config = {
  matcher: ["/"],
};
