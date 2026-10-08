import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

/* One family, two weights: Regular (body) and Bold (headlines, buttons, key labels). */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const TITLE = "NORYX — The Connected Revenue System";
const DESCRIPTION =
  "NORYX turns fragmented sales data, research, conversations, and workflows into one intelligent revenue system.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", siteName: "NORYX" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
