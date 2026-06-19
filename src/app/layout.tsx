import type { Metadata } from "next";
import { Anton, Inter, Space_Mono } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

// Display: bold, condensed, urban. Logo, headlines, prints.
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

// Technical: ticket, race plate, lucky numbers, SKUs, meters.
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
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
      <body
        className={`${anton.variable} ${inter.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
