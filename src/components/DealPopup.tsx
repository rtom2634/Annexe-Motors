'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export default function DealPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('annexe_deal_popup');

    if (!hasSeenPopup) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const triggerPoint = document.documentElement.scrollHeight * 0.3;

        if (scrollPosition > triggerPoint) {
          setIsVisible(true);
          sessionStorage.setItem('annexe_deal_popup', 'true');
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-white/10 rounded-sm shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden animate-in zoom-in-95 duration-500">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/30 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-[60px] pointer-events-none"></div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition-colors p-1"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        <div className="relative p-10 text-center">
          <div className="w-12 h-12 mx-auto bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="text-blue-400" size={20} />
          </div>
          
          <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">
            Limited Time Offer
          </span>
          
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
            Complimentary <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              36-Point Inspection
            </span>
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Book any premium detailing or major mechanical service today and receive a comprehensive computerized health check for your vehicle, absolutely free.
          </p>

          <div className="flex flex-col gap-3">
            <Link 
              href="/booking" 
              onClick={() => setIsVisible(false)}
              className="w-full bg-white text-black hover:bg-gray-200 px-6 py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              Claim Offer Now <ArrowRight size={16} />
            </Link>
            <button 
              onClick={() => setIsVisible(false)}
              className="w-full bg-transparent text-gray-500 hover:text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}