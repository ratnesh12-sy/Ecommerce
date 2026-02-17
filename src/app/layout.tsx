import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { AuthProvider } from "@/context/AuthContext";

const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "e-mart | Your Premium Shop",
  description: "Modern Ecommerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <MobileBottomNav />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
