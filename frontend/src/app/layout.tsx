import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BundleBoxDrawer from "@/components/BundleBoxDrawer";

import { Toaster } from "sonner";
import AuthProvider from "@/features/auth/context/AuthContext";
import StoreProvider from "./StoreProvider";
import QueryProvider from "@/providers/QueryProvider";

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
    icon: "/icon.png",
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

        <QueryProvider>
          <StoreProvider>
            <AuthProvider>
              <Header />
              <div className="page-wrapper">{children}</div>
              <Footer />
              <BundleBoxDrawer />
            </AuthProvider>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
