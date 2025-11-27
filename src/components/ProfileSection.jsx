import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { Settings, Grid, Bookmark, UserSquare2, MapPin, Link as LinkIcon, Heart, MessageCircle, X, MoreHorizontal } from 'lucide-react';
import gsap from 'gsap';

const ProfileSection = ({ user, savedPosts, allPosts, theme }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPost, setSelectedPost] = useState(null);

  // Filter Logic
  // 1. My Posts (Simulated by taking first 6 from allPosts for demo, or match ID)
  const myPosts = allPosts.slice(0, 9); 
  // 2. Saved Posts (Passed from App.js)
  const displayedPosts = activeTab === 'saved' ? savedPosts : myPosts;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.profile-anim', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const openPost = (post) => { setSelectedPost(post); document.body.style.overflow = 'hidden'; };
  const closePost = () => { setSelectedPost(null); document.body.style.overflow = 'unset'; };
  const isDark = theme === 'dark';

  return (
    <div ref={containerRef} className={`w-full max-w-5xl mx-auto pb-20 font-sans ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
      
      {/* Cover Image */}
      <div className="profile-anim relative w-full h-48 md:h-72 rounded-b-[3rem] overflow-hidden shadow-2xl shadow-purple-900/20">
        <img src={user.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#050505]' : 'from-fuchsia-50'} to-transparent opacity-80`}></div>
      </div>

      {/* Info Section */}
      <div className="px-6 md:px-12 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="profile-anim relative group">
                <div className="w-36 h-36 rounded-full p-[4px] bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-pink-500 shadow-xl shadow-fuchsia-500/30">
                    <div className={`w-full h-full rounded-full p-[4px] ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
                        <img src={user.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
            </div>
            <div className="profile-anim flex items-center gap-3 w-full md:w-auto">
                <button className={`flex-1 md:flex-none py-2.5 px-8 font-bold rounded-xl text-sm transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'}`}>
                    Edit Profile
                </button>
                <button className={`p-2.5 rounded-xl border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'}`}>
                    <Settings size={20} />
                </button>
            </div>
        </div>

        <div className="profile-anim mt-6 space-y-2">
            <h1 className={`text-3xl font-bold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                {user.name}
                <span className="w-5 h-5 bg-fuchsia-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg shadow-fuchsia-500/50">✓</span>
            </h1>
            <p className="text-fuchsia-500 font-medium">{user.username}</p>
        </div>

        <div className="profile-anim mt-4 max-w-lg text-sm leading-relaxed whitespace-pre-line opacity-80">{user.bio}</div>

        <div className="profile-anim flex items-center gap-6 mt-4 text-xs font-medium opacity-60">
            <div className="flex items-center gap-1"><MapPin size={14} /> <span>{user.location}</span></div>
            <div className="flex items-center gap-1 hover:text-fuchsia-500 cursor-pointer transition-colors"><LinkIcon size={14} /> <span>{user.website}</span></div>
        </div>

        <div className={`profile-anim flex items-center justify-around md:justify-start md:gap-20 mt-8 p-6 rounded-2xl border backdrop-blur-md ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'}`}>
            <StatItem count={user.stats.posts} label="Posts" theme={isDark} />
            <StatItem count={user.stats.followers} label="Followers" theme={isDark} />
            <StatItem count={user.stats.following} label="Following" theme={isDark} />
        </div>
      </div>

      {/* Tabs */}
      <div className={`profile-anim mt-12 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex justify-center gap-16">
            <TabItem icon={<Grid size={20} />} active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} theme={isDark} />
            <TabItem icon={<Bookmark size={20} />} active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} theme={isDark} />
            <TabItem icon={<UserSquare2 size={20} />} active={activeTab === 'tagged'} onClick={() => setActiveTab('tagged')} theme={isDark} />
        </div>
      </div>

      {/* Grid Content */}
      <div className="profile-anim grid grid-cols-3 gap-1 md:gap-6 mt-6 px-1 md:px-12 mb-20">
        {displayedPosts.length > 0 ? (
            displayedPosts.map((post) => (
                <div key={post.id} onClick={() => openPost(post)} className="group relative aspect-square rounded-lg md:rounded-2xl bg-slate-800 cursor-pointer overflow-hidden shadow-lg">
                    <img src={post.postImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                        <div className="flex items-center gap-1 text-white font-bold"><Heart size={20} fill="white" /> {post.likes}</div>
                        <div className="flex items-center gap-1 text-white font-bold"><MessageCircle size={20} fill="white" /> {post.comments}</div>
                    </div>
                </div>
            ))
        ) : (
            <div className="col-span-3 py-20 text-center opacity-50 flex flex-col items-center">
                <Bookmark size={48} className="mb-4" />
                <p>No posts found in {activeTab}</p>
            </div>
        )}
      </div>

      {/* Modal View */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={closePost} user={user} theme={theme} />
      )}
    </div>
  );
};

// Sub-components for Profile
const StatItem = ({ count, label, theme }) => (
    <div className="flex flex-col items-center md:items-start">
        <span className={`text-xl font-bold ${theme ? 'text-white' : 'text-black'}`}>{count}</span>
        <span className="text-xs opacity-60 uppercase tracking-wider font-semibold">{label}</span>
    </div>
);

const TabItem = ({ icon, active, onClick, theme }) => (
    <button onClick={onClick} className={`py-4 px-6 border-t-2 transition-all duration-300 ${active ? (theme ? 'border-fuchsia-500 text-fuchsia-500' : 'border-black text-black') : 'border-transparent opacity-50 hover:opacity-100'}`}>
        {icon}
    </button>
);

const PostModal = ({ post, onClose, user, theme }) => {
    const isDark = theme === 'dark';
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-8">
            <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"></div>
            <div className={`relative w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-6xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl ${isDark ? 'bg-[#0f0518]' : 'bg-white'}`}>
                
                <button onClick={onClose} className="absolute top-4 left-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white md:hidden"><X size={24} /></button>
                
                <div className="w-full h-[45vh] md:h-auto md:w-[60%] bg-black flex items-center justify-center">
                    <img src={post.postImage} alt="Post" className="w-full h-full object-contain" />
                </div>
                
                <div className={`flex-1 flex flex-col w-full md:w-[40%] h-full min-h-0 border-l ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                    <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                        <div className="flex items-center gap-3">
                            <img src={post.userImage} className="w-9 h-9 rounded-full object-cover border border-white/10" alt="" />
                            <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-black'}`}>{post.username}</span>
                        </div>
                        <MoreHorizontal size={20} className="opacity-50" />
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex gap-3">
                            <img src={post.userImage} className="w-8 h-8 rounded-full object-cover shrink-0" alt="" />
                            <div className="text-sm">
                                <span className={`font-bold mr-2 ${isDark ? 'text-white' : 'text-black'}`}>{post.username}</span>
                                <span className="opacity-80">{post.caption}</span>
                                <div className="mt-1 text-xs opacity-50">{post.timeAgo}</div>
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 border-t ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                        <div className="flex items-center gap-3">
                            <img src={user.image} className="w-8 h-8 rounded-full object-cover shrink-0" alt="" />
                            <input type="text" placeholder="Add a comment..." className={`flex-1 bg-transparent text-sm focus:outline-none ${isDark ? 'text-white placeholder:text-slate-500' : 'text-black placeholder:text-slate-400'}`}/>
                            <button className="text-fuchsia-500 font-bold text-sm">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProfileSection;