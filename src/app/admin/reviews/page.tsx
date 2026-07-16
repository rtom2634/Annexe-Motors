'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Edit2, Save, X, Star } from 'lucide-react';

const supabaseUrl = 'https://nzgaknvrngpyksdkbmik.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', rating: 5, review: '' });

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setReviews(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    
    await supabase.from('reviews').delete().eq('id', id);
    setReviews(reviews.filter(r => r.id !== id));
  };

  const handleEditClick = (review: any) => {
    setEditingId(review.id);
    setEditForm({ name: review.name, rating: review.rating, review: review.review });
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .update(editForm)
      .eq('id', id);

    if (!error) {
      setReviews(reviews.map(r => r.id === id ? { ...r, ...editForm } : r));
      setEditingId(null);
    } else {
      alert("Error updating review");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white p-12">Loading reviews...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-2">Review Management</h1>
        <p className="text-gray-500 text-sm mb-8">View, edit, or delete customer reviews displayed on the homepage.</p>
        
        <div className="bg-neutral-950 border border-white/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 uppercase tracking-widest text-xs text-gray-400">
                <tr>
                  <th className="p-4 font-semibold">Client Name</th>
                  <th className="p-4 font-semibold">Rating</th>
                  <th className="p-4 font-semibold">Review Content</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* View/Edit Form Logic */}
                    {editingId === rev.id ? (
                      <>
                        <td className="p-4">
                          <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="bg-black border border-white/20 p-2 text-white w-full rounded-sm" />
                        </td>
                        <td className="p-4">
                          <input type="number" min="1" max="5" value={editForm.rating} onChange={(e) => setEditForm({...editForm, rating: Number(e.target.value)})} className="bg-black border border-white/20 p-2 text-white w-16 rounded-sm" />
                        </td>
                        <td className="p-4">
                          <textarea value={editForm.review} onChange={(e) => setEditForm({...editForm, review: e.target.value})} className="bg-black border border-white/20 p-2 text-white w-full rounded-sm h-10 resize-none"></textarea>
                        </td>
                        <td className="p-4 text-gray-500">{new Date(rev.created_at).toLocaleDateString()}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button onClick={() => handleUpdate(rev.id)} className="p-2 bg-green-500/20 text-green-400 rounded-sm hover:bg-green-500/30 transition"><Save size={16} /></button>
                          <button onClick={() => setEditingId(null)} className="p-2 bg-gray-500/20 text-gray-400 rounded-sm hover:bg-gray-500/30 transition"><X size={16} /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 font-medium text-white">{rev.name}</td>
                        <td className="p-4">
                          <div className="flex gap-1 text-blue-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className={i < rev.rating ? "fill-blue-500" : "text-neutral-700"} />
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-gray-400 truncate max-w-[300px]">{rev.review}</td>
                        <td className="p-4 text-gray-500">{new Date(rev.created_at).toLocaleDateString()}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button onClick={() => handleEditClick(rev)} className="p-2 bg-blue-500/10 text-blue-500 rounded-sm hover:bg-blue-500/20 transition"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete(rev.id)} className="p-2 bg-red-500/10 text-red-500 rounded-sm hover:bg-red-500/20 transition"><Trash2 size={16} /></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                
                {reviews.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No reviews found in the database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}