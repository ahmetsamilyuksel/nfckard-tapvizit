import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionToken = request.cookies.get("admin_session");

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect to panel if already logged in and trying to access login
  if (pathname === "/admin/login") {
    const sessionToken = request.cookies.get("admin_session");

    if (sessionToken) {
      return NextResponse.redirect(new URL("/admin/panel", request.url));
    }
  }

  // Redirect /admin to /admin/panel
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/panel", request.url));
  }

  // Check if pathname has valid locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale && pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}/create`, request.url));
  }

  // Add pathname to headers for layout to check
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
