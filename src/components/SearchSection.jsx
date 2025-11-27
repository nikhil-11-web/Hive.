import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { X, Search, TrendingUp, User } from 'lucide-react';
import gsap from 'gsap';

// Mock Data
const recentSearches = [
  { id: 1, text: "neon aesthetics", type: 'query' },
  { id: 2, text: "sarah_creative", type: 'user', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: 3, text: "minimalist design", type: 'query' },
];

const trending = [
  { id: 1, tag: "#Cyberpunk2077", posts: "52.4k posts" },
  { id: 2, tag: "#AbstractArt", posts: "18.2k posts" },
  { id: 3, tag: "#NightPhotography", posts: "120k posts" },
];

const SearchSection = ({ onClose }) => {
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");

  // --- SCROLL LOCK ---
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // --- ANIMATION (Slide from LEFT) ---
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Container Slide In
      gsap.fromTo(containerRef.current, 
        { x: '-100%' }, 
        { x: '0%', duration: 0.5, ease: "power3.out" }
      );
      // 2. Content Stagger
      gsap.fromTo('.search-anim-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 z-[70] h-screen w-full md:w-[400px] bg-slate-950/95 backdrop-blur-2xl border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col font-sans"
    >
      
      {/* Decorative Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[250px] h-[250px] bg-violet-600/20 blur-[100px] pointer-events-none rounded-full"></div>

      {/* --- HEADER & INPUT --- */}
      <div className="p-6 border-b border-white/5 pt-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-serif text-white tracking-wide">Search</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        <div className="relative group">
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users, tags..." 
                autoFocus
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-violet-500/50 focus:bg-slate-900 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all placeholder:text-slate-500"
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        
        {/* 1. Recent Searches */}
        <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Recent</span>
                <button className="text-violet-400 text-xs font-bold hover:text-white transition-colors">Clear All</button>
            </div>
            <div className="space-y-1">
                {recentSearches.map((item) => (
                    <div key={item.id} className="search-anim-item flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors">
                        <div className="flex items-center gap-3">
                            {item.type === 'user' ? (
                                <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                                    <Search size={18} />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-200 group-hover:text-white">{item.text}</span>
                                {item.type === 'user' && <span className="text-[10px] text-slate-500">User</span>}
                            </div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-300 p-2"><X size={16} /></button>
                    </div>
                ))}
            </div>
        </div>

        {/* 2. Divider */}
        <div className="h-[1px] bg-white/5 mx-6 my-2"></div>

        {/* 3. Trending Topics */}
        <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-4 px-2">
                <TrendingUp size={16} className="text-fuchsia-500" />
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Trending Now</span>
            </div>
            <div className="space-y-3">
                {trending.map((topic) => (
                    <div key={topic.id} className="search-anim-item p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-violet-500/30 hover:bg-slate-900/80 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-200 group-hover:text-violet-300 transition-colors">{topic.tag}</span>
                            <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded-md">{topic.posts}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default SearchSection;