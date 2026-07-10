import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Sesuaikan path ke global CSS kamu
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider"; // Import di sini

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Reading Platform - Authentication",
};

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("h-full", inter.variable, "font-sans", "antialiased")}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {/* Masukkan AuthProvider di dalam ThemeProvider */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}