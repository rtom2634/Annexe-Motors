'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, User, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export default function BlogsPage() {
  const blogPosts = [
    {
      category: "Diagnostic Engineering",
      icon: <Cpu className="text-blue-500" size={24} />,
      title: "The Digital Pulse: Why Modern Cars Can't Be Fixed with Just a Wrench",
      author: "Technical Team, Annexe Motors",
      date: "July 2026",
      readTime: "6 min read",
      paragraphs: [
        "In the early days of automotive engineering, a skilled mechanic could diagnose almost any engine issue simply by listening to the rhythm of the valves or examining the color of the spark plugs. Today, vehicles are essentially high-performance computers on wheels. A modern car contains dozens of Electronic Control Units (ECUs) communicating via a complex sensory matrix called the CAN-Bus network. When a warning light flashes on your dashboard, it isn’t just a simple alert—it is a sophisticated system signaling a specific telemetry anomaly.",
        "At Annexe Motors in Bhagalpur, we have moved past the era of 'trial-and-error' part replacement. Traditional roadside mechanics often guess the source of a fault, leading to expensive and unnecessary component swaps. By utilizing dealership-level OBD2 diagnostic scanners and real-time data loggers, our team interfaces directly with your car's brain. We isolate the exact sensor or mechanical component failing under operational stress.",
        "Whether it is an intermittent misfire in a turbocharged engine, a communication breakdown in your ABS module, or a calibration drift in your steering angle sensor, precision diagnostics ensure we fix the root cause right the first time. We treat every vehicle with the analytical rigor of an aerospace team, saving you both time and unnecessary repair costs."
      ]
    },
    {
      category: "Surface Science & Aesthetics",
      icon: <Sparkles className="text-green-500" size={24} />,
      title: "Defeating the Climate: How We Achieve Factory-Grade Paint Curing in Bihar",
      author: "Master Paint Tech, Annexe Motors",
      date: "June 2026",
      readTime: "5 min read",
      paragraphs: [
        "Bihar's unique environmental conditions present a severe challenge for automotive paintwork. High seasonal humidity, intense summer heat, and airborne dust particles are the worst enemies of a freshly sprayed clear coat. When paint is applied in an open environment, dust settled on wet panels leaves micro-imperfections, while humidity trapped underneath causes premature peeling, oxidation, and bubbling within months.",
        "To combat this, Annexe Motors engineered a state-of-the-art, completely sealed climate-controlled paint baking booth at our Barari industrial facility. Painting a panel isn't just about applying pigment; it is a multi-step chemical bonding process. We strip damaged panels down to the bare metal, apply high-adhesion anti-corrosive primers, and utilize computerized color matching systems that calibrate paint pigment formulas down to the exact milligram based on your car's OEM color code.",
        "The magic happens during the baking phase. By raising the booth’s ambient temperature to exactly 60°C under strictly regulated air filtration, the polyurethane molecules in the clear coat cross-link perfectly. This creates an incredibly hard, mirror-like protective shield that resists UV damage, repels road debris, and guarantees a seamless, factory-fresh gloss match that looks brand new for years."
      ]
    },
    {
      category: "Mechanical Integrity",
      icon: <ShieldAlert className="text-red-500" size={24} />,
      title: "The Silent Failure: Why Neglecting Your Brake Fluid Can Cost You Your Life",
      author: "Safety Specialist, Annexe Motors",
      date: "May 2026",
      readTime: "4 min read",
      paragraphs: [
        "When vehicle owners think about brake maintenance, they almost always focus on brake pads. While pads are critical friction components, they are utterly useless without the hydraulic system that forces them against the spinning brake rotors. This entire system relies on brake fluid, a specialized liquid engineered to withstand extreme pressures and heat. However, brake fluid has one major, dangerous characteristic: it is highly hygroscopic. This means it actively absorbs moisture from the atmosphere over time.",
        "As moisture levels in your brake fluid climb past 3%, the boiling point of the fluid drops drastically. Under heavy braking conditions—such as navigating steep highway off-ramps or sudden stops in congested city traffic—the intense friction heat transfers directly to the fluid. If the fluid contains absorbed water, that water boils and turns into steam pockets. Unlike liquid, steam is highly compressible. The next time you step on the pedal, it will feel soft, spongy, and your stopping distance will dangerously increase.",
        "Our preventive maintenance protocol at Annexe Motors includes testing your brake fluid with digital moisture analyzers. During a standard brake overhaul, we perform a complete high-pressure system flush to clear out contaminated, dark fluid and replace it with premium, high-boiling-point DOT4 fluid. This ensures maximum hydraulic pressure and instantaneous braking response when you need it most."
      ]
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2 w-max transition-colors"
          >
            <ArrowLeft size={14} /> Back To Home
          </Link>
          <div className="mt-8">
            <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] block mb-2">The Annexe Logbook</span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">Automotive Science & Engineering</h1>
            <p className="text-gray-400 font-light mt-4 leading-relaxed max-w-2xl">
              In-depth analysis, trade secrets, and professional advice from the master technicians operating at our Bhagalpur engineering workshop.
            </p>
          </div>
        </div>

        {/* Divider line */}
        <hr className="border-white/10 mb-16" />

        {/* Blog Post List */}
        <div className="space-y-20">
          {blogPosts.map((post, index) => (
            <article key={index} className="group border-b border-white/5 pb-16 last:border-0 last:pb-0">
              
              {/* Category & Icons */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-neutral-900 border border-white/10 rounded-sm">
                  {post.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{post.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h2>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 mb-8 font-medium">
                <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={14} /> {post.readTime}</span>
              </div>

              {/* Paragraph Content */}
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-base md:text-lg">
                {post.paragraphs.map((p, pIndex) => (
                  <p key={pIndex}>{p}</p>
                ))}
              </div>

            </article>
          ))}
        </div>

      </div>
    </div>
  );
}