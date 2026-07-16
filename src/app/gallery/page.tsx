'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Camera, Layers, Wrench, Sparkles, ArrowLeft } from 'lucide-react';

// Compartmentalised groupings using your actual physical file list
const sections = [
  {
    title: "Workshop & Facility",
    description: "Our state-of-the-art repair space and specialized vehicle bays at Barari, Bhagalpur.",
    icon: <Camera size={18} className="text-blue-500" />,
    images: [
      "/workshopphotos/Annexemotorsfront.png",
      "/workshopphotos/IMG_9142.jpeg",
      "/workshopphotos/IMG_9147.jpeg",
      "/workshopphotos/IMG_9173.jpeg",
      "/workshopphotos/bannerannexemotors.png",
      "/workshopphotos/IMG_9206.jpeg",
      "/workshopphotos/paintbooth.jpeg",
      "/workshopphotos/IMG_9189.jpeg"
    ]
  },
  {
    title: "Diagnostics & Advanced Repairs",
    description: "Computerized electrical troubleshooting, mechanical overhauls, and suspension calibration.",
    icon: <Wrench size={18} className="text-blue-500" />,
    images: [
      "/workshopphotos/IMG_9152.jpeg",
      "/workshopphotos/IMG_9164.jpeg",
      "/workshopphotos/IMG_9172.jpeg",
      "/workshopphotos/IMG_9171.jpeg",
      "/workshopphotos/IMG_9174.jpeg",
      "/workshopphotos/IMG_9176.jpeg",
      "/workshopphotos/IMG_9190.jpeg",
      "/workshopphotos/IMG_9198.jpeg",
      "/workshopphotos/IMG_9211.jpeg",
      "/workshopphotos/IMG_9221.jpeg",
      "/workshopphotos/IMG_9228.jpeg",
      "/workshopphotos/IMG_9174.jpeg"
      
    ]
  },
  {
    title: "Detailing & Deep Cleaning",
    description: "Multi-stage foam washing, paint preparation, and interior restoration.",
    icon: <Sparkles size={18} className="text-blue-500" />,
    images: [
      "/workshopphotos/IMG_9220.jpeg",
      "/workshopphotos/IMG_9217.jpeg",
      "/workshopphotos/IMG_9211.jpeg",
      "/workshopphotos/IMG_9152.jpeg",
      "/workshopphotos/IMG_9170.jpeg",
      "/workshopphotos/IMG_9222.jpeg",
      "/workshopphotos/IMG_9228.jpeg",
      "/workshopphotos/IMG_9232.jpeg"
      
    ]
  },
  {
    title: "Legacy & Leadership",
    description: "A glimpse into our founding vision, our passionate team at work, and the milestones that define our standard of excellence.",
    icon: <Layers size={18} className="text-blue-500" />,
    images: [
      "/workshopphotos/IMG_9142.jpeg",
      "/workshopphotos/IMG_9147.jpeg",
      "/workshopphotos/IMG_9203.jpeg",
      "/workshopphotos/IMG_9236.jpeg",
      "/workshopphotos/IMG_9230.jpeg",
      "/workshopphotos/award 1.png",
      "/workshopphotos/award 2.png"
    ]
  }
];

export default function GalleryPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Simple back navigation */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-500 transition-colors">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>

        {/* Hero Meta */}
        <div className="max-w-3xl mb-24">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">Our Portfolio</span>
          <h1 className="text-5xl font-light tracking-tight mt-4 mb-6">Annexe Motors in Action.</h1>
          <p className="text-gray-400 font-light leading-relaxed">
            Witness our commitment to precision engineering, modern technology, and unparalleled customer satisfaction at our Barari facility.
          </p>
        </div>

        {/* Compartmentalised Sections */}
        <div className="space-y-24">
          {sections.map((section, secIdx) => (
            <div key={secIdx} className="border-t border-white/10 pt-12">
              
              {/* Section Header */}
              <div className="max-w-2xl mb-8">
                <div className="flex items-center gap-3 text-white mb-3">
                  {section.icon}
                  <h2 className="text-2xl font-medium tracking-tight">{section.title}</h2>
                </div>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Grid Layout of photos within this group */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {section.images.map((imgSrc, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="relative aspect-square rounded-sm overflow-hidden bg-neutral-950 group border border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <Image 
                      src={imgSrc} 
                      alt={`${section.title} Photo ${imgIdx + 1}`} 
                      fill 
                      className="object-cover opacity-80 hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      unoptimized 
                    />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}