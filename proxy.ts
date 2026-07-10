import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get("is_signed")?.value;
  const { pathname } = request.nextUrl;

  // Skenario 1: User sudah login tapi mencoba masuk ke /signform kembali
  if (isLoggedIn && pathname.startsWith("/signform")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Skenario 2: User belum login / token habis, tapi nekat masuk halaman terproteksi (seperti root atau dashboard)
  if (!isLoggedIn && !pathname.startsWith("/signform")) {
    return NextResponse.redirect(new URL("/signform", request.url));
  }

  return NextResponse.next();
}

// Konfigurasi rute mana saja yang diproteksi
export const config = {
  matcher: [
    "/", // Root page
    // "/dashboard/:path*", // Contoh halaman terproteksi lainnya
    "/signform", // Halaman sign in itu sendiri
  ],
};
