import type { Metadata } from "next";
import { Header } from "@/components/Header"

import "./globals.css";

export const metadata: Metadata = {
  title: "Events scheduler app",
  description: "An app to schedule and manage events efficiently.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-screen bg-base-200">
        <Header />
        <main className="mx-auto w-full max-w-6xl p-6">
        {children}   
        </main>
        </body>
    </html>
  );
}
