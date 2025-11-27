import React, { useEffect, useRef } from 'react';
import { X, Heart, Shield, Zap, Globe } from 'lucide-react';
import gsap from 'gsap';

const AboutHive = ({ onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animation on Open
    const tl = gsap.timeline();
    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(contentRef.current, 
        { scale: 0.8, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }, 
        "-=0.2"
      );
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        ref={modalRef} 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
      ></div>

      {/* Modal Card */}
      <div 
        ref={contentRef} 
        className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-violet-500/30 blur-[60px] rounded-full"></div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
          <X size={20} />
        </button>

        {/* Logo Section */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-900/50 mb-4 rotate-3">
             <span className="text-4xl font-serif font-bold text-white">H.</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Hive.</h2>
          <p className="text-slate-400 text-sm">Connect. Share. Inspire.</p>
          <span className="mt-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-300 font-mono">v1.0.0 (Beta)</span>
        </div>

        {/* Description */}
        <p className="text-center text-slate-300 mb-8 leading-relaxed">
            Hive is a next-generation social platform designed for creators. 
            Experience a space where your content shines, free from clutter, 
            built with modern web technologies.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <FeatureItem icon={<Zap size={18} className="text-amber-400" />} title="Fast & Fluid" desc="Built for speed" />
            <FeatureItem icon={<Heart size={18} className="text-rose-400" />} title="Creator First" desc="Monetize easily" />
            <FeatureItem icon={<Shield size={18} className="text-emerald-400" />} title="Secure" desc="Privacy focused" />
            <FeatureItem icon={<Globe size={18} className="text-sky-400" />} title="Global" desc="Connect worldwide" />
        </div>

        {/* Footer */}
        <div className="text-center border-t border-white/10 pt-6">
            <p className="text-xs text-slate-500 mb-2">Designed & Developed by</p>
            <p className="text-sm font-bold text-white">Nikhil Tomar</p>
            <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
    <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
        <div className="p-2 bg-slate-950 rounded-lg">{icon}</div>
        <div className="text-left">
            <h4 className="text-xs font-bold text-white">{title}</h4>
            <p className="text-[10px] text-slate-400">{desc}</p>
        </div>
    </div>
);

export default AboutHive;