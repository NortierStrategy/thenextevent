import type { Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { headers } from "next/headers";
import { validateEnv } from "@/lib/env";
import "./globals.css";

// Validate env vars once at module load (server only)
validateEnv();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "fr";

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${outfit.variable} bg-black`}
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://snap.licdn.com" />
        <link rel="dns-prefetch" href="https://t.contentsquare.net" />
      </head>
      <body className="font-outfit antialiased bg-black text-text">
        {children}
      </body>
    </html>
  );
}
