'use client';

import './globals.css';
import { Roboto } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
      <body className={roboto.className}>
        {!disableNavbar.includes(pathname) && <Navbar />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
