import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Flex Agency - Elevate Your Digital Presence",
    template: "%s | Flex Agency",
  },
  description:
    "Full-service digital marketing agency in Sri Lanka. We specialize in social media marketing, SEO, content marketing, PPC advertising, branding, and web design.",
  keywords: [
    "digital marketing",
    "social media marketing",
    "SEO",
    "content marketing",
    "PPC advertising",
    "branding",
    "web design",
    "Sri Lanka",
    "Colombo",
  ],
  authors: [{ name: "Flex Agency" }],
  creator: "Flex Agency",
  metadataBase: new URL("https://flexagency.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flexagency.com",
    siteName: "Flex Agency",
    title: "Flex Agency - Elevate Your Digital Presence",
    description:
      "Full-service digital marketing agency specializing in social media, SEO, and web design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flex Agency - Elevate Your Digital Presence",
    description:
      "Full-service digital marketing agency specializing in social media, SEO, and web design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
