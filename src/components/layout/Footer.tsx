import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="space-y-4">
          <div className="text-white text-lg tracking-[0.2em] font-light uppercase">
            Annexe<span className="font-bold text-blue-500">Motors</span>
          </div>
          <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
            Elevating automotive standards through precision engineering, transparent service, and unparalleled technical expertise.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest">Headquarters</h4>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-blue-500 mt-1 shrink-0" />
              <span>E3, Near DAV School, <br />Large Industrial Area, Barari, <br />Bhagalpur - 812003, Bihar</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest">Operational Matrix</h4>
          <ul className="space-y-2 text-sm text-gray-400 font-light">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Mon - Thu</span> <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-red-400">Friday</span> <span className="text-red-400">Closed (Maintenance)</span>
            </li>
            <li className="flex justify-between pb-2">
              <span>Sat - Sun</span> <span>9:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-wider">
        <p>© {new Date().getFullYear()} Annexe Motors. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}