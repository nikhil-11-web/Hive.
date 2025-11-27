import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { X, Bookmark, Activity, AlertTriangle, LogOut, FileText, ChevronRight, Repeat } from 'lucide-react';
import gsap from 'gsap';

const moreOptions = [
  { id: 'activity', label: 'Your Activity', icon: <Activity size={20} />, desc: 'Likes, comments, tags' },
  { id: 'saved', label: 'Saved', icon: <Bookmark size={20} />, desc: 'Collections & posts' },
  { id: 'report', label: 'Report a Problem', icon: <AlertTriangle size={20} />, desc: 'Bugs or spam' },
  { id: 'terms', label: 'Terms of Service', icon: <FileText size={20} />, desc: 'Read our policies' },
  // Removed "Switch Accounts" from here
];

const MoreSection = ({ onClose, theme }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
      );
      gsap.fromTo('.more-item', 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.3 }
      );
    }, modalRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-sans">
      <div ref={overlayRef} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"></div>

      <div ref={modalRef} className={`relative w-full max-w-md border rounded-[2rem] shadow-2xl overflow-hidden ${isDark ? 'bg-[#0f0518] border-white/10 shadow-purple-900/20' : 'bg-white border-white shadow-xl'}`}>
        
        <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
            <h2 className={`text-xl font-bold font-serif tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>More Options</h2>
            <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-slate-400' : 'bg-slate-200 hover:bg-red-500/10 hover:text-red-500 text-slate-600'}`}>
                <X size={20} />
            </button>
        </div>

        <div className="p-4 space-y-2">
            {moreOptions.map((item) => (
                <button 
                    key={item.id} 
                    className={`more-item flex items-center gap-4 w-full p-4 rounded-2xl border transition-all group text-left ${isDark ? 'hover:bg-white/5 border-transparent hover:border-white/5' : 'hover:bg-purple-50 border-transparent hover:border-purple-100'}`}
                >
                    <div className={`p-3 rounded-xl transition-colors ${isDark ? 'bg-slate-900 text-fuchsia-400 group-hover:bg-fuchsia-600 group-hover:text-white' : 'bg-white text-fuchsia-600 shadow-sm group-hover:bg-fuchsia-600 group-hover:text-white'}`}>
                        {item.icon}
                    </div>
                    <div className="flex-1">
                        <h4 className={`text-sm font-bold group-hover:text-fuchsia-500 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.label}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <ChevronRight size={16} className={`transition-all group-hover:translate-x-1 ${isDark ? 'text-slate-600 group-hover:text-white' : 'text-slate-400 group-hover:text-fuchsia-600'}`} />
                </button>
            ))}
        </div>

        {/* --- FOOTER: SWITCH & LOGOUT --- */}
        <div className={`p-4 border-t ${isDark ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
            <div className="grid grid-cols-2 gap-3">
                <button className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl transition-colors text-sm font-bold ${isDark ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-white hover:text-black'}`}>
                    <Repeat size={18} /> Switch
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-bold">
                    <LogOut size={18} /> Log Out
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};
export default MoreSection;