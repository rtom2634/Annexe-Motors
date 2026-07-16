'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, Shield, Settings2, ChevronRight, CheckCircle2, 
  ArrowLeft, Loader2, Link as LinkIcon, Wrench, Zap, Award, ArrowRight 
} from 'lucide-react';

interface ServiceData {
  title: string;
  heroImage: string;
  description: string;
  benefits: string[];
  price: string;
  estimatedTime: string;
  included: string[];
  faqs: { q: string; a: string }[];
  relatedServices: { name: string; slug: string }[];
}

// 1. SPECIFIC SERVICE DATABASE
const servicesDatabase: Record<string, ServiceData> = {
    'oil-change': {
      title: "Premium Oil Change & Filtration",
      heroImage: "https://images.unsplash.com/photo-1635787595874-94b29bb8ab3f?auto=format&fit=crop&w=1200&q=80",
      description: "Your engine's lifeblood. We utilize only OEM-specified synthetic oils to ensure maximum thermal efficiency, reduced friction, and prolonged engine component life.",
      benefits: ["Optimizes Fuel Economy", "Reduces Engine Operating Temp", "Prevents Internal Metal Wear"],
      price: "Starts at ₹1,499",
      estimatedTime: "45 Minutes",
      included: ["Synthetic Engine Oil Base Swap", "OEM Oil Filter Replacement", "Air & Cabin Filter Purification", "Fluid Level Top-ups & Inspection"],
      relatedServices: [{ name: "General Service", slug: "general-service" }, { name: "Engine Repair", slug: "engine-repair" }],
      faqs: [{ q: "How often should I change my car engine oil?", a: "Generally every 10,000 km or 12 months, depending on your vehicle model's technical parameters." }]
    },
    'engine-repair': {
      title: "Engine Repair & Overhaul",
      heroImage: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
      description: "Comprehensive engine diagnostics and mechanical rebuilding. From timing belt replacements to complete block overhauls, we restore factory power and reliability.",
      benefits: ["Restores Factory Horsepower", "Eliminates Engine Knocking", "Prevents Total Engine Failure"],
      price: "Custom Estimate",
      estimatedTime: "2 - 7 Days",
      included: ["Compression Testing", "Timing Belt/Chain Inspection", "Gasket & Seal Replacement", "Post-Repair Dyno/Road Test"],
      relatedServices: [{ name: "Diagnostics", slug: "diagnostics" }, { name: "Oil Change", slug: "oil-change" }],
      faqs: [{ q: "Do you use genuine engine parts?", a: "Yes, we source 100% OEM or OES components for all critical internal engine repairs." }]
    },
    'brake-repair': {
      title: "Brake Repair & Diagnostics",
      heroImage: "https://images.unsplash.com/photo-1503376712351-1d54201a4e10?auto=format&fit=crop&w=1200&q=80",
      description: "High-performance braking system restoration. We handle disc skimming, premium pad replacements, and high-pressure fluid bleeding for immediate stopping power.",
      benefits: ["Eliminates Squeaking Noises", "Reduces Stopping Distance", "Prevents Rotor Warping"],
      price: "Starts at ₹700 (Labour + GST)",
      estimatedTime: "1 - 2 Hours",
      included: ["Brake Pad Replacement", "Rotor Resurfacing/Skimming", "Caliper Pin Greasing", "Brake Fluid Bleeding"],
      relatedServices: [{ name: "Wheel Alignment", slug: "wheel-alignment" }, { name: "Suspension", slug: "suspension" }],
      faqs: [{ q: "How do I know my brakes need replacing?", a: "Look out for squealing noises, a spongy pedal feel, or steering wheel vibrations when braking." }]
    },
    'suspension': {
      title: "Suspension & Steering Setup",
      heroImage: "https://images.unsplash.com/photo-1600705663748-03487c69994c?auto=format&fit=crop&w=1200&q=80",
      description: "Restore your vehicle's ride comfort and handling geometry. We calibrate shock absorbers, replace struts, and service control arm bushes.",
      benefits: ["Restores Smooth Ride Comfort", "Improves Cornering Stability", "Prevents Uneven Tire Wear"],
      price: "Starts at ₹400/strut (Labour + GST)",
      estimatedTime: "3 - 5 Hours",
      included: ["Shock Absorber Testing", "Bush & Mount Replacement", "Steering Rack Inspection", "Link Rod Replacement"],
      relatedServices: [{ name: "Wheel Alignment", slug: "wheel-alignment" }, { name: "Brake Repair", slug: "brake-repair" }],
      faqs: [{ q: "Why is my car bouncing over bumps?", a: "This is a classic sign of worn shock absorbers or struts failing to dampen the spring oscillation." }]
    },
    'ac-repair': {
      title: "AC Repair & Gas Top-Up",
      heroImage: "https://images.unsplash.com/photo-1616053335509-f6ce0a08e1a6?auto=format&fit=crop&w=1200&q=80",
      description: "Complete climate control restoration. Utilizing advanced leak detection, compressor diagnostics, and automated r134a/r1234yf refrigerant recovery and recharging.",
      benefits: ["Ice-Cold Cabin Temps", "Removes Musty Odors", "Improves Compressor Lifespan"],
      price: "Starts at ₹1,500 (Labour + GST)",
      estimatedTime: "2 Hours",
      included: ["Automated Gas Extraction & Refill", "Compressor Oil Top-up", "Condenser Cleaning", "Cabin Filter Replacement"],
      relatedServices: [{ name: "Electrical Repair", slug: "electrical-repair" }, { name: "General Service", slug: "general-service" }],
      faqs: [{ q: "Why is my AC blowing warm air?", a: "This is usually caused by low refrigerant gas due to a micro-leak, or a failing AC compressor clutch." }]
    },
    'electrical-repair': {
      title: "Advanced Electrical Repair",
      heroImage: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=1200&q=80",
      description: "Precision tracing for complex electrical faults. We handle ECU flashing, wiring harness repairs, and complete sensor matrix replacements.",
      benefits: ["Prevents Battery Drain", "Restores Dashboard Functionality", "Eliminates Short Circuits"],
      price: "Custom Estimate",
      estimatedTime: "2 - 6 Hours",
      included: ["Multimeter Wiring Trace", "Alternator & Starter Testing", "Fuse & Relay Matrix Check", "Sensor Calibration"],
      relatedServices: [{ name: "Battery", slug: "battery" }, { name: "Diagnostics", slug: "diagnostics" }],
      faqs: [{ q: "Can you fix rat bite wiring damage?", a: "Yes, we specialize in reconstructing and re-pinning wiring harnesses damaged by rodents." }]
    },
    'battery': {
      title: "Battery Management & Sales",
      heroImage: "https://images.unsplash.com/photo-1620606626601-3e2849e75525?auto=format&fit=crop&w=1200&q=80",
      description: "Professional battery load testing and replacement. We stock premium, high-cranking capacity batteries from brands like Amaron and Exide with full warranties.",
      benefits: ["Reliable Morning Starts", "Protects Alternator Health", "Instant Electrical Power"],
      price: "Starts at ₹3,500 (Exchange)",
      estimatedTime: "30 Minutes",
      included: ["Digital Load Testing", "Terminal Anti-Corrosion Spray", "Alternator Charging Check", "Old Battery Recycling"],
      relatedServices: [{ name: "Electrical Repair", slug: "electrical-repair" }, { name: "General Service", slug: "general-service" }],
      faqs: [{ q: "How long does a car battery last?", a: "Typically 3 to 5 years, depending on your driving habits and climate." }]
    },
    'wheel-alignment': {
      title: "3D Wheel Alignment & Balancing",
      heroImage: "https://images.unsplash.com/photo-1620188470123-7a918a38b1f2?auto=format&fit=crop&w=1200&q=80",
      description: "Computerized laser alignment to correct camber, caster, and toe angles, ensuring your vehicle tracks perfectly straight and maximizes tire longevity.",
      benefits: ["Zero Steering Pull", "Maximizes Tire Lifespan", "Improves Fuel Efficiency"],
      price: "Alignment: ₹350 | Balancing: ₹70/wheel",
      estimatedTime: "45 Minutes",
      included: ["3D Laser Sensor Alignment", "Dynamic Computerized Balancing", "Camber & Toe Adjustment", "Tire Pressure Calibration"],
      relatedServices: [{ name: "Suspension", slug: "suspension" }, { name: "Brake Repair", slug: "brake-repair" }],
      faqs: [{ q: "How often do I need alignment?", a: "We recommend a check every 5,000 km, or immediately if you hit a deep pothole." }]
    },
    'denting-painting': {
      title: "Factory-Finish Denting & Painting",
      heroImage: "https://images.unsplash.com/photo-1605810730419-4a0b2ebdf929?auto=format&fit=crop&w=1200&q=80",
      description: "Restore your vehicle to original structural and cosmetic perfection utilizing dust-free climate baking booths and computerized color matching systems.",
      benefits: ["100% Matching Guarantee", "Anti-Corrosive Base Treatment", "Restores Showroom Value"],
      price: "Starts at ₹2,200 (+ GST)",
      estimatedTime: "2 - 4 Days",
      included: ["Hydraulic Dent Pulling", "Premium Putty & Surfacer Layering", "Computerized Color Match Coating", "Clear Gloss Baking & Polish"],
      relatedServices: [{ name: "Car Spa", slug: "car-spa" }, { name: "Insurance Claim Assistance", slug: "insurance-claim" }],
      faqs: [{ q: "Will the new paint match the old paint?", a: "Yes, our automated mixing machine uses the exact OEM paint code to guarantee a 100% match." }]
    },
    'car-spa': {
      title: "Premium Car Spa & Detailing",
      heroImage: "https://images.unsplash.com/photo-1603584173870-7f1891283d41?auto=format&fit=crop&w=1200&q=80",
      description: "An intensive cosmetic service. Includes deep interior sanitization, exterior paint correction (multi-stage polishing), and premium surface protection.",
      benefits: ["Removes Swirl Marks", "Deep Wet-Look Shine", "Eliminates Interior Odors/Stains"],
      price: "Starts at ₹2,000 (+ GST)",
      estimatedTime: "6 - 8 Hours",
      included: ["3-Step Paint Correction", "Deep Interior Shampoo Extraction", "Leather Conditioning", "Engine Bay Detailing"],
      relatedServices: [{ name: "Car Washing", slug: "car-washing" }, { name: "Denting & Painting", slug: "denting-painting" }],
      faqs: [{ q: "Does polishing remove scratches?", a: "It removes light swirl marks and clear-coat scratches. Deep scratches that catch your fingernail require painting." }]
    },
    'car-washing': {
      title: "Advanced Foam Washing",
      heroImage: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
      description: "A multi-stage exterior wash utilizing thick snow foam to safely lift road grime without scratching, paired with a thorough interior vacuuming.",
      benefits: ["Protects Paint Clear Coat", "Removes Corrosive Brake Dust", "Immediate Curb Appeal"],
      price: "Starts at ₹400 (+ GST)",
      estimatedTime: "45 Minutes",
      included: ["Snow Foam Lance Wash", "High-Pressure Underbody Rinse", "Microfiber Drying", "Interior Vacuum & Dashboard Polish"],
      relatedServices: [{ name: "Car Spa", slug: "car-spa" }, { name: "General Service", slug: "general-service" }],
      faqs: [{ q: "Is foam washing better than normal washing?", a: "Yes, thick foam encapsulates dirt and lifts it off the paint, preventing micro-scratches during wiping." }]
    },
    'diagnostics': {
      title: "Complete Scanner Diagnostics",
      heroImage: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80",
      description: "State-of-the-art OBD2 system scanning. We interface with your vehicle's onboard computers to read live data, clear error codes, and pinpoint hidden faults.",
      benefits: ["Accurate Problem Identification", "Prevents Unnecessary Part Swaps", "Clears Dashboard Warning Lights"],
      price: "Starts at ₹999",
      estimatedTime: "30 Minutes",
      included: ["Full System Scan (Engine, ABS, Airbag)", "Live Telemetry Data Read", "Historical Fault Code Clearing", "Printed Diagnostic Report"],
      relatedServices: [{ name: "Electrical Repair", slug: "electrical-repair" }, { name: "Engine Repair", slug: "engine-repair" }],
      faqs: [{ q: "Can a scanner tell you exactly what is wrong?", a: "It provides precise fault codes that guide our technicians to the exact failing sensor or mechanical component." }]
    },
    'general-service': {
      title: "Comprehensive Periodic Service",
      heroImage: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
      description: "Your complete bumper-to-bumper maintenance package. Designed to match or exceed dealership service schedules to keep your car running flawlessly.",
      benefits: ["Maintains Vehicle Warranty", "Ensures Total Road Safety", "Enhances Resale Value"],
      price: "Starts at ₹1,500 (Labour + GST)",
      estimatedTime: "3 - 4 Hours",
      included: ["Engine Oil & Filter Swap", "Brake Pad Cleaning & Adjustment", "Spark Plug Inspection", "45-Point Mechanical Health Check"],
      relatedServices: [{ name: "Oil Change", slug: "oil-change" }, { name: "Wheel Alignment", slug: "wheel-alignment" }],
      faqs: [{ q: "What does the 45-point check include?", a: "We inspect all fluid levels, belts, hoses, suspension linkages, brakes, and electrical systems for wear and tear." }]
    },
    'insurance-claim': {
      title: "Insurance Claim Assistance",
      heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
      description: "End-to-end cashless insurance processing. We handle the surveyor inspections, paperwork, and direct billing with all major Indian insurance providers.",
      benefits: ["Zero Paperwork Hassle", "Cashless Repair Processing", "Faster Claim Approvals"],
      price: "Free Processing (Pay File Charges Only)",
      estimatedTime: "Documentation: 1 Day",
      included: ["Claim Intimation & Filing", "Surveyor Coordination", "Damage Estimation Report", "Post-Repair Delivery Setup"],
      relatedServices: [{ name: "Denting & Painting", slug: "denting-painting" }, { name: "Engine Repair", slug: "engine-repair" }],
      faqs: [{ q: "Which insurance companies do you work with?", a: "We have cashless tie-ups with major providers including HDFC Ergo, ICICI Lombard, Tata AIG, and more." }]
    }
  };

