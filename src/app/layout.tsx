import "./globals.css";

import { Toaster } from "sonner";
import type { Metadata } from "next";
import ReduxProvider from "@/providers/ReduxProvider";
import { Poppins, Inter, Geist_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tahari Foods Dashboard",
  description: "Tahari Foods an online grocery store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster richColors position="top-right" />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
