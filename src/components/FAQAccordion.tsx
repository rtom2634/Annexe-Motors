'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you provide pick-up and drop-off services?",
    answer: "Yes, we offer complimentary valet pick-up and drop-off within a 15km radius of our workshop for all major servicing and detailing packages."
  },
  {
    question: "What kind of warranty do you provide on repairs?",
    answer: "We stand behind our craftsmanship. All mechanical repairs come with a standard 6-month or 10,000 km warranty on parts and labor. Premium detailing packages include multi-year ceramic coating warranties."
  },
  {
    question: "How often should I get my vehicle's AC serviced?",
    answer: "For optimal cooling and hygiene, we recommend a deep AC sanitization and gas check every 12 months, especially before the summer season."
  },
  {
    question: "Do you service luxury and imported vehicles?",
    answer: "Absolutely. Our technicians are factory-trained to handle premium European and Japanese marques, equipped with the latest OBD-2 diagnostic scanners for brands like BMW, Mercedes, Audi, and more."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <section className="bg-black py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Client Support</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border ${isOpen ? 'border-blue-500/30 bg-blue-950/10' : 'border-white/10 bg-neutral-950'} rounded-sm overflow-hidden transition-colors duration-300`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-sm font-semibold tracking-wide ${isOpen ? 'text-blue-400' : 'text-gray-200'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-400 text-xs leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}