'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, User, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = 'https://nzgaknvrngpyksdkbmik.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. Add the dummy reviews array here
const dummyReviews = [
  { id: 'd1', name: 'Rajesh K.', rating: 5, review: 'Absolutely stellar service. My BMW feels brand new after the engine overhaul and foam wash. The transparency and professionalism here are unmatched in Bhagalpur.', created_at: new Date().toISOString() },
  { id: 'd2', name: 'Amit Patel', rating: 5, review: 'The 3D wheel alignment fixed a pulling issue three other garages couldn’t diagnose. Dealership-level equipment without the massive markup. Highly recommend Annexe Motors.', created_at: new Date().toISOString() },
  { id: 'd3', name: 'Sneha Singh', rating: 4, review: 'Got my car dented and painted here. The color matching is flawless, you cannot tell where the scratch was. Great waiting lounge and polite staff.', created_at: new Date().toISOString() },
];

export default function ReviewsPage() {
  const [liveReviews, setLiveReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false }); // Newest first
      
      if (data && !error) {
        setLiveReviews(data);
      }
      setIsLoading(false);
    };

    fetchAllReviews();
  }, []);

  // 2. Combine live reviews from Supabase with the dummy reviews
  const displayReviews = [...liveReviews, ...dummyReviews];

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mb-4">
            <MessageSquareQuote size={16} /> Client Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
            Words From Our Clients.
          </h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Transparency and excellence are the core of Annexe Motors. Read the unedited experiences of the families and car enthusiasts we have had the privilege to serve.
          </p>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-blue-500 gap-4">
            <Loader2 className="animate-spin" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Reviews...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 3. Map over the combined displayReviews array */}
            {displayReviews.map((rev, idx) => (
              <div 
                key={rev.id || idx} 
                className="bg-neutral-950 border border-white/10 p-8 rounded-sm hover:border-blue-500/30 transition-colors flex flex-col h-full hover:-translate-y-1 duration-300 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < rev.rating ? "fill-blue-500 text-blue-500" : "text-neutral-800"} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest">
                    {new Date(rev.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <p className="text-gray-300 font-light text-sm leading-relaxed mb-8 flex-grow">
                  "{rev.review}"
                </p>
                
                <div className="flex items-center gap-3 border-t border-white/10 pt-5 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-900/20 border border-blue-500/20 flex items-center justify-center">
                    <User size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold uppercase tracking-wider">{rev.name}</p>
                    <p className="text-blue-500/70 text-[10px] uppercase tracking-widest flex items-center gap-1 mt-1">
                      Verified Client
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {displayReviews.length === 0 && (
              <div className="col-span-full text-center py-20 border border-white/10 bg-neutral-950 rounded-sm">
                <p className="text-gray-500 font-light">No reviews have been published yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}