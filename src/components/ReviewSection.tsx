'use client';

import { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2, MessageSquareQuote, User } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nzgaknvrngpyksdkbmik.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dummyReviews = [
  { id: 'd1', name: 'Rajesh K.', rating: 5, review: 'Absolutely stellar service. My BMW feels brand new after the engine overhaul and foam wash. The transparency and professionalism here are unmatched in Bhagalpur.', created_at: new Date().toISOString() },
  { id: 'd2', name: 'Amit Patel', rating: 5, review: 'The 3D wheel alignment fixed a pulling issue three other garages couldn’t diagnose. Dealership-level equipment without the massive markup. Highly recommend Annexe Motors.', created_at: new Date().toISOString() },
  { id: 'd3', name: 'Sneha Singh', rating: 4, review: 'Got my car dented and painted here. The color matching is flawless, you cannot tell where the scratch was. Great waiting lounge and polite staff.', created_at: new Date().toISOString() },
];

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', review: '' });
  const [liveReviews, setLiveReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10); 
      
      if (!error && data) setLiveReviews(data);
    };
    fetchReviews();
  }, [isSuccess]);

  // Combine and duplicate for a seamless infinite marquee scroll
  const displayReviews = [...liveReviews, ...dummyReviews];
  const marqueeItems = [...displayReviews, ...displayReviews]; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert([{ 
        name: formData.name, rating, review: formData.review 
      }]);
      if (error) throw error;
      setIsSuccess(true);
      setFormData({ name: '', review: '' });
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="text-center">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mb-4">
            <MessageSquareQuote size={16} /> Client Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
            Hear From Our Clients.
          </h2>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full overflow-hidden mb-24 flex">
        {/* Gradient fades for the edges */}
        <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        <div className="animate-scroll gap-6 px-6">
          {marqueeItems.map((rev, idx) => (
            <div key={`${rev.id || idx}-${idx}`} className="w-[320px] md:w-[400px] flex-shrink-0 bg-neutral-950 border border-white/10 p-8 rounded-sm hover:border-blue-500/30 transition-colors flex flex-col h-[280px]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < rev.rating ? "fill-blue-500 text-blue-500" : "text-neutral-700"} />
                ))}
              </div>
              <p className="text-gray-400 font-light text-sm leading-relaxed mb-6 flex-grow overflow-hidden">
                "{rev.review}"
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <User size={14} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">{rev.name}</p>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest">Verified Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-neutral-950 border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl max-w-2xl mx-auto relative">
          {isSuccess ? (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-blue-500" size={40} />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Thank You.</h3>
              <p className="text-gray-400 font-light text-sm">Your review has been published.</p>
              <button onClick={() => setIsSuccess(false)} className="mt-8 text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="text-center border-b border-white/10 pb-6 mb-6">
                <h3 className="text-xl font-light text-white mb-2">Rate Your Experience</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Help us maintain perfection</p>
              </div>

              <div className="flex justify-center items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoveredRating(star)} onMouseLeave={() => setHoveredRating(0)} className="transition-transform hover:scale-110 focus:outline-none">
                    <Star size={32} className={`transition-colors duration-200 ${star <= (hoveredRating || rating) ? 'fill-blue-500 text-blue-500' : 'text-neutral-800'}`} />
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Your Name</label>
                  <input type="text" required placeholder="E.g. John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Your Review</label>
                  <textarea required rows={3} placeholder="Tell us about your service experience..." value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })} className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                {isSubmitting ? 'Submitting...' : <>Submit Feedback <Send size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}