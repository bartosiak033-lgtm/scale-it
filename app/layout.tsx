import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SCALE IT — Jeden system. Cały biznes.",
  description:
    "Łączymy wszystkie aplikacje Twojego biznesu — Booksy, Versum, Instagram, WhatsApp, kalendarz, płatności — w jedną platformę. Pełna kontrola operacyjna z jednego miejsca.",
  metadataBase: new URL("https://scaleit.space"),
  openGraph: {
    title: "SCALE IT — Jeden system. Cały biznes.",
    description:
      "Spinamy wszystkie aplikacje, kanały i procesy Twojego biznesu w jeden system. Pełna kontrola operacyjna z jednego miejsca.",
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
