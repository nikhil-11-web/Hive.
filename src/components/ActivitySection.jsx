import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { X, Heart, MessageCircle, UserPlus, Video, Zap } from 'lucide-react';
import gsap from 'gsap';

const activities = [
  { id: 1, type: 'like', user: 'sarah_creative', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'liked your photo.', time: '2m ago', preview: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=100', viewed: false },
  { id: 2, type: 'follow', user: 'design_guru', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'started following you.', time: '15m ago', viewed: false },
  { id: 3, type: 'comment', user: 'urban_drifter', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'commented: "This is pure fire! 🔥"', time: '1h ago', preview: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100', viewed: true },
  { id: 4, type: 'like_video', user: 'tech_daily', avatar: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'liked your reel.', time: '3h ago', preview: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=100', viewed: true },
  { id: 5, type: 'like', user: 'emma_styles', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', text: 'liked your story.', time: '5h ago', preview: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100', isStory: true, viewed: true },
];

const ActivitySection = ({ onClose }) => {
  const containerRef = useRef(null);

  // --- SCROLL LOCK FIX ---
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // GSAP Entrance Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { x: '100%', opacity: 0 }, 
        { x: '0%', opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo('.activity-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    // Fixed Right Sidebar Layout
    <div 
      ref={containerRef} 
      className="fixed top-0 right-0 z-[60] h-screen w-full md:w-[420px] bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
    >
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-600/20 blur-[120px] pointer-events-none rounded-full"></div>

      {/* --- Header --- */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10 pt-8">
        <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold font-serif text-white tracking-wide">Activity</h2>
            <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-rose-500/30">
                2 New
            </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={24} />
        </button>
      </div>

      {/* --- List Content --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
        
        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 mt-2 px-2">This Week</div>

        {activities.map((item) => (
          <div key={item.id} className={`activity-item group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${item.viewed ? 'hover:bg-white/5' : 'bg-violet-900/10 border border-violet-500/20 hover:bg-violet-900/20'}`}>
            
            {/* Avatar with Icon Badge */}
            <div className="relative flex-shrink-0">
                <img src={item.avatar} alt={item.user} className="w-11 h-11 rounded-full object-cover border border-white/10" />
                
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 ${
                    item.type === 'like' || item.type === 'like_video' ? 'bg-rose-500' : 
                    item.type === 'follow' ? 'bg-violet-500' : 'bg-blue-500'
                }`}>
                    {item.type === 'like' && <Heart size={10} fill="white" className="text-white" />}
                    {item.type === 'like_video' && <Heart size={10} fill="white" className="text-white" />}
                    {item.type === 'follow' && <UserPlus size={10} className="text-white" />}
                    {item.type === 'comment' && <MessageCircle size={10} className="text-white" />}
                </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 pt-0.5">
                <p className="text-sm text-slate-300 leading-snug">
                    <span className="font-bold text-white hover:underline decoration-violet-500">{item.user}</span> {item.text}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.time}</p>
            </div>

            {/* Right Side Action */}
            {item.type === 'follow' ? (
                <button className="px-4 py-1.5 bg-white text-slate-950 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors">
                    Follow
                </button>
            ) : (
                <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-white/10 group-hover:border-violet-500/50 transition-colors">
                    <img src={item.preview} alt="Post" className="w-full h-full object-cover" />
                    {item.type === 'like_video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Video size={12} className="text-white" />
                        </div>
                    )}
                     {item.isStory && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-violet-600/40 to-orange-500/40 border-2 border-transparent">
                            <Zap size={12} className="text-white" />
                        </div>
                    )}
                </div>
            )}

          </div>
        ))}
        
        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 mt-8 px-2">Earlier</div>
        <div className="p-4 rounded-2xl border border-dashed border-slate-800 text-center text-slate-600 text-xs">
            No more recent activity
        </div>

      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default ActivitySection;