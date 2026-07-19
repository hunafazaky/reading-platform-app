// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// GANTI NAMA FUNGSI INI MENJADI 'proxy'
export function proxy(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === "/signform";

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/signform", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Konfigurasi matcher tetap sama
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
