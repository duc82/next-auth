import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NextAuth.js with Next.js 15",
  description: "A simple example of NextAuth.js with Next.js 15 and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
