import type { Metadata } from "next";

const description = "View statistics for Clearance Lab";
const title = "Statistics | Clearance Lab";
const url = "https://clearancelab.badcasserole.com/admin/statistics";

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
