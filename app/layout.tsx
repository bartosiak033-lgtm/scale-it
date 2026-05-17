import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SCALE IT — Cała obsługa klienta. Na autopilocie.",
  description:
    "Kompleksowy system, który spina wszystkie aplikacje Twojego biznesu — Booksy, Versum, Instagram, WhatsApp, kalendarz, płatności — i automatyzuje obsługę klienta.",
  metadataBase: new URL("https://scaleit.space"),
  openGraph: {
    title: "SCALE IT — Cała obsługa klienta. Na autopilocie.",
    description:
      "Wszystkie narzędzia i kanały komunikacji w jednym systemie. Automatyzacje, AI, CRM i analityka — pełna kontrola nad biznesem z jednego panelu.",
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
