'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

const disableNavbar = ['/reset-password'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <Head>
        <title>Swap Device - Apple Consigntment</title>
      </Head>
      <body className={inter.className}>
        {!disableNavbar.includes(pathname) && <Navbar />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
