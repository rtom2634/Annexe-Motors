'use client';

import { useState } from 'react';
import { 
    Calendar, Clock, Car, User, CheckCircle2, 
    ChevronRight, ArrowLeft, Loader2, ShieldCheck, Settings2 
  } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = 'https://nzgaknvrngpyksdkbmik.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The 14 Services
const serviceOptions = [
  { id: 'oil-change', name: 'Oil Change & Filters' },
  { id: 'engine-repair', name: 'Engine Repair' },
  { id: 'brake-repair', name: 'Brake Repair' },
  { id: 'suspension', name: 'Suspension & Steering' },
  { id: 'ac-repair', name: 'AC Repair & Gas' },
  { id: 'electrical-repair', name: 'Electrical Diagnosis' },
  { id: 'battery', name: 'Battery Management' },
  { id: 'wheel-alignment', name: '3D Wheel Alignment' },
  { id: 'denting-painting', name: 'Denting & Painting' },
  { id: 'car-spa', name: 'Premium Car Spa' },
  { id: 'car-washing', name: 'Foam Washing' },
  { id: 'diagnostics', name: 'Scanner Diagnostics' },
  { id: 'general-service', name: 'General Service' },
  { id: 'insurance-claim', name: 'Insurance Claim' },
];

const timeSlots = [
  "09:00 AM", "10:30 AM", "12:00 PM", 
  "02:00 PM", "03:30 PM", "05:00 PM"
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    make: '',
    model: '',
    year: '',
    regNumber: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Custom phone change handler with real-time validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    setFormData({ ...formData, phone: rawInput });

    // Remove formatting characters to isolate numbers
    const cleanPhone = rawInput.replace(/[\s-()]/g, '');
    
    // Checks for optional country codes (+91, 91, or 0) followed by 10 digits starting with 6, 7, 8, or 9
    const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;

    if (rawInput === '') {
      setPhoneError('');
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
    } else {
      setPhoneError('');
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Cleaned and Fixed Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneError) return; // Prevent submission if phone is invalid
    setIsSubmitting(true);
    
    // Generate unique identifier
    const generatedId = 'AM-' + Math.floor(10000 + Math.random() * 90000);
    
    try {
      // 1. Insert into Supabase Database (Happens exactly once)
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            booking_id: generatedId,
            service: formData.service,
            date: formData.date,
            time: formData.time,
            make: formData.make,
            model: formData.model,
            year: formData.year,
            reg_number: formData.regNumber,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            notes: formData.notes
          }
        ]);

      if (error) throw error;

      // 2. Trigger Gmail Notification API silently in the background
      try {
        await fetch('/api/confirm-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            bookingId: generatedId,
            service: formData.service,
            date: formData.date,
            time: formData.time
          })
        });
      } catch (apiErr) {
        // Log background error but don't disrupt user's success experience
        console.error('Background notification dispatch failed:', apiErr);
      }

      // 3. Complete Flow and Update UI
      setBookingId(generatedId);
      setIsSuccess(true);
    } catch (dbError: any) {
      console.error('Database Submission Error:', dbError);
      alert(`Error saving booking: ${dbError.message || 'Check connection details'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center py-24 px-6">
        <div className="max-w-md w-full bg-neutral-950 border border-white/10 p-10 rounded-sm text-center shadow-2xl">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-blue-500" size={40} />
          </div>
          <h2 className="text-3xl font-light tracking-tight mb-2">Booking Confirmed.</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-sm py-4 my-6">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Your Booking ID</p>
            <p className="text-3xl text-blue-400 font-mono tracking-wider">{bookingId}</p>
          </div>

          <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
            Thank you, {formData.name}. Your appointment for {formData.service.replace('-', ' ')} is confirmed for {formData.date} at {formData.time}. A confirmation receipt has been dispatched to {formData.email}.
          </p>
          <Link href="/">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">Priority Reservation</span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mt-4 mb-4">Schedule Your Service.</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Select your required service, choose a convenient time, and drop off your vehicle. We'll handle the rest with precision.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-blue-500 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          
          {[1, 2, 3].map((num) => (
            <div key={num} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border bg-black transition-colors duration-300 ${step >= num ? 'border-blue-500 text-blue-500' : 'border-white/20 text-gray-500'}`}>
              {step > num ? <CheckCircle2 size={18} /> : num}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-neutral-950 border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            
            {/* STEP 1: Service & Time */}
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-3">
                    <Settings2 className="text-blue-500" size={20} /> Select Required Service
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 text-sm md:grid-cols-3 gap-3">
                    {serviceOptions.map((svc) => (
                      <div 
                        key={svc.id}
                        onClick={() => setFormData({...formData, service: svc.id})}
                        className={`cursor-pointer p-4 border rounded-sm transition-all text-center ${formData.service === svc.id ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                      >
                        {svc.name}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-3">
                      <Calendar className="text-blue-500" size={20} /> Preferred Date
                    </h3>
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors color-scheme-dark"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-3">
                      <Clock className="text-blue-500" size={20} /> Preferred Time
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <div 
                          key={time}
                          onClick={() => setFormData({...formData, time})}
                          className={`cursor-pointer p-4 text-sm border rounded-sm transition-all text-center ${formData.time === time ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* STEP 2: Vehicle Details */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <Car className="text-blue-500" size={20} /> Vehicle Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Make / Brand</label>
                    <input 
                      type="text" 
                      name="make"
                      required
                      placeholder="e.g. Hyundai, Honda, BMW"
                      value={formData.make}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Model</label>
                    <input 
                      type="text" 
                      name="model"
                      required
                      placeholder="e.g. Creta, City, 320d"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Manufacturing Year</label>
                    <input 
                      type="number" 
                      name="year"
                      required
                      placeholder="e.g. 2019"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Registration Number</label>
                    <input 
                      type="text" 
                      name="regNumber"
                      required
                      placeholder="e.g. BR 01 XX 1234"
                      value={formData.regNumber}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors uppercase"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <User className="text-blue-500" size={20} /> Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full bg-black border rounded-sm p-4 text-white focus:outline-none transition-colors ${
                        phoneError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium animate-in fade-in duration-200">
                        {phoneError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Additional Notes / Complaints</label>
                    <textarea 
                      name="notes"
                      rows={3}
                      placeholder="Describe any specific issues (e.g., knocking sound from front left wheel...)"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 p-4 rounded-sm">
                  <ShieldCheck className="text-blue-500 shrink-0" size={20} />
                  <p className="text-xs text-blue-100/70 leading-relaxed">
                    Your data is secure. By submitting this form, you authorize Annexe Motors to contact you regarding this service appointment. No upfront payment is required today.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <ArrowLeft size={16} /> Previous
                </button>
              ) : <div></div>}

              <button 
                type="submit"
                disabled={
                  isSubmitting || 
                  !!phoneError || 
                  (step === 1 && (!formData.service || !formData.date || !formData.time))
                }
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={16} /> Processing...</>
                ) : step === 3 ? (
                  <><CheckCircle2 size={16} /> Confirm Booking</>
                ) : (
                  <>Continue <ChevronRight size={16} /></>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}