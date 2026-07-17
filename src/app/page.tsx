'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Star, Users, Clock, ShieldCheck, Camera } from 'lucide-react';

// Components
import ReviewSection from '../components/ReviewSection';
import DecadeOfExcellence from '../components/DecadeOfExcellence';
import FAQAccordion from '../components/FAQAccordion';
import DealPopup from '../components/DealPopup';

const brandLogos = [
    { name: 'Maruti Suzuki', src: '/logos/maruti-suzuki-logo.png' }, 
    { name: 'Hyundai', src: '/logos/hyundai-logo-2011-640.png' },
    { name: 'Tata', src: '/logos/Tata-logo-2000-640x550.jpg' },
    { name: 'Mahindra', src: '/logos/mahindra.jpg' },
    { name: 'Toyota', src: '/logos/toyota-logo-2020-europe-640.png' },
    { name: 'Honda', src: '/logos/honda.jpg' },
    { name: 'Kia', src: '/logos/Kia-logo-640x321.jpg' },
    { name: 'BMW', src: '/logos/BMW-M-logo-640x231.jpg' },
    { name: 'Mercedes', src: '/logos/Mercedes-Benz-logo-2011-640x369.jpg' },
    { name: 'Audi', src: '/logos/audi.jpg' }, 
    { name: 'Morris Garages', src: '/logos/morris-garages.jpg' }, 
    { name: 'Skoda', src: '/logos/skoda.jpg' }, 
    { name: 'Volkswagen', src: '/logos/Volkswagen-logo-2019-640x500.jpg' }, 
    { name: 'Renault', src: '/logos/renault.jpg' }, 
    { name: 'Ford', src: '/logos/ford-logo-2017-640.png' }, 
    { name: 'Nissan', src: '/logos/nissan-logo-2020-black-show.png' }
];

const marqueeLogos = [...brandLogos, ...brandLogos];

const services = [
  {
    title: "Foam Wash & Deep Cleaning",
    desc: "Multi-stage exterior snow foam wash, interior dry cleaning, and AC vent sanitization.",
    img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Denting & Paint Booth",
    desc: "Computerized color matching and dust-free baking booths for a factory-grade finish.",
    img: "/workshopphotos/Denting.png"
  },
  {
    title: "Wheel Alignment & Balancing",
    desc: "Laser-guided 3D wheel alignment and dynamic balancing for all tire variants.",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Mechanical & Engine Overhaul",
    desc: "Complete engine diagnostics, transmission repair, and suspension system upgrades.",
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop"
  }
];

// Expanded 6-slot gallery mapped to your workshop photos
const galleryImages = [
  {
    src: "/workshopphotos/IMG_9218.jpeg",
    title: "Premium Foam Bath",
    category: "Detailing"
  },
  {
    src: "/workshopphotos/IMG_9165.jpeg",
    title: "Diagnostic Station",
    category: "Analytics"
  },
  {
    src: "/workshopphotos/Annexemotorsfront.png",
    title: "Our Headquarters",
    category: "Facility"
  },
  {
    src: "/workshopphotos/IMG_9198.jpeg",
    title: "Engine Diagnostics",
    category: "Maintenance"
  },
  {
    src: "/workshopphotos/IMG_9152.jpeg",
    title: "Mechanical Bay",
    category: "Repair"
  },
  {
    src: "/workshopphotos/IMG_9180.jpeg",
    title: "Showroom Prep",
    category: "Polishing"
  }
];

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white pt-20 overflow-hidden">
      
      {/* =========================================
          HERO SECTION 
      ========================================= */}
      <section className="relative w-full flex flex-col justify-center min-h-[90vh] py-20 lg:py-28">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 bg-black">
          <Image 
            src="/workshopphotos/IMG_9211.jpeg" 
            alt="Annexe Motors Luxury Workshop"
            fill
            className="object-cover object-[center_70%] opacity-90"
            priority
          />
          {/* The "Chic Luxury" CSS Tints */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
          <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-4xl space-y-8">
            {/* Tagline updated for high visibility and sharp scaling */}
            <div className="flex items-center gap-4 text-blue-500 text-sm md:text-base font-bold uppercase tracking-[0.25em] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-16 h-[2px] bg-blue-500 shrink-0"></span>
              Bhagalpur's Premier Multi-Brand Workshop
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 text-white">
              Uncompromising <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">
                Automotive Excellence.
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              From laser-guided wheel balancing to flawless denting and painting, Annexe Motors delivers dealership-level expertise without the dealership markup.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-2 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Link href="/booking">
                <button className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  Schedule Appointment <ChevronRight size={16} />
                </button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 mt-12 animate-in fade-in duration-1000 delay-700">
              <div>
                <div className="flex items-center gap-2 text-3xl font-bold text-white mb-1">
                  13+ <Clock size={24} className="text-blue-500" />
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Years of Legacy</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-3xl font-bold text-white mb-1">
                  20k+ <Users size={24} className="text-blue-500" />
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Families Served</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 text-3xl font-bold text-white mb-1">
                  4.5 <Star size={24} className="text-yellow-500 fill-yellow-500" />
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Google Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee - Car Brands */}
      <section className="border-y border-white/5 bg-neutral-950 py-10 overflow-hidden">
        <div className="flex items-center gap-4 px-6 lg:px-12 mb-8 max-w-7xl mx-auto">
          <ShieldCheck size={18} className="text-blue-500" />
          <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Authorized to service all major variants</h3>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee items-center space-x-20 px-8">
            {marqueeLogos.map((brand, idx) => (
              <div key={idx} className="w-24 h-16 relative flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <img src={brand.src} alt={brand.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decade of Excellence */}
      <DecadeOfExcellence />

      {/* Visual Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-blue-500 text-xs uppercase font-bold tracking-[0.2em]">Core Capabilities</span>
            <h2 className="text-4xl font-light tracking-tight mt-3">Precision Services.</h2>
          </div>
          <Link href="/services" className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-blue-500 transition-colors border-b border-white/20 pb-1 w-max">
            View All Services <ChevronRight size={14}/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group relative bg-neutral-950 border border-white/10 rounded-sm overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer flex flex-col sm:flex-row h-full">
              <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <Image 
                  src={service.img} 
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <h3 className="text-xl font-medium mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">{service.desc}</p>
                <div className="mt-auto text-xs font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Learn More <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          UPDATED: Workshop Gallery Section
      ========================================= */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Flex Header with "View All Photos" pointing straight to /gallery */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Camera size={16} /> Inside The Workshop
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mt-3">
                State-Of-The-Art Facility.
              </h2>
            </div>
            
            {/* Desktop Link (Matches the "View All Services" design above perfectly) */}
            <Link 
              href="/gallery" 
              className="hidden md:flex text-white text-xs font-bold uppercase tracking-widest items-center gap-2 hover:text-blue-500 transition-colors border-b border-white/20 pb-1 w-max"
            >
              View All Photos <ChevronRight size={14}/>
            </Link>
          </div>
          {/* Changed to a 3-column grid for perfect 6-image alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((item, idx) => (
              <div key={idx} className="relative h-56 md:h-72 rounded-sm overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                
                <Image 
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
                />
                
                {/* Dark Vignette Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500 z-10"></div>
                
                {/* Text Overlay Data */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-medium text-white">
                    {item.title}
                  </h3>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Supabase Review Section */}
      <ReviewSection />

      {/* FAQ Accordion */}
      <FAQAccordion />
        
      {/* Smart Deal Popup */}
      <DealPopup />
    </div>
  );
}