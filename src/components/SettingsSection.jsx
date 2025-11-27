import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { X, Bell, Lock, Moon, HelpCircle, ChevronRight, LogOut, Sun, Repeat } from 'lucide-react';
import gsap from 'gsap';

const tabs = [
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'privacy', label: 'Privacy & Security', icon: <Lock size={20} /> },
  { id: 'display', label: 'Display', icon: <Moon size={20} /> },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
];

const SettingsSection = ({ onClose, theme, onToggleTheme }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  
  // FIXED: Defined isDark so the theme logic below works
  const isDark = theme === 'dark';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.95, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.1)", delay: 0.1 }
      );
    }, modalRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-sans">
      
      {/* Backdrop */}
      <div ref={overlayRef} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"></div>

      {/* Main Modal Card */}
      <div ref={modalRef} className={`relative w-full max-w-4xl h-[70vh] border rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden ${isDark ? 'bg-[#0f0518] border-white/10 shadow-black/50' : 'bg-white border-white shadow-xl'}`}>
        
        {/* --- LEFT SIDEBAR (Tabs) --- */}
        <div className={`w-full md:w-[260px] border-b md:border-b-0 md:border-r flex flex-col ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
            
            <div className={`p-6 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <h2 className={`text-xl font-bold font-serif tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>Settings</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1 md:space-y-2 flex md:flex-col gap-2 md:gap-0 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                            activeTab === tab.id 
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' 
                            : (isDark ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-white hover:text-black')
                        }`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                        {activeTab === tab.id && <ChevronRight size={16} className="ml-auto hidden md:block" />}
                    </button>
                ))}
            </div>

            {/* FIXED: Footer Layout and Theme */}
            <div className={`p-4 border-t hidden md:flex flex-col gap-2 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors text-sm font-bold ${isDark ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-white hover:text-black'}`}>
                    <Repeat size={20} /> Switch Accounts
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-bold">
                    <LogOut size={20} /> Log Out
                </button>
            </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className={`flex-1 relative overflow-y-auto p-6 md:p-10 scrollbar-hide ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
            
            <button onClick={onClose} className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-slate-400' : 'bg-slate-100 hover:bg-red-500/10 hover:text-red-500 text-slate-600'}`}>
                <X size={20} />
            </button>

            <div className="max-w-lg mx-auto pt-2 animate-in fade-in zoom-in duration-300">
                
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Notification Preferences</h3>
                        <ToggleItem title="Pause All" desc="Temporarily pause notifications" isDark={isDark} />
                        <div className={`h-[1px] my-4 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}></div>
                        <ToggleItem title="Likes" desc="When someone likes your post" checked isDark={isDark} />
                        <ToggleItem title="Comments" desc="When someone comments on your post" checked isDark={isDark} />
                        <ToggleItem title="New Followers" desc="When someone starts following you" checked isDark={isDark} />
                        <ToggleItem title="Messages" desc="When someone sends you a message" isDark={isDark} />
                    </div>
                )}

                {activeTab === 'privacy' && (
                    <div className="space-y-6">
                        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Privacy & Security</h3>
                        <ToggleItem title="Private Account" desc="Only people you approve can see your photos and videos." isDark={isDark} />
                        <ToggleItem title="Activity Status" desc="Allow accounts you follow to see when you were last active." checked isDark={isDark} />
                        <div className={`h-[1px] my-4 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}></div>
                        <div className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-colors ${isDark ? 'bg-slate-900 border-white/5 hover:border-violet-500/30' : 'bg-slate-50 border-slate-100 hover:border-violet-500/30'}`}>
                            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Blocked Accounts</span>
                            <ChevronRight size={18} className="text-slate-500" />
                        </div>
                        <div className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-colors ${isDark ? 'bg-slate-900 border-white/5 hover:border-violet-500/30' : 'bg-slate-50 border-slate-100 hover:border-violet-500/30'}`}>
                            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Two-Factor Authentication</span>
                            <div className="text-green-500 text-xs font-bold px-2 py-1 bg-green-500/10 rounded-md">Enabled</div>
                        </div>
                    </div>
                )}

                {activeTab === 'display' && (
                    <div className="space-y-6">
                        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Display Settings</h3>
                        
                        <div className={`p-6 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${isDark ? 'bg-violet-600 text-white' : 'bg-amber-100 text-amber-600'}`}>
                                    {isDark ? <Moon size={24} /> : <Sun size={24} />}
                                </div>
                                <div>
                                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dark Mode</h4>
                                    <p className="text-xs text-slate-500 mt-1">Adjust the appearance of Hive.</p>
                                </div>
                            </div>
                            <div 
                                onClick={onToggleTheme}
                                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isDark ? 'bg-violet-600' : 'bg-slate-300'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'help' && (
                    <div className="space-y-4">
                        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Help & Support</h3>
                        {['Report a Problem', 'Help Center', 'Privacy and Security Help', 'Support Requests'].map((item) => (
                            <div key={item} className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-colors ${isDark ? 'bg-slate-900 border-white/5 hover:bg-white/5' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                                <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                                <ChevronRight size={16} className="text-slate-500" />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component
const ToggleItem = ({ title, desc, checked = false, isDark }) => {
    const [isOn, setIsOn] = useState(checked);
    return (
        <div className="flex items-center justify-between">
            <div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
            <div 
                onClick={() => setIsOn(!isOn)}
                className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-violet-600' : (isDark ? 'bg-slate-700' : 'bg-slate-300')}`}
            >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isOn ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
        </div>
    );
};

export default SettingsSection;