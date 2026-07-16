'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  Wrench, Calendar, Clock, RefreshCw, AlertCircle, CheckCircle, Lock, 
  Eye, EyeOff, LogOut, Download, Trash2, Star 
} from 'lucide-react';

const supabaseUrl = 'https://nzgaknvrngpyksdkbmik.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; // Ensure your full publishable key is here

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Booking {
  id: number;
  booking_id: string;
  service: string;
  date: string;
  time: string;
  make: string;
  model: string;
  year: string;
  reg_number: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  status: string;
}

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const ADMIN_EMAIL = 'nirajsaha@rediffmail.com';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user.email === ADMIN_EMAIL) {
        setSession(session);
        fetchBookings();
      } else if (session) {
        window.location.href = '/';
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user.email === ADMIN_EMAIL) {
        setSession(session);
        fetchBookings();
      } else if (session) {
        window.location.href = '/';
      } else {
        setSession(null);
        setBookings([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    });
    if (error) setAuthError(error.message);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (error) {
      alert('Error updating status');
    }
  };

  // Delete a booking entry safely from the UI and DB
  const deleteBooking = async (id: number, bookingId: string) => {
    if (!confirm(`Are you sure you want to permanently delete booking ${bookingId}?`)) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      alert('Error deleting order statement.');
    }
  };

  // Native CSV compilation logic to download spreadsheet logs instantly
  const downloadExcelCSV = () => {
    if (bookings.length === 0) return alert('No booking entries found to compile.');

    const headers = [
      'Booking ID', 'Client Name', 'Email', 'Phone', 'Date', 'Time', 
      'Vehicle Make', 'Vehicle Model', 'Reg Number', 'Service Tier', 'Status'
    ];

    const targetRows = filteredBookings.map(b => [
      b.booking_id,
      `"${b.name.replace(/"/g, '""')}"`,
      b.email,
      `'${b.phone}`, // Escape leading zeroes for spreadsheet parsers
      b.date,
      b.time,
      b.make,
      b.model,
      b.reg_number,
      b.service,
      b.status || 'pending'
    ]);

    const csvContent = [
      headers.join(','),
      ...targetRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Annexe_Motors_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!session) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-neutral-950 border border-white/10 p-8 rounded-sm shadow-2xl">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mb-6">
            <Lock className="text-blue-500" size={20} />
          </div>
          <h2 className="text-2xl font-light tracking-tight mb-1">HQ Authorization</h2>
          <p className="text-gray-500 text-xs tracking-wide mb-6 uppercase font-bold">Annexe Motors Portal</p>
          
          <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black text-xs font-bold uppercase tracking-widest py-3.5 transition-colors rounded-sm mb-6">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.3 1.56-1.17 2.88-2.48 3.76v3.13h4.01c2.34-2.16 3.61-5.33 3.61-8.74z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.01-3.13c-1.12.75-2.55 1.19-3.95 1.19-3.05 0-5.63-2.06-6.55-4.83H1.31v3.23C3.28 22.35 7.39 24 12 24z"/>
              <path fill="#FBBC05" d="M5.45 14.32a7.15 7.15 0 0 1 0-4.64V6.45H1.31a12 12 0 0 0 0 11.1l4.14-3.23z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 7.39 0 3.28 1.65 1.31 4.75l4.14 3.23c.92-2.77 3.5-4.83 6.55-4.83z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] text-gray-600 font-bold tracking-widest uppercase">Or Secure Password</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-white/10 focus:border-blue-500 px-4 py-3 text-sm rounded-sm text-white outline-none" placeholder="Admin Email" required />
            </div>
            <div>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-white/10 focus:border-blue-500 px-4 py-3 text-sm rounded-sm text-white outline-none pr-10" placeholder="••••••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-500 hover:text-white">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {authError && <p className="text-red-500 text-xs mt-2 font-medium">{authError}</p>}
            </div>
            <button type="submit" className="w-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest py-3.5 transition-colors rounded-sm">
              Log In With Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter(b => filter === 'all' || b.status === filter);

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-white/10 pb-6">
          <div>
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Management Panel</span>
            <h1 className="text-3xl font-light tracking-tight mt-1">Annexe Motors Operations</h1>
            <p className="text-xs text-gray-500 mt-1">Signed in as: {session.user.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Download Data Button */}
            <button onClick={downloadExcelCSV} className="flex items-center gap-2 border border-blue-500/30 bg-blue-500/5 text-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
              <Download size={14} /> Export View
            </button>
            <button onClick={fetchBookings} className="flex items-center gap-2 border border-white/10 bg-neutral-950 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:border-white/30 transition-all">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Queue
            </button>
            <button onClick={handleSignOut} className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 text-red-400 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-500/10 transition-all">
              <LogOut size={14} /> Disconnect
            </button>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-950 border border-white/10 p-6 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Orders</span>
              <Wrench className="text-blue-500" size={20} />
            </div>
            <p className="text-4xl font-light font-mono">{bookings.length}</p>
          </div>
          <div className="bg-neutral-950 border border-white/10 p-6 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Pending</span>
              <AlertCircle className="text-amber-500" size={20} />
            </div>
            <p className="text-4xl font-light font-mono text-amber-400">{bookings.filter(b => b.status === 'pending' || !b.status).length}</p>
          </div>
          <div className="bg-neutral-950 border border-white/10 p-6 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Completed</span>
              <CheckCircle className="text-emerald-500" size={20} />
            </div>
            <p className="text-4xl font-light font-mono text-emerald-400">{bookings.filter(b => b.status === 'completed').length}</p>
          </div>
        </div>

        {/* Quick Admin Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/admin/reviews" 
            className="group bg-neutral-950 border border-white/10 p-6 rounded-sm hover:border-blue-500/50 transition-colors flex flex-col cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-900/20 border border-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star size={18} className="text-blue-500" />
              </div>
              <h2 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                Manage Reviews
              </h2>
            </div>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
              View, edit, or delete customer testimonials on the public website.
            </p>
            <div className="mt-auto text-[10px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2">
              Open Dashboard &rarr;
            </div>
          </Link>
        </div>

        {/* Toolbar Filters */}
        <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
          {['all', 'pending', 'confirmed', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm transition-all ${filter === status ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Worklist Matrix */}
        <div className="bg-neutral-950 border border-white/10 rounded-sm overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-24 text-center text-gray-500 text-sm tracking-wide">Syncing records pipeline...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-24 text-center text-gray-500 text-sm tracking-wide">No active matches found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <th className="p-4">Client Data</th>
                    <th className="p-4">Schedule</th>
                    <th className="p-4">Vehicle Specs</th>
                    <th className="p-4">Service</th>
                    <th className="p-4 text-center">Status Action</th>
                    <th className="p-4 text-right">Purge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="font-mono text-xs text-blue-400 mb-1">{b.booking_id}</div>
                        <div className="font-medium text-white">{b.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{b.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-xs text-gray-300">{b.date}</div>
                        <div className="text-xs text-gray-500 mt-1">{b.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white text-xs uppercase font-bold tracking-wider">{b.make} {b.model}</div>
                        <div className="text-xs text-gray-500 font-mono uppercase mt-1">{b.reg_number}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-300 capitalize">{b.service.replace('-', ' ')}</div>
                      </td>
                      <td className="p-4 text-center">
                        <select
                          value={b.status || 'pending'}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className={`bg-black border border-white/10 rounded-sm p-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-blue-500 cursor-pointer ${b.status === 'confirmed' ? 'text-blue-400' : b.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => deleteBooking(b.id, b.booking_id)}
                          className="text-gray-600 hover:text-red-500 p-2 rounded-sm transition-colors duration-200"
                          title="Delete Record"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}