import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

// Display: bold, condensed, urban — logo, headlines, prints.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

// Body: clean, legible, e-commerce friendly.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.slogan}`,
    template: `%s — ${brand.shortName}`,
  },
  description: brand.positioning,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${anton.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
