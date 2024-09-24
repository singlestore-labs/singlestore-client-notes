import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SingleStore Client Notes",
  description: "A simple app demonstrating the basic usage of the SingleStore Client.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex h-screen min-w-80 flex-col bg-background text-foreground")}>
        <Header />
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
