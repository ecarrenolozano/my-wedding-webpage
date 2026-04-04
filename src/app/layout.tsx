import localFont from "next/font/local";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { assetUrl } from "@/lib/assets";

const stylishCalligraphy = localFont({
  src: "./fonts/StylishCalligraphyDemo-XPZZ.ttf",
  variable: "--font-stylish-calligraphy",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Boda Wedding Page",
  description: "Premium wedding website starter with bilingual support.",
  icons: {
    icon: assetUrl("favicon.png"),
    shortcut: assetUrl("favicon.png"),
    apple: assetUrl("favicon.png"),
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body
        className={`${stylishCalligraphy.variable} ${manrope.variable} ${cormorantGaramond.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
