"use client"
import type { Metadata } from "next";
import React,{useEffect} from "react";
import { useRouter,usePathname } from "next/navigation";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname=usePathname()

  useEffect(() => {
    const userId = localStorage.getItem('userid');
    if (!userId && pathname !== '/') {
      router.replace('/login');
    }
  }, [router, pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <EdgeStoreProvider>
        {children}
        </EdgeStoreProvider>
        </NextAuthProvider>
        </body>
    </html>
  );
}
