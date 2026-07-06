// middleware.ts di root project (sejajar folder app)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // Jika belum login dan mencoba akses halaman utama
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/signform", request.url));
  }

  // Jika sudah login dan mencoba akses signin/signup lagi
  if (token && pathname === "/signform") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signform"],
};
