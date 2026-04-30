import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patel & Patel · Room Chart",
  description:
    "Room chart for the Patel & Patel wedding · One&Only Moonlight Basin · Big Sky, Montana · June 25–28, 2026",
  openGraph: {
    title: "Patel & Patel · Room Chart",
    description:
      "One&Only Moonlight Basin · Big Sky, Montana · June 25–28, 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream-warm text-forest-deep">{children}</body>
    </html>
  );
}
