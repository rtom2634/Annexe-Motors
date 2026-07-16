import Image from 'next/image';
import { ShieldCheck, Trophy, Wrench } from 'lucide-react';

export default function DecadeOfExcellence() {
  const stats = [
    { icon: <Trophy size={20} />, value: '10+', label: 'Years of Excellence' },
    { icon: <Wrench size={20} />, value: '15k+', label: 'Vehicles Serviced' },
    { icon: <ShieldCheck size={20} />, value: '100%', label: 'Satisfaction Guarantee' },
  ];

  return (
    <section className="bg-black py-24 border-y border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Visuals */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-sm blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative h-[500px] w-full rounded-sm overflow-hidden border border-white/10 bg-neutral-900">
              {/* Replace this src with a real high-quality shop photo like /shop-floor.jpg */}
              <img 
                src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000&auto=format&fit=crop" 
                alt="Annexe Motors Shop Floor" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-700 group-hover:scale-105"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-neutral-950 border border-white/10 p-6 rounded-sm shadow-2xl">
              <div className="text-blue-500 font-mono text-4xl font-light tracking-tighter mb-1">2013</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Established</div>
            </div>
          </div>

          {/* Right: Copy & Stats */}
          <div>
            <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Our Legacy</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
              A decade of elevating automotive standards.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              At Annexe Motors, we don't just fix cars; we restore the feeling of driving a masterpiece. For over a decade, we have blended cutting-edge diagnostic technology with old-world craftsmanship to deliver unparalleled service for families and enthusiasts alike.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="text-blue-400">{stat.icon}</div>
                  <div className="text-2xl font-light text-white">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}