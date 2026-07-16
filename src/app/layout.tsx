import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/BackToTop';

export const metadata = {
    title: 'Annexe Motors | Premier Multi-Brand Workshop',
    description: 'Bhagalpur’s top-rated automotive workshop. From laser-guided wheel balancing to flawless denting and painting, we deliver dealership-level expertise.',
    keywords: ['car repair', 'workshop', 'Bhagalpur', 'Annexe Motors', 'auto service', 'denting painting'],
    openGraph: {
      title: 'Annexe Motors | Premier Multi-Brand Workshop',
      description: 'Bhagalpur’s top-rated automotive workshop delivering dealership-level expertise.',
      url: 'https://annexemotors.in',
      siteName: 'Annexe Motors',
      images: [
        {
          url: '/logo.jpeg', 
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
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