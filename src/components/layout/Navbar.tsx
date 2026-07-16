'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
    ChevronDown, Menu, X, Camera, MessageSquare, BookOpen, 
    Briefcase, Shield, FileText, LogOut, LayoutDashboard, User 
  } from 'lucide-react';

const supabaseUrl = 'https://nzgaknvrngpyksdkbmik.supabase.co';
const supabaseAnonKey = 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ADMIN_EMAIL = 'nirajsaha@rediffmail.com';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const getInitials = () => {
    if (!session?.user) return '??';
    const name = session.user.user_metadata?.full_name;
    if (name) {
      const parts = name.split(' ');
      if (parts.length > 1) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.slice(0, 2).toUpperCase();
    }
    return session.user.email.slice(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Book', href: '/booking' },
    { name: 'Contact', href: '/contact' },
  ];

  const dropdownLinks = [
    { name: 'Gallery', href: '/gallery', icon: <Camera size={14} /> },
    { name: 'Reviews', href: '/reviews', icon: <MessageSquare size={14} /> },
    { name: 'Blogs', href: '/blogs', icon: <BookOpen size={14} /> },
    { name: 'Careers', href: '/careers', icon: <Briefcase size={14} /> },
    { name: 'Privacy Policy', href: '/privacy', icon: <Shield size={14} /> },
    { name: 'Terms', href: '/terms', icon: <FileText size={14} /> },
  ];

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 text-white transition-colors duration-300 ${isOpen ? 'bg-black' : 'bg-black/80 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-12 h-20 lg:h-24 flex items-center justify-between">
        
        {/* FIXED LOGO: Tiny on mobile, Massive on desktop */}
        <Link href="/" className="flex items-center gap-3 z-50 relative shrink-0">
          <Image 
            src="/logo.jpeg" 
            alt="Annexe Motors" 
            width={130} 
            height={140} 
            className="object-contain invert opacity-95 rounded-sm w-9 h-9 lg:w-16 lg:h-16" 
            priority 
          />
          <div className="flex flex-col justify-center">
            <span className="text-[18px] lg:text-[28px] font-bold uppercase tracking-tight leading-none">Annexe</span>
            <span className="text-[13px] lg:text-[38px] uppercase tracking-widest lg:tracking-normal text-gray-400 font-medium leading-none mt-1 lg:mt-0.5">Motors</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-blue-500 ${pathname === link.href ? 'text-blue-500' : 'text-gray-300'}`}>
              {link.name}
            </Link>
          ))}

          {/* Desktop Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-blue-500 transition-colors cursor-pointer"
            >
              More <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-blue-500' : ''}`} />
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 bg-zinc-950 border border-white/10 rounded-sm shadow-2xl p-2 transition-all duration-300 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              {dropdownLinks.map((subLink) => (
                <Link 
                  key={subLink.href} 
                  href={subLink.href} 
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider text-gray-400 hover:bg-white/5 hover:text-blue-400"
                >
                  <span className="text-gray-500 shrink-0">{subLink.icon}</span>
                  {subLink.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="border-l border-white/10 pl-6 ml-2 flex items-center gap-4">
            {session ? (
              isAdmin ? (
                <Link href="/admin" className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/40 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-all duration-300 hover:bg-blue-600">
                  <LayoutDashboard size={13} /> Dashboard
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <div title={session.user.email} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-950/50 border border-blue-500/50 text-blue-400 text-xs font-mono font-bold animate-pulse">
                    {getInitials()}
                  </div>
                  <button onClick={handleSignOut} className="text-gray-500 hover:text-red-400 transition-colors p-1"><LogOut size={14} /></button>
                </div>
              )
            ) : (
              <Link href="/admin" className="flex items-center gap-2 bg-zinc-950 border border-white/10 text-gray-300 hover:text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-all hover:border-blue-500/50">
                <User size={13} className="text-gray-500" /> Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 text-gray-300 hover:text-white p-2 transition-colors shrink-0"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* FIXED MOBILE OVERLAY: Pure Black Background */}
      <div 
        className={`fixed inset-0 bg-black z-40 flex flex-col pt-24 px-6 pb-8 transition-all duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 pb-10 mt-2">
          
          {/* MOBILE AUTHENTICATION (Moved to the very top) */}
          <div className="w-full">
            {session ? (
              isAdmin ? (
                <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-blue-600/10 border border-blue-500/40 text-white text-sm font-bold uppercase tracking-widest w-full py-4 rounded-sm transition-all hover:bg-blue-600">
                  <LayoutDashboard size={16} /> Admin Dashboard
                </Link>
              ) : (
                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-950 border border-blue-500/50 text-blue-400 text-sm font-mono font-bold">{getInitials()}</div>
                    <span className="text-sm font-medium text-gray-300 truncate max-w-[150px]">{session.user.email}</span>
                  </div>
                  <button onClick={handleSignOut} className="text-red-400 hover:text-red-300 p-2 border border-red-500/30 rounded-sm bg-red-500/10"><LogOut size={16} /></button>
                </div>
              )
            ) : (
              <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest w-full py-4 rounded-sm transition-all hover:bg-white/10">
                <User size={16} className="text-gray-400" /> Sign In
              </Link>
            )}
          </div>

          <div className="h-px bg-white/10 w-full mb-2" />

          {/* Main Mobile Links */}
          {mainLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold uppercase tracking-widest text-gray-200 hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-px bg-white/10 w-full my-2" />

          {/* Mobile Accordion */}
          <div className="flex flex-col">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between text-lg font-bold uppercase tracking-widest text-gray-200 hover:text-blue-500 transition-colors w-full text-left"
            >
              More <ChevronDown size={20} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-blue-500' : ''}`} />
            </button>
            
            <div className={`grid grid-cols-1 gap-5 pl-4 overflow-hidden transition-all duration-300 ease-in-out ${dropdownOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
              {dropdownLinks.map((subLink) => (
                <Link 
                  key={subLink.href} 
                  href={subLink.href} 
                  onClick={() => { setIsOpen(false); setDropdownOpen(false); }}
                  className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-blue-400"
                >
                  <span className="text-gray-500">{subLink.icon}</span> {subLink.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}