import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ENV } from "@/lib/environment";
import type { Metadata } from "next";
import "./globals.css";

const description =
  "Where aspiring controllers sharpen their flight plan review skills.";
const title = "Clearance Lab";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  title,
  description,
  openGraph: {
    title,
    description,
    url: new URL("/", ENV.APP_BASE_URL),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-peridot">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
