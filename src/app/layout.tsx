import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Sidebar from "@/components/sidebar";
import { getAllScenarios } from "@/lib/scenarioUtils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Practice flight plans",
  description:
    "Get practice reviewing flight plans and issuing clearances with flight plans ripped straight from real VATSIM pilots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-cols-[250px_1fr] h-screen">
          <Sidebar scenarios={getAllScenarios()} />

          {children}
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
