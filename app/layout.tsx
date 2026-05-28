import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laddify.id — Scale It. Laddify It.",
  description:
    "Laddify is your End-to-End Growth Partner. We provide Social Media Management, Paid Advertising, and Growth Strategy to help your brand dominate the market.",
  keywords: [
    "Laddify",
    "digital marketing",
    "social media management",
    "paid advertising",
    "growth strategy",
    "Indonesia",
  ],
  openGraph: {
    title: "Laddify.id — Scale It. Laddify It.",
    description:
      "Your End-to-End Growth Partner. Social Media Management, Paid Ads, Growth Strategy.",
    type: "website",
    url: "https://laddify.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
