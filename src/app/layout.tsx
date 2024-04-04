import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@core/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What Todo 📋",
  description: "App that handles your todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col font-mono px-6 md:px-0 md:w-2/3 m-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
