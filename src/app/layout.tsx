"use client";

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
// import { ThemeProvider } from 'next-themes'; // Import ThemeProvider
import { metadata } from './metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'MediVault',
//   description: 'Securely manage your medical records',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}> Wrap with ThemeProvider */}
          <Navbar />
            {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}


