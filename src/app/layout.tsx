import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Words Per Minute",
  description: "Test your typing speed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-neutral-950">
      <head>
        <link rel="icon" type="svg+xml" href="/favicon.svg" />
      </head>
      <body
        className={cn(
          inter.className,
          "min-h-screen",
          "bg-neutral-950 text-neutral-100 selection:bg-neutral-800",
          "bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]",
        )}
      >
        <div className="max-w-2xl mx-auto">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
