import type { Metadata } from "next";
import { Space_Grotesk, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sendi's Blog",
  description: "A personal space for my thoughts and writings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${lora.variable} ${jetbrainsMono.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#1A1714] text-[#E8E0D4] selection:bg-[#D4A870]/30 selection:text-[#E8E0D4] leading-relaxed text-lg">
        <Navbar />
        <main className="flex-grow w-full max-w-4xl mx-auto px-6 pt-12 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
