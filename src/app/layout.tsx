import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import BackgroundScene from "@/components/BackgroundScene";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elias Firisa | Brains & Machines",
  description: "Personal site of Elias Firisa. Work and writing in AI and computational neuroscience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <BackgroundScene />
        <div className="relative z-10">
          <div className="content-frost" aria-hidden="true" />
          <div className="container mx-auto px-6">
            <Navbar />
            <main className="py-8">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
