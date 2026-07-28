import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cursor Boston × Hult — Vibe Showcase",
  description:
    "Curated editorial showcase of the best weekly builds from the Cursor Boston × Hult cohort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans antialiased flex flex-col">
        <Header />
        <main className="mx-auto w-full max-w-[1280px] flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
