import type { Metadata } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

// Display: bold, condensed, urban. Logo, headlines, prints.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

// Body: athletic grotesque that echoes the wordmark. Legible for e-commerce.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

// Technical: ticket, race plate, lucky numbers, SKUs, meters.
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} · ${brand.slogan}`,
    template: `%s · ${brand.shortName}`,
  },
  description: brand.positioning,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${anton.variable} ${archivo.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
