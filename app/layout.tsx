import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SCALE IT — Więcej rezerwacji. Mniej straconych możliwości.",
  description:
    "Platforma rezerwacji dla biznesów premium. Inteligentny kalendarz, automatyczna komunikacja, CRM i analityka — wszystko w jednym miejscu.",
  metadataBase: new URL("https://scaleit.space"),
  openGraph: {
    title: "SCALE IT — Więcej rezerwacji. Mniej straconych możliwości.",
    description:
      "Platforma rezerwacji dla biznesów premium. Średnio +37% konwersji w pierwszych 90 dniach.",
    url: "https://scaleit.space",
    siteName: "SCALE IT",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
