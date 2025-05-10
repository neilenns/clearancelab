import { ENV } from "@/lib/environment";
import type { Metadata } from "next";

const description = "View statistics for Clearance Lab";
const title = "Statistics | Clearance Lab";
const basePath = "/admin/statistics";
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main aria-label="Statistics content">{children}</main>;
}
