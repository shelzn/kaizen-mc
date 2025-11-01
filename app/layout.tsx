// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "sonner";

const _jakartaPlus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kaizen Network",
    description: "Server Minecraft yang fokus pada pengalaman bermain terbaik",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
        <body className={`${_jakartaPlus.className} bg-gray-900 text-white min-h-screen pt-24 flex flex-col`}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Toaster position="bottom-center" />
            <SiteFooter />
        </body>
        </html>
    );
}
