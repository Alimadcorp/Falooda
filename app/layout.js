import "./globals.css";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const primaryFont = localFont({
  src: "../public/font.otf",
  variable: "--font-primary",
  display: "swap",
});

export const secFont = localFont({
  src: "../public/sec.otf",
  variable: "--font-secondary",
  display: "swap",
});

import { Source_Serif_4, Coming_Soon } from "next/font/google";

export const comingSoon = Coming_Soon({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-coming-soon",
  display: "swap",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});
const lmetadata = {
  title: "Falooda Fanatics – Hack Club Faisalabad",
  description:
    "A community of young makers in Faisalabad, building awesome things together. Part of the global Hack Club network.",
  keywords:
    "Hack Club, Faisalabad, makers, coding club, tech, Pakistan, teenagers",
  icons: "https://hackclub.com/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${primaryFont.variable} ${secFont.variable} ${comingSoon.variable} ${sourceSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-[#fdfaf6] text-[#2a1913] font-coming-soon`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
