import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { APP_DESCRIPTION, APP_NAME } from "@/constants/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex h-screen min-w-80 flex-col bg-background text-foreground")}>
        <Header />
        <div className="flex flex-1 items-start overflow-y-auto overflow-x-hidden">
          <Sidebar />
          <main className="h-full flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
