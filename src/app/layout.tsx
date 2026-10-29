import type { Metadata, Viewport } from "next";
import { SITE, SITE_URL } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.fullName} — Winners, Media & Dispatches`,
    template: `%s · ${SITE.fullName}`,
  },
  description: SITE.description,
  keywords: [
    "SANGYAN posts",
    "SANGYAN 2026",
    "SANGYAN hackathon winners",
    "SANGYAN media",
    "investor resilience hackathon",
    "SNTC IIT BHU",
    "SEBI",
    "NSDL",
    "financial literacy India",
  ],
  authors: [{ name: SITE.organisation }],
  creator: SITE.organisation,
  publisher: SITE.organisation,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: `${SITE.fullName} — Winners, Media & Dispatches`,
    description: SITE.description,
    type: "website",
    locale: "en_IN",
    siteName: SITE.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} — Winners, Media & Dispatches`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#f6eeda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
