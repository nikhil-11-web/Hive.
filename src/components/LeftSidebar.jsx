import React, { useRef } from 'react';
import { Home, Compass, PlusSquare, Search, Heart, MessageCircle, Film, Settings, MoreHorizontal, Info } from 'lucide-react';

export default function LeftSidebar({ 
  onOpenChat, onOpenActivity, onOpenSearch, onOpenCreate, onOpenSettings, onOpenMore, onOpenAbout,
  onNavigateHome, onNavigateExplore, onNavigateProfile, onNavigateReels,
  activeTab, theme, currentUser 
}) {
  
  const isDark = theme !== 'light';
  const fileInputRef = useRef(null); 
  
  const handleCreateClick = () => {
    onOpenCreate();
  };

  const navItems = [
    { icon: Home, label: 'Home', action: onNavigateHome, isActive: activeTab === 'home' },
    { icon: Search, label: 'Search', action: onOpenSearch },
    { icon: Compass, label: 'Explore', action: onNavigateExplore, isActive: activeTab === 'explore' },
    { icon: Film, label: 'Reels', action: onNavigateReels, isActive: activeTab === 'reels' },
    { icon: MessageCircle, label: 'Messages', action: onOpenChat },
    { icon: Heart, label: 'Notifications', action: onOpenActivity },
    { icon: PlusSquare, label: 'Create', action: handleCreateClick }, 
  ];

  const moreItems = [
     { icon: Settings, label: 'Settings', action: onOpenSettings },
     { icon: Info, label: 'About', action: onOpenAbout },
     { icon: MoreHorizontal, label: 'More', action: onOpenMore },
  ];

  return (
    <div className={`hidden md:flex flex-col fixed left-0 top-0 h-screen border-r transition-all duration-300 z-50
      ${isDark ? 'bg-[#050505] border-white/5 text-slate-300' : 'bg-white border-purple-100 text-slate-700'}
      w-[80px] lg:w-[280px] px-3 py-8`}
    >
      <input type="file" ref={fileInputRef} accept="image/*,video/*" className="hidden" />

      {/* --- PREMIUM LOGO SECTION (Desktop) --- */}
      <div 
        className="mb-10 px-1 lg:px-4 cursor-pointer flex items-center justify-center lg:justify-start gap-3" 
        onClick={onNavigateHome}
      >
         {/* 1. Logo Image (Visible on Tablet & Desktop) */}
         <div className="relative w-10 h-10 shrink-0 rounded-full p-[2px] bg-gradient-to-tr from-green-500 via-purple-500 to-orange-400 shadow-lg shadow-fuchsia-700/20">
            <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
              <img 
                 src="/image/logo6.png" 
                 alt="Logo" 
                 className="w-full h-full object-cover" 
              />
            </div>
         </div>

         {/* 2. Text (Hidden on Tablet, Visible on Large Desktop) */}
         <h1 className="font-bold text-3xl hidden lg:block tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600">
            Hive.
         </h1>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item, index) => (
          <button 
            key={index} 
            onClick={item.action}
            className={`flex items-center justify-center lg:justify-start gap-4 p-3.5 rounded-2xl transition-all duration-300 group
              ${item.isActive 
                ? (isDark ? 'bg-white/10 text-white font-bold' : 'bg-fuchsia-50 text-fuchsia-600 font-bold') 
                : (isDark ? 'hover:bg-white/5 hover:text-white' : 'hover:bg-fuchsia-50/50 hover:text-black')}
            `}
          >
            <item.icon size={26} strokeWidth={item.isActive ? 2.5 : 2} className={`transition-transform group-active:scale-90 ${item.isActive ? 'text-fuchsia-500' : ''}`} />
            <span className="hidden lg:block text-[15px]">{item.label}</span>
          </button>
        ))}

        {/* PROFILE LINK */}
        <button 
          onClick={onNavigateProfile}
          className={`flex items-center justify-center lg:justify-start gap-4 p-3.5 rounded-2xl transition-all duration-300 group mt-4
            ${activeTab === 'profile' ? 'bg-white/10' : 'hover:bg-white/5'}
          `}
        >
          <div className={`w-8 h-8 rounded-full p-[2px] ${activeTab === 'profile' ? 'bg-fuchsia-500' : 'bg-slate-700'}`}>
             <img src={currentUser?.image} alt="profile" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className={`hidden lg:block text-[15px] ${activeTab === 'profile' ? 'text-white font-bold' : ''}`}>{currentUser?.username}</span>
        </button>
      </nav>

      {/* More Options */}
      <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-white/5">
         {moreItems.map((item, idx) => (
             <button key={idx} onClick={item.action} className={`flex items-center justify-center lg:justify-start gap-4 p-3.5 rounded-xl transition-all ${isDark ? 'hover:text-white hover:bg-white/5' : 'hover:text-black hover:bg-purple-50'}`}>
                <item.icon size={26} strokeWidth={2} />
                <span className="hidden lg:block text-[15px]">{item.label}</span>
             </button>
         ))}
      </div>
    </div>
  );
}