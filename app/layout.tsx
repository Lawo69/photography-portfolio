import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snaps by Madz",
  description: "Snaps by Madz is photography portfolio showcasing the work of Madz.",
  openGraph: {
    title: "Snaps by Madz",
    description: "Snaps by Madz is photography portfolio showcasing the work of Madz.",
    url: "https://snapsbymadz.com",
    siteName: "Snaps by Madz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="h-full">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
