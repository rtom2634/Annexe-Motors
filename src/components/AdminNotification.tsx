'use client';

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nzgaknvrngpyksdkbmik.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminNotification({ isAdmin }: { isAdmin: boolean }) {
  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel('realtime-bookings')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('New booking received!', payload);
          
          const audio = new Audio('/notification.mp3');
          audio.play().catch(error => {
            console.error('Browser blocked auto-play. Interact with the page first.', error);
          });

          alert(`🚨 NEW BOOKING ALERT!\nCustomer: ${payload.new.name}\nVehicle: ${payload.new.vehicle_model}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  return null;
}