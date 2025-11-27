import React, { useState, useRef, useLayoutEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from 'lucide-react';
import gsap from 'gsap';

export default function Post({ 
  id, username, userImage, postImage, likes, caption, timeAgo, theme,
  isSavedExternal, onToggleSave 
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false); 
  
  const containerRef = useRef(null);
  const heartRef = useRef(null);
  const bigHeartRef = useRef(null);
  const bookmarkRef = useRef(null);
  const shareRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => !isLiked ? prev + 1 : prev - 1);
    if (!isLiked) {
      gsap.fromTo(heartRef.current, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
    }
  };

  const handleDoubleClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
    const tl = gsap.timeline();
    tl.to(bigHeartRef.current, { opacity: 1, scale: 1.2, duration: 0.2 })
      .to(bigHeartRef.current, { opacity: 0, scale: 0.8, delay: 0.2, duration: 0.2 });
  };

  const handleSave = () => {
    onToggleSave(); // Update App State
    if (!isSavedExternal) {
        gsap.fromTo(bookmarkRef.current, { scale: 0.8, rotate: -15 }, { scale: 1, rotate: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    }
  };

  const isDark = theme === 'dark';

  return (
    <div ref={containerRef} className={`relative w-full rounded-[2rem] overflow-hidden mb-6 border transition-all duration-300 ${isDark ? 'bg-[#0f0518] border-white/5 shadow-2xl shadow-purple-900/10' : 'bg-white border-purple-100 shadow-xl shadow-purple-200/50'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-pink-500">
             <div className={`p-[2px] rounded-full ${isDark ? 'bg-black' : 'bg-white'}`}>
                <img src={userImage} alt={username} className="w-9 h-9 rounded-full object-cover" />
             </div>
          </div>
          <div>
            <span className={`font-bold text-sm block ${isDark ? 'text-white' : 'text-slate-900'}`}>{username}</span>
            <span className="text-[11px] text-slate-500 font-medium">{timeAgo}</span>
          </div>
        </div>
        <button className="text-slate-500 hover:text-fuchsia-500 transition-colors"><MoreHorizontal size={20} /></button>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/5] bg-slate-900 cursor-pointer overflow-hidden" onDoubleClick={handleDoubleClick}>
         <img src={postImage} alt="Post" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <Heart ref={bigHeartRef} size={100} fill="white" className="text-white opacity-0 transform scale-0 drop-shadow-lg" />
         </div>
      </div>

      {/* Actions */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-6">
              <button onClick={handleLike} className="group focus:outline-none">
                 <Heart ref={heartRef} size={28} className={`transition-colors duration-300 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-400 hover:text-pink-500'}`} />
              </button>
              <button className="group focus:outline-none">
                 <MessageCircle size={28} className="text-slate-400 hover:text-fuchsia-500 transition-colors" />
              </button>
              <button className="group focus:outline-none">
                 <Send ref={shareRef} size={28} className="text-slate-400 hover:text-purple-500 transition-colors -rotate-45 mb-1" />
              </button>
           </div>
           <button onClick={handleSave}>
              <Bookmark ref={bookmarkRef} size={28} className={`transition-colors duration-300 ${isSavedExternal ? 'fill-fuchsia-500 text-fuchsia-500' : 'text-slate-400 hover:text-fuchsia-500'}`} />
           </button>
        </div>

        <div className={`font-bold text-sm mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{likesCount.toLocaleString()} likes</div>
        
        <div className="text-sm mb-3 leading-relaxed">
            <span className={`font-bold mr-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{username}</span>
            <span className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{caption}</span>
        </div>

        {/* Comment Input */}
        <div className={`flex items-center gap-3 p-2 px-4 rounded-full border transition-all ${isFocused ? 'border-fuchsia-500 ring-1 ring-fuchsia-500/20' : 'border-transparent bg-white/5'}`}>
             <Smile size={18} className="text-slate-500 cursor-pointer hover:text-pink-400" />
             <input 
                type="text" 
                placeholder="Add a comment..." 
                className={`flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
             />
             {comment && <button onClick={() => setComment('')} className="text-xs font-bold text-fuchsia-500 uppercase">Post</button>}
        </div>
      </div>
    </div>
  );
}