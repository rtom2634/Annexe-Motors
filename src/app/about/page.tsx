'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Target, Trophy, CheckCircle2, Quote, Compass, ShieldCheck, ArrowRight, Eye } from 'lucide-react';

export default function AboutPage() {
  
  // Workshop Zones Data
  const workshopZones = [
    {
      title: "The Portal",
      subtitle: "Reception & Diagnostic Intake",
      desc: "Our clean, clinical customer lounge and initial diagnostic evaluation zone. Here, your vehicle's baseline telemetry is run before entering the workspace.",
      image: "/workshopphotos/IMG_9203.jpeg" // Replace with actual image of the reception area
    },
    {
      title: "The Precision Lab",
      subtitle: "Service Bays & 3D Alignment",
      desc: "Equipped with state-of-the-art hydraulic lifts, computerized 3D wheel balancers, and direct digital scanner matrix nodes to perform accurate mechanical surgery.",
      image: "/workshopphotos/IMG_9165.jpeg"
    },
    {
      title: "The Baking Vault",
      subtitle: "Climate-Controlled Painting Booth",
      desc: "A completely sealed, dust-free environment configured to reach precisely 60°C to bake multi-stage polyurethane paints into a mirror-like factory finish.",
      image: "/workshopphotos/IMG_9228.jpeg"
    }
  ];

  // Founders Data
  const founders = [
    {
      name: "Mr. Niraj Kumar",
      role: "Founder ",
      thought: "We didn't build Annexe Motors to be just another garage in Bihar. We built it to bring clinical, aerospace-level precision to standard road cars. Transparency isn't an option here—it is the bedrock of our telemetry and engineering.",
      image: "/workshopphotos/IMG_9239.jpeg" // Replace with actual headshot
    },
    {
      name: "Mr. Sanjeev Kumar",
      role: "Founder",
      thought: "Excellent engineering is useless if the customer experience is broken. By introducing real-time digital tracking, strict OEM parts protocols, and honest pricing matrices, we are redefining what workshop trust feels like.",
      image: "/workshopphotos/IMG_9147.jpeg" // Replace with actual headshot
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION WITH FADE-IN */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 relative">
        <div className="absolute -top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.25em] block mb-4 animate-fade-in">Our Heritage & Engineering</span>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mt-4 mb-8 leading-tight">
          Where Automotive <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 font-medium">Science Meets Craft.</span>
        </h1>
        
        {/* Entrance / Workshop Showcase Hero Image */}
        <div className="relative w-full h-[65vh] border border-white/10 rounded-sm overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          <Image 
            src="/workshopphotos/Annexemotorsfront.png" // Points to your denting/painting or main workshop view
            alt="Annexe Motors Workshop Entrance" 
            fill 
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms] ease-out" 
            unoptimized 
          />
          <div className="absolute bottom-8 left-8 z-20">
            <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-1">Industrial Outpost</p>
            <h3 className="text-xl font-light">E3 Barari Industrial Area, Bhagalpur</h3>
          </div>
        </div>
      </div>

      {/* 2. THE STORY & MISSION (CREATIVE SPLIT) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 mb-32 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">The Genesis</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">Disrupting the Traditional Garage Model.</h2>
          <p className="text-gray-400 font-light leading-relaxed">
            For decades, car owners in Eastern India faced a painful compromise: pay exorbitant dealership prices or trust local, untrained mechanics who rely on guesswork. 
          </p>
          <p className="text-gray-400 font-light leading-relaxed">
            Annexe Motors was established to bridge this exact gap. By marrying dealership-grade digital diagnostic equipment with clinical mechanical practices, we provide an transparent, high-end alternative that honors your vehicle's engineering standards.
          </p>
        </div>
        
        <div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
          <div className="bg-neutral-950/80 p-10 border border-white/5 hover:border-blue-500/20 rounded-sm transition-all duration-500 group">
            <Target className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-medium mb-3">Our Mission</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              To democratize clinical automotive diagnostics with absolute honesty. We dismantle complex diagnostic logs into transparent steps, ensuring you pay only for exactly what your vehicle requires.
            </p>
          </div>
          <div className="bg-neutral-950/80 p-10 border border-white/5 hover:border-green-500/20 rounded-sm transition-all duration-500 group">
            <Compass className="text-green-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-medium mb-3">Our Vision</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              To stand as the absolute hallmark of multi-brand engineering in Bihar, standardizing electric vehicle (EV) telemetry updates and classic internal combustion engine overhauls under one banner.
            </p>
          </div>
        </div>
      </div>

      {/* 3. PHYSICAL SPACES PORTFOLIO (INTERACTIVE HOVER CARDS) */}
      <div className="bg-neutral-950/40 border-y border-white/5 py-24 mb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-2">Spatial Architecture</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">The Zones of Excellence.</h2>
            <p className="text-gray-500 font-light mt-3 text-sm">Every segment of our Barari facility is optimized for safety, precision, and efficiency.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workshopZones.map((zone, idx) => (
              <div 
                key={idx} 
                className="group relative bg-black border border-white/5 rounded-sm overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={zone.image} 
                    alt={zone.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="p-8 relative z-20">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-500 block mb-1">{zone.subtitle}</span>
                  <h3 className="text-xl font-light mb-4 text-white">{zone.title}</h3>
                  <p className="text-gray-400 font-light text-xs leading-relaxed">{zone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. FOUNDERS' PHILOSOPHY (CHIQUE & PREMIUM WITH QUOTES) */}
      <div className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-20">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-2">Leadership Core</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">The Philosophies Behind the Brand</h2>
        </div>

        <div className="space-y-24">
          {founders.map((founder, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Founder Image Card */}
              <div className="w-full lg:w-1/3 aspect-[4/5] relative rounded-sm overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(255,255,255,0.02)]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <h4 className="text-lg font-medium text-white">{founder.name}</h4>
                  <p className="text-xs text-gray-400 font-light">{founder.role}</p>
                </div>
              </div>

              {/* Founder Philosophy quote */}
              <div className="w-full lg:w-2/3 space-y-6">
                <Quote className="text-blue-500 opacity-20" size={54} />
                <blockquote className="text-xl md:text-2xl font-light tracking-wide text-gray-200 leading-relaxed italic">
                  "{founder.thought}"
                </blockquote>
                <div className="h-[1px] w-12 bg-blue-500"></div>
                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-widest text-white">{founder.name}</h5>
                  <p className="text-xs text-gray-500 mt-1">{founder.role} • Annexe Motors Board</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. WHY TRUST US MATRIX (CLEAN ICONS & TRANSITIONS) */}
      <div className="border-t border-white/10 bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-2">Our Commitments</span>
            <h2 className="text-3xl font-light tracking-tight">The Mechanics of Trust</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "OEM Genuine Parts Only", desc: "Every filter, belt, sensor, and hardware fluid matches or exceeds manufacturer specifications." },
              { title: "6-Month Service Warranty", desc: "We fully stand behind our labor and material applications, providing absolute operational safety." },
              { title: "Transparent Digital Billing", desc: "Interactive job-cards sent directly to your screen with step-by-step pricing prior to work initiation." },
              { title: "Factory-Trained Technicians", desc: "Our staff holds multi-brand mechanical experience to navigate complex ECU interfaces and gearboxes." },
              { title: "Live Repair Progress Updates", desc: "Recieve high-definition photographic proof of critical replacements directly via your advisor." },
              { title: "Free Pickup & Drop", desc: "Uncompromised convenience safely managed by our trained technical transport team in Bhagalpur." }
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex gap-4 p-6 rounded-sm bg-black border border-white/5 hover:border-white/20 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-medium mb-1 text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}