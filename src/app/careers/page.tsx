'use client';

export default function CareersPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Join the Fleet</span>
        <h1 className="text-5xl font-light tracking-tight mt-4 mb-4">Engineering Careers.</h1>
        <p className="text-gray-400 font-light max-w-xl leading-relaxed mb-12">We seek advanced OBD diagnostics mechanics, computerized refinishing technicians, and workshop floor heads.</p>
        <div className="border border-white/10 bg-neutral-950 p-8 rounded-sm text-center">
          <p className="text-sm text-gray-500">No open roles matching your search currently. Forward portfolios to technical recruitment lines.</p>
        </div>
      </div>
    </div>
  );
}