// 2. ALL 14 SERVICES GRID DATA
const allServicesGrid = [
  { slug: 'oil-change', title: 'Oil Change & Filters', image: '/workshopphotos/oilchange.jpeg' },
  { slug: 'engine-repair', title: 'Engine Repair', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80' },
  { slug: 'brake-repair', title: 'Brake Repair', image: '/workshopphotos/breakrepair.jpeg' },
  { slug: 'suspension', title: 'Suspension & Steering', image: '/workshopphotos/Suspension.jpeg' },
  { slug: 'ac-repair', title: 'AC Repair', image: '/workshopphotos/acrepair.jpeg' },
  { slug: 'electrical-repair', title: 'Electrical Repair', image: '/workshopphotos/electricalrepair.jpeg' },
  { slug: 'battery', title: 'Battery Management', image: '/workshopphotos/batteryrepair.jpeg' },
  { slug: 'wheel-alignment', title: 'Wheel Alignment', image: '/workshopphotos/Wheel-Balancing-Machine..jpeg' },
  { slug: 'denting-painting', title: 'Denting & Painting', image: '/workshopphotos/IMG_9180.jpeg' },
  { slug: 'car-spa', title: 'Car Spa & Detailing', image: '/workshopphotos/carspa.jpeg' },
  { slug: 'car-washing', title: 'Foam Washing', image: '/workshopphotos/IMG_9218.jpeg' },
  { slug: 'diagnostics', title: 'Scanner Diagnostics', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80' },
  { slug: 'general-service', title: 'General Service', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80' },
  { slug: 'insurance-claim', title: 'Insurance Claims', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80' }
];

export default function SingleServicePage() {
  const params = useParams();
  
  const rawParam = params?.slug || params?.id || params?.service || 'general-service';
  const slug = rawParam as string;
  
  if (!params) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Loader2 className="text-blue-500 animate-spin" size={40} />
      </div>
    );
  }

  const service = servicesDatabase[slug] || servicesDatabase['general-service'];

  return (
    <div className="bg-black min-h-screen text-white pt-24">
      
      {/* 1. Back to Catalog Control */}
      <div className="bg-neutral-950 border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link href="/services" className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white w-max transition-colors">
            <ArrowLeft size={14} /> Back To Service Catalog
          </Link>
        </div>
      </div>

      {/* 2. System Submodule Hero */}
      <div className="relative h-[45vh] w-full border-b border-white/10 flex items-center bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <img 
          src={service.heroImage} 
          alt={service.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">System Submodule</span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight max-w-3xl">{service.title}</h1>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-3 gap-16">
        
        {/* Left Column (Main Information) */}
        <div className="lg:col-span-2 space-y-16">
          
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-white/90">Description</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg">{service.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 text-white/90">Core Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-300 font-light text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 text-white/90">Included Operations</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.included.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-neutral-950 p-4 border border-white/5 rounded-sm">
                  <Settings2 className="text-blue-500 shrink-0" size={18} />
                  <span className="text-gray-300 font-light text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-neutral-950 border border-white/10 p-8 rounded-sm">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-8 text-white/90 text-center">Why Choose Annexe Motors?</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                  <Wrench size={24} />
                </div>
                <h3 className="text-white font-medium mb-2">OEM Standards</h3>
                <p className="text-gray-500 text-xs leading-relaxed">We strictly adhere to original equipment manufacturer guidelines for all repairs.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                  <Zap size={24} />
                </div>
                <h3 className="text-white font-medium mb-2">Advanced Tech</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Equipped with state-of-the-art 3D scanners, baking booths, and telemetry tools.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                  <Award size={24} />
                </div>
                <h3 className="text-white font-medium mb-2">Certified Experts</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Our master technicians have decades of combined multi-brand experience.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 text-white/90">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="border border-white/10 p-6 rounded-sm bg-neutral-950/20">
                  <h4 className="text-md font-medium mb-2 text-white">{faq.q}</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="relative">
          <div className="sticky top-32 space-y-8">
            <div className="bg-neutral-950 border border-white/10 p-8 rounded-sm shadow-2xl">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-4">Job Parameters</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <Clock className="text-gray-500" size={24} />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Estimated Timings</div>
                    <div className="text-white font-medium text-sm">{service.estimatedTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="text-gray-500" size={24} />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Base Valuations</div>
                    <div className="text-white font-medium text-sm">{service.price}</div>
                  </div>
                </div>
              </div>
              <Link href="/booking">
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2">
                  Book Now <ChevronRight size={16} />
                </button>
              </Link>
            </div>

            {service.relatedServices && service.relatedServices.length > 0 && (
              <div className="border border-white/10 p-6 rounded-sm bg-black">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Related Services</h3>
                <div className="space-y-3">
                  {/* UPDATED TO POINT TO BOOKING PAGE */}
                  {service.relatedServices.map((related, idx) => (
                    <Link 
                      key={idx} 
                      href={`/booking?service=${related.slug}`}
                      className="flex items-center justify-between group hover:bg-neutral-950 p-2 -mx-2 rounded transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{related.name}</span>
                      <LinkIcon size={14} className="text-gray-600 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW SECTION: Full 14-Service Grid Block */}
      {/* NEW SECTION: Full 14-Service Grid Block */}
      <div className="border-t border-white/10 bg-neutral-950/50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">Service Matrix</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mt-4 text-white">Explore All Services.</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allServicesGrid.map((gridItem) => (
              <Link 
                key={gridItem.slug} 
                href={`/booking?service=${gridItem.slug}`}
                className="group relative overflow-hidden rounded-sm border border-white/10 bg-neutral-950 aspect-square flex flex-col justify-end cursor-pointer"
              >
                <img 
                  src={gridItem.image} 
                  alt={gridItem.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-in-out z-0"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
                
                <div className="relative z-20 p-4">
                  <h3 className="text-sm font-medium tracking-tight mb-2 text-white group-hover:text-blue-400 transition-colors">{gridItem.title}</h3>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                    Book <ArrowRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Book an Appointment Section (Bottom CTA) */}
      <div className="border-t border-white/10 bg-neutral-950 py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4 block">Take Action</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
            Ready to Service Your Vehicle?
          </h2>
          <p className="text-gray-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Skip the waiting room. Book your {service.title.toLowerCase()} diagnostic online and secure your preferred time slot at our Bhagalpur facility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/booking" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-sm text-sm font-bold uppercase tracking-widest transition-all text-center">
              Schedule Appointment
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-sm text-sm font-bold uppercase tracking-widest transition-all text-center">
              Contact Workshop
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}