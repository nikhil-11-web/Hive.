import React from 'react';
import { Heart, MessageCircle, PlusSquare, Search } from 'lucide-react';

export default function Header({ 
  onOpenChat, onOpenActivity, onOpenSearch, onOpenCreate, onOpenMenu, 
  theme, currentUser 
}) {
  const isDark = theme !== 'light';
  
  return (
    <header className={`fixed top-0 w-full h-[64px] md:hidden flex items-center justify-between px-5 z-50 border-b backdrop-blur-xl transition-colors duration-300
      ${isDark ? 'bg-[#050505]/90 border-white/5 text-white' : 'bg-white/90 border-purple-100 text-slate-900'}`}
    >
      {/* --- LOGO SECTION --- */}
      <div className="flex items-center gap-3">
        
        {/* 1. Premium Logo Image with Gradient Ring */}
        <div className="relative w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-green-500 via-purple-500 to-orange-700 shadow-lg shadow-fuchsia-400/20">
           <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
             <img 
                src="/image/logo6.png" // REMOVED 'public' from path (React serves public as root)
                alt="Logo" 
                className="w-full h-full object-cover" 
             />
           </div>
        </div>

        {/* 2. Logo Text */}
        <span className="font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600">
            Hive.
        </span>
      </div>

      {/* --- ACTIONS SECTION --- */}
      <div className="flex items-center gap-5">
        <button onClick={onOpenCreate} className="active:scale-90 transition-transform"><PlusSquare size={24} /></button>
        <button onClick={onOpenSearch} className="active:scale-90 transition-transform"><Search size={24} /></button>
        <button onClick={onOpenActivity} className="active:scale-90 transition-transform"><Heart size={24} /></button>
        <button onClick={onOpenChat} className="active:scale-90 transition-transform">
           <div className="relative">
              <MessageCircle size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-fuchsia-500 rounded-full border-2 border-black"></span>
           </div>
        </button>
        
        {/* Profile / Menu Toggle */}
        <button onClick={onOpenMenu} className="w-8 h-8 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-fuchsia-500 to-purple-600 active:scale-95 transition-transform">
           <div className="w-full h-full rounded-full bg-black">
             <img src={currentUser?.image} alt="me" className="w-full h-full object-cover rounded-full" />
           </div>
        </button>
      </div>
    </header>
  );
}