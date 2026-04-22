import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cerprise | End-To-End Growth Partner",
  description: "Delivering reliable branding, staffing, and high-performance software systems for growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans text-slate-200 antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* Global Film Grain Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
          <div
            className="absolute inset-0 opacity-[0.25] mix-blend-screen"
            style={{
              backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
              backgroundSize: "150px 150px"
            }}
          ></div>
        </div>

        <Navbar />
        <main className="flex-1 overflow-visible">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
