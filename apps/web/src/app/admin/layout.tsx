import type { Metadata } from "next";
import AdminLayoutClient from "./admin-layout-client"; // Import the new client component

const description = "Administration tools for Clearance Lab";
const title = "Admin | Clearance Lab";
const url = "https://clearancelab.badcasserole.com/admin";

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
        url: `https://clearancelab.badcasserole.com/logo.svg`,
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
