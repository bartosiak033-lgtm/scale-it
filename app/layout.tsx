import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SCALE IT — AI receptionist dla klinik medycyny estetycznej",
  description:
    "AI po polsku odbiera nieodebrane połączenia, odpowiada na DM-y 24/7 i automatyzuje obsługę klienta. Działa z Booksy, Versum, Instagram i WhatsApp.",
  metadataBase: new URL("https://scaleit.space"),
  openGraph: {
    title: "SCALE IT — AI receptionist dla klinik medycyny estetycznej",
    description:
      "Ani jeden zgubiony pacjent. AI odbiera telefony 24/7, odpowiada na DM-y w 5 sekund i książkuje wizyty bezpośrednio w Booksy/Versum.",
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
