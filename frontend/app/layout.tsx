import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarCanvas from "@/components/main/StarBackground";
import { Navbar } from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chirag T C",
  description: "This is Chirag's Portfolio",
  icons:
    'https://ik.imagekit.io/sd404ejrc/icons/C%20logo?updatedAt=1736881890132',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} bg-[#020005] overflow-y-scroll overflow-x-hidden`}>
          <StarCanvas/>
          <Navbar/>
          {children}
          <Footer/>
      </body>
    </html>
  );
}
