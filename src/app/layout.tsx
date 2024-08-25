import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: "Blog app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>{children}
        <Toaster />
      </body>
    </html>
  );
}
