import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/BackToTop';

export const metadata: Metadata = {
  title: 'Annexe Motors | Luxury Automotive Service',
  description: 'Expert automobile maintenance and engineering solutions in Barari, Bhagalpur.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-luxury-black text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        {/* The BackToTop button is placed here so it overlays on top of everything */}
        <BackToTop />
      </body>
    </html>
  );
}