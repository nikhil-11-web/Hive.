import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { X, Settings, Menu, User, Bookmark, LogOut, Moon, Sun, ChevronRight, Info, Repeat } from 'lucide-react'; // Added Repeat
import gsap from 'gsap';

const MobileMenu = ({ 
  onClose, 
  onNavigateProfile, 
  onOpenSettings, 
  onOpenMore, 
  onOpenAbout, 
  onToggleTheme, 
  currentTheme,
  currentUser 
}) => {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const isDark = currentTheme === 'dark';

  // Handlers
  const handleProfileClick = () => { onNavigateProfile(); onClose(); };
  const handleSettingsClick = () => { onOpenSettings(); onClose(); };
  const handleMoreClick = () => { onOpenMore(); onClose(); };
  const handleAboutClick = () => { onOpenAbout(); onClose(); };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(menuRef.current, { y: '100%' }, { y: '0%', duration: 0.4, ease: "power3.out" });
    }, menuRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-end justify-center md:hidden">
      <div ref={overlayRef} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div ref={menuRef} className={`relative w-full border-t rounded-t-[2rem] p-6 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] ${isDark ? 'bg-[#0f0518] border-white/10' : 'bg-white border-purple-100'}`}>
        
        <div className="w-12 h-1.5 bg-slate-500/30 rounded-full mx-auto mb-8"></div>

        {/* Profile Header */}
        <div onClick={handleProfileClick} className={`flex items-center gap-4 p-4 rounded-2xl border mb-8 active:scale-95 transition-transform cursor-pointer ${isDark ? 'bg-white/5 border-white/5' : 'bg-fuchsia-50 border-fuchsia-100'}`}>
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-fuchsia-500 to-purple-600">
                <img src={currentUser?.image} className="w-full h-full rounded-full object-cover border-2 border-black" alt="Profile" />
            </div>
            <div className="flex-1">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentUser?.name}</h3>
                <p className="text-sm text-fuchsia-500">{currentUser?.username}</p>
            </div>
            <ChevronRight size={20} className="text-slate-500" />
        </div>

        {/* List Items */}
        <div className={`flex flex-col gap-1 rounded-2xl overflow-hidden border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'}`}>
            
            <div onClick={handleSettingsClick}>
                <ListItem icon={<Settings size={20} />} label="Settings & Privacy" isDark={isDark} />
            </div>
            <div onClick={handleAboutClick}>
                <ListItem icon={<Info size={20} />} label="About Hive" isDark={isDark} />
            </div>
            <div onClick={onToggleTheme}>
                <ListItem 
                    icon={currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} 
                    label={`Display: ${currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}`} 
                    isDark={isDark}
                />
            </div>
            <div onClick={handleMoreClick}>
                <ListItem icon={<Menu size={20} />} label="More Options" isDark={isDark} />
            </div>
            
            {/* --- NEW SWITCH ACCOUNT SECTION --- */}
            <div className={`h-[1px] mx-4 my-2 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>
            
            <button className={`flex items-center gap-4 p-4 w-full text-left transition-colors active:bg-white/10 ${isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-black hover:bg-purple-50'}`}>
                <Repeat size={20} />
                <span className="text-sm font-medium">Switch Accounts</span>
            </button>

            <button className="flex items-center gap-4 p-4 w-full text-left hover:bg-red-500/10 text-red-500 active:bg-red-500/20 transition-colors">
                <LogOut size={20} />
                <span className="text-sm font-medium">Log Out</span>
            </button>
        </div>

        <button onClick={onClose} className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDark ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-black'}`}>
            <X size={20} />
        </button>

      </div>
    </div>
  );
};

const ListItem = ({ icon, label, isDark }) => (
    <button className={`flex items-center gap-4 p-4 w-full text-left transition-colors active:bg-white/10 group ${isDark ? 'hover:bg-white/5' : 'hover:bg-purple-50'}`}>
        <div className={`transition-colors ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-fuchsia-600'}`}>{icon}</div>
        <span className={`text-sm font-medium transition-colors ${isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-black'}`}>{label}</span>
        <ChevronRight size={16} className="ml-auto text-slate-500" />
    </button>
);

export default MobileMenu;