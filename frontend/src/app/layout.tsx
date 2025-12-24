import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Toaster } from "sonner";
import AuthProvider from "./context/AuthContext";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yodha Foods | Ancient Powders - Reimagined for Today.",
  description: "Yodha Foods - Ancient Powders. Reimagined for Today.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />

        <StoreProvider>
          <AuthProvider>
            <Header />
            <div className="page-wrapper">{children}</div>
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
