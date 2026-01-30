import type { Metadata } from "next";
import { Geist, Geist_Mono, Permanent_Marker, Playfair_Display, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BundleBoxDrawer from "@/components/BundleBoxDrawer";
import RequestProductDrawer from "@/components/RequestProductDrawer";
import BecomePartnerDrawer from "@/components/BecomePartnerDrawer";
import SpinWheelDrawer from "@/components/SpinWheelDrawer";

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

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-permanent-marker",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} ${permanentMarker.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable} font-jakarta antialiased`}
      >
        <Toaster richColors position="top-center" />
        {/* ... */}

        <QueryProvider>
          <StoreProvider>
            <AuthProvider>
              <Header />
              <div className="page-wrapper">{children}</div>
              <Footer />
              <BundleBoxDrawer />
              <RequestProductDrawer />
              <BecomePartnerDrawer />
              <SpinWheelDrawer />
            </AuthProvider>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
