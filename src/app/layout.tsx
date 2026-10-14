import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { look } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elias Firisa | Making sense of noise",
  description: "Elias Firisa: AI engineer at SAI Technologies, KAIST Brain & Cognitive Sciences 2026. Notes and research on diffusion and flow models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={look.theme}>
      <body className="font-sans antialiased">
        <div className="relative z-10">
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
