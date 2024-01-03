import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WPM",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-neutral-950">
      <body
        className={cn(
          inter.className,
          "bg-neutral-950 max-w-2xl mx-auto text-neutral-100 selection:bg-neutral-800",
        )}
      >
        {children}
      </body>
    </html>
  );
}
