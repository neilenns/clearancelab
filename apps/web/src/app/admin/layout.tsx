import { ENV } from "@/lib/environment";
import type { Metadata } from "next";
import AdminLayoutClient from "./admin-layout-client"; // Import the new client component

const description = "Administration tools for Clearance Lab";
const title = "Admin | Clearance Lab";
const basePath = "/admin";
const url = new URL(basePath, ENV.APP_BASE_URL);

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    type: "website",
  },
  twitter: {
    title,
    description,
    card: "summary",
    images: [
      {
        url: new URL("/logo.svg", ENV.APP_BASE_URL),
        alt: "Clearance Lab logo, a beaker half filled with blue liquid.",
      },
    ],
  },
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Content is client-rendered so permissions can be checked via a hook.
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
