import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import React from 'react';
import { Verified, TrendingUp, Sparkles } from 'lucide-react'; // Added Icons for premium feel
import { currentUser } from '../data/currentUser';

// Suggestion Data
const suggestions = [
  { id: 1, username: 'photography_pro', name: 'Alex Johnson', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100', isNew: true },
  { id: 2, username: 'creative_mind', name: 'Sarah Williams', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', isNew: false },
  { id: 3, username: 'design_guru', name: 'Mike Chen', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100', isNew: false },
  { id: 4, username: 'style_icon', name: 'Emma Davis', image: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=100', isNew: true },
];

export default function Sidebar({ onNavigateProfile }) {
  const sidebarRef = useRef(null);
  const [following, setFollowing] = useState([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.suggestion-item',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power2.out" }
      );
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  const toggleFollow = (id) => setFollowing(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    // 1. RESPONSIVE: Hidden on mobile/tablet, visible on lg (small desktop) and xl (large)
    <div ref={sidebarRef} className="hidden lg:block w-[300px] xl:w-[380px] sticky top-24 h-[calc(100vh-5rem)] pl-6 font-sans overflow-y-auto scrollbar-hide transition-all duration-300">

      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 w-full h-96 bg-violet-600/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      {/* --- CURRENT USER CARD (PREMIUM) --- */}
      <div
        onClick={onNavigateProfile}
        className="relative overflow-hidden flex items-center justify-between mb-10 p-4 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-violet-500/50 transition-all duration-500 cursor-pointer group shadow-2xl shadow-black/20"
      >
        {/* Hover Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

        <div className="relative flex items-center gap-4 z-10 w-full">
          {/* Avatar with Gradient Ring */}
          <div className="relative w-14 h-14 shrink-0 rounded-full p-[2px] bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-amber-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-slate-950 p-[2px]">
              <img src={currentUser.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>

          {/* User Text */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
                <span className="font-bold text-[15px] text-white tracking-tight truncate group-hover:text-violet-300 transition-colors">
                    {currentUser.username}
                </span>
                <Verified size={14} className="text-blue-500 fill-blue-500/10" />
            </div>
            <div className="text-slate-400 text-xs font-medium truncate">{currentUser.name}</div>
          </div>

          {/* Action */}
          <span className="text-xs font-bold text-violet-400 group-hover:text-white transition-colors">View</span>
        </div>
      </div>

      {/* --- SUGGESTIONS HEADER --- */}
      <div className="mb-5 px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">Suggested for you</span>
        </div>
        <button className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors">See All</button>
      </div>

      {/* --- SUGGESTIONS LIST --- */}
      <div className="flex flex-col gap-4">
        {suggestions.map((user) => (
          <div key={user.id} className="suggestion-item flex items-center justify-between group p-2 rounded-2xl hover:bg-white/5 transition-colors duration-300">
            
            <div className="flex items-center gap-3 cursor-pointer overflow-hidden">
              <div className="relative w-11 h-11 shrink-0">
                <img src={user.image} alt={user.username} className="w-full h-full rounded-full object-cover border border-white/10 group-hover:border-violet-500/50 transition-colors shadow-lg" />
                {user.isNew && (
                    <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full border border-slate-950">NEW</span>
                )}
              </div>
              <div className='flex flex-col min-w-0'>
                <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors truncate">{user.username}</span>
                <div className="flex items-center gap-1 text-slate-500 text-[10px] font-medium truncate">
                    {user.isNew ? 'New to Hive' : 'Followed by friends'}
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleFollow(user.id)}
              className={`shrink-0 text-[11px] font-bold tracking-wide transition-all duration-300 px-4 py-1.5 rounded-full border ${following.includes(user.id)
                  ? 'border-slate-700 bg-transparent text-slate-500 hover:text-red-400 hover:border-red-500/30'
                  : 'border-transparent bg-white text-slate-900 hover:bg-violet-500 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                }`}
            >
              {following.includes(user.id) ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* --- TRENDING TOPICS (Optional Premium Addition) --- */}
      <div className="mt-8 mb-4 px-2 flex items-center gap-2">
        <TrendingUp size={14} className="text-pink-500" />
        <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">Trending Now</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
         {['#DigitalArt', '#Cyberpunk', '#Photography', '#ReactJS'].map(tag => (
             <span key={tag} className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/10 cursor-pointer transition-all duration-300">
                {tag}
             </span>
         ))}
      </div>

      {/* Footer */}
      <div className="mt-10 px-2 border-t border-white/5 pt-6">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500 font-medium leading-relaxed">
          {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language'].map(link => (
            <a key={link} href="#" className="hover:text-violet-400 transition-colors">{link}</a>
          ))}
        </div>
        <div className="mt-4 text-[10px] text-slate-600 font-mono">© 2025 HIVE CORPORATION</div>
      </div>
    </div>
  );
}