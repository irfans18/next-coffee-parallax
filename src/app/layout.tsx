import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit-variable",
});

export const metadata: Metadata = {
  title: "Artcofie | Aceh Gayo Arabica Coffee",
  description: "From the highlands of Aceh Gayo to your cup.",
  keywords: ["coffee", "arabica", "aceh gayo", "specialty coffee", "artcofie"],
  openGraph: {
    title: "Artcofie | Aceh Gayo Arabica Coffee",
    description: "From the highlands of Aceh Gayo to your cup.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <SpeedInsights/>
      <body>{children}</body>
    </html>
  );
}
