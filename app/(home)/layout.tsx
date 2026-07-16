import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { TanstackProvider } from "@/components/tanstack-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { RefreshLoader } from "@/components/refresh-loader";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400", "700"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Reading Platform",
    description: "Centralized App for Readers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html
                lang="id"
                suppressHydrationWarning
                className={cn(
                    "h-full",
                    inter.variable,
                    geistSans.variable,
                    geistMono.variable,
                    "font-sans",
                    "antialiased",
                )}
            >
                <head />
                <body className="min-h-full flex flex-col">
                    <RefreshLoader />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <AuthProvider>
                            <TanstackProvider>
                                <SidebarProvider>
                                    <AppSidebar />
                                    <SidebarInset>
                                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                                            <div className="flex items-center gap-2 px-4">
                                                <SidebarTrigger className="-ml-1" />
                                                <Separator
                                                    orientation="vertical"
                                                    className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                                                />
                                                <Breadcrumb>
                                                    <BreadcrumbList>
                                                        <BreadcrumbItem className="hidden md:block">
                                                            <BreadcrumbLink href="#">
                                                                Home
                                                            </BreadcrumbLink>
                                                        </BreadcrumbItem>
                                                        <BreadcrumbSeparator className="hidden md:block" />
                                                        <BreadcrumbItem>
                                                            <BreadcrumbPage>
                                                                All Works
                                                            </BreadcrumbPage>
                                                        </BreadcrumbItem>
                                                    </BreadcrumbList>
                                                </Breadcrumb>
                                            </div>
                                        </header>
                                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                                            {children}
                                        </div>
                                    </SidebarInset>
                                </SidebarProvider>
                            </TanstackProvider>
                        </AuthProvider>
                    </ThemeProvider>
                </body>
            </html>
        </>
    );
}
