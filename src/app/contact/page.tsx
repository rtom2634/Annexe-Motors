'use client';

import { MapPin, Phone, Mail, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Annexe+Motors+Barari+Large+Industrial+Area+Bhagalpur";

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">Get in Touch</span>
          <h1 className="text-5xl font-light tracking-tight mt-4 mb-8">Contact the <br/>Technical Team.</h1>
          <p className="text-gray-400 font-light leading-relaxed mb-12">Whether you need a routine service or complex diagnostics, our advisors are ready to assist you.</p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <MapPin className="text-blue-500 shrink-0" size={28} />
              <div>
                <h4 className="text-lg font-medium mb-1">Headquarters</h4>
                <p className="text-gray-400 font-light text-sm">E3, Near DAV School,<br/>Large Industrial Area, Barari,<br/>Bhagalpur - 812003, Bihar</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <Phone className="text-blue-500 shrink-0" size={28} />
              <div>
                <h4 className="text-lg font-medium mb-1">Direct Lines</h4>
                <p className="text-gray-400 font-light text-sm">+91 95340 26100 <br/>+91 87898 51105  <br/> +91 96312 72286</p>
              </div>
            </div>

            {/* NEW EMAIL SECTION */}
            <div className="flex gap-6">
              <Mail className="text-blue-500 shrink-0" size={28} />
              <div>
                <h4 className="text-lg font-medium mb-1">Digital Support</h4>
                <p className="text-gray-400 font-light text-sm flex flex-col gap-1">
                  <a href="mailto:annexebosch@gmail.com" className="hover:text-blue-400 transition-colors">annexebosch@gmail.com</a>
                  
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <Clock className="text-blue-500 shrink-0" size={28} />
              <div>
                <h4 className="text-lg font-medium mb-1">Business Hours</h4>
                <p className="text-gray-400 font-light text-sm">Mon - Sun: 9:00 AM - 6:00 PM<br/><span className="text-red-400">Friday: Closed</span></p>
              </div>
            </div>
          </div>

          <div className="relative mt-12">
            {/* Radiating Glowing Effect */}
            <div className="absolute inset-0 bg-green-500/20 blur-xl animate-pulse rounded-sm"></div>
            
            {/* Main Alert Box */}
            <div className="relative bg-green-950/40 border border-green-500/30 p-6 rounded-sm flex gap-4 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <AlertTriangle className="text-green-500 shrink-0" size={24} />
              <div>
                <h4 className="text-green-500 font-semibold mb-1">24/6 Breakdown Assistance</h4>
                <p className="text-green-200/70 text-sm font-light">Call our emergency hotline at +91 95340 26100 for immediate towing and support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Map Section */}
        <div className="relative h-[600px] w-full flex flex-col">
          <div className="relative group rounded-sm overflow-hidden border border-white/10 hover:border-blue-500/40 transition-colors bg-neutral-950 h-full w-full">
            
            {/* Direct Map Redirection Trigger */}
            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-300 z-10 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <div className="bg-white text-black px-5 py-3 rounded-sm font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl transform scale-95 group-hover:scale-100 transition-transform duration-300">
                Open in Google Maps <ExternalLink size={14} />
              </div>
            </a>

            {/* Standard iframe display */}
            <iframe
              title="Annexe Motors Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.1643445831966!2d87.0175591!3d25.2650573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f049f50e93a7eb%3A0xc6cb526d573d8ab5!2sAnnexe%20Motors!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
            />
          </div>
          <p className="text-right text-gray-500 text-[11px] mt-3 tracking-wide">
            * Click anywhere on the map to start navigation via Google Maps.
          </p>
        </div>

      </div>
    </div>
  );
}