import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Music2, Volume2, VolumeX, Play } from 'lucide-react';

// --- RELIABLE VIDEO SOURCES ---
const REELS_DATA = [
  { 
    id: 1, 
    user: 'travel_vibes', 
    video: 'https://packaged-media.redd.it/p0nd7c3br4oc1/pb/m2-res_1920p.mp4?m=DASHPlaylist.mpd&v=1&e=1764234000&s=c139125d84c5f39ca563b16b043b58573f32f5ad', 
    likes: '45K', comments: '1.2K', desc: "Walking through the forest 🌲" 
  },
  { 
    id: 2, 
    user: 'ocean_life', 
    video: 'https://videos.pexels.com/video-files/4434242/4434242-hd_720_1280_25fps.mp4', 
    likes: '12K', comments: '340', desc: "Ocean waves are my therapy 🌊" 
  },
  { 
    id: 3, 
    user: 'night_drive', 
    video: 'https://videos.pexels.com/video-files/3205739/3205739-hd_720_1280_25fps.mp4', 
    likes: '89K', comments: '800', desc: "City lights at midnight 🌃" 
  },
  { 
    id: 4, 
    user: 'mountain_view', 
    video: 'https://videos.pexels.com/video-files/4125028/4125028-hd_720_1280_25fps.mp4', 
    likes: '33K', comments: '512', desc: "Hiking adventures 🏔️" 
  },
];

const ReelsSection = () => {
  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {REELS_DATA.map((reel) => (
        <ReelItem key={reel.id} data={reel} />
      ))}
    </div>
  );
};

const ReelItem = ({ data }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [liked, setLiked] = useState(false);
  
  // --- NEW STATE TO TRACK MANUAL CLICKS ---
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  // --- INTERSECTION OBSERVER (Auto Play/Pause on Scroll) ---
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Video is in view. 
          // ONLY auto-play if the user hasn't manually paused it.
          if (videoRef.current && !isManuallyPaused) {
            videoRef.current.play()
              .then(() => setIsPlaying(true))
              .catch((e) => console.log("Autoplay blocked:", e));
          }
        } else {
          // Video left view: Always pause, but don't change manual state.
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; 
            setIsPlaying(false);
          }
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [isManuallyPaused]); // Re-run observer if manual pause state changes

  // --- MANUAL CLICK HANDLER ---
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // User is pausing manually
        videoRef.current.pause();
        setIsPlaying(false);
        setIsManuallyPaused(true); // Show icon
      } else {
        // User is resuming manually
        videoRef.current.play();
        setIsPlaying(true);
        setIsManuallyPaused(false); // Hide icon
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation(); 
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] snap-start bg-slate-900 md:border-x md:border-white/10 md:h-[85vh] md:my-4 md:rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Video Player container with click handler */}
      <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
        <video 
          ref={videoRef}
          src={data.video} 
          className="w-full h-full object-cover"
          loop 
          muted={isMuted} 
          playsInline 
        />
      </div>

      {/* --- FIX: Play Icon Overlay only shows on MANUAL PAUSE --- */}
      {isManuallyPaused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm animate-in fade-in duration-200">
            <Play size={40} fill="white" className="text-white ml-1" />
          </div>
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none"></div>

      {/* Mute Button */}
      <button onClick={toggleMute} className="absolute top-6 right-4 z-30 bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-black/60 transition-colors">
         {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
      </button>

      {/* Right Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-30">
        <ActionButton icon={<Heart className={liked ? "fill-red-500 text-red-500" : ""} />} label={data.likes} onClick={() => setLiked(!liked)} />
        <ActionButton icon={<MessageCircle />} label={data.comments} />
        <ActionButton icon={<Share2 />} label="Share" />
        <ActionButton icon={<MoreHorizontal />} />
        <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden animate-spin-slow bg-slate-800">
             <img src={`https://picsum.photos/seed/${data.id}/100`} className="w-full h-full object-cover" alt="music" />
        </div>
      </div>

      {/* Bottom Details */}
      <div className="absolute bottom-6 left-4 right-16 z-30 text-white pointer-events-none">
        <div className="flex items-center gap-3 mb-3 pointer-events-auto">
            <img src={`https://picsum.photos/seed/${data.user}/100`} className="w-10 h-10 rounded-full border border-white" alt="user" />
            <span className="font-bold text-base shadow-black drop-shadow-md">{data.user}</span>
            <button className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 hover:bg-white/30">Follow</button>
        </div>
        <p className="text-sm mb-4 leading-relaxed opacity-95 drop-shadow-md">{data.desc}</p>
        <div className="flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Music2 size={14} />
            <div className="w-32 overflow-hidden whitespace-nowrap">
                 <span>Original Audio - {data.user}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }) => (
    <div className="flex flex-col items-center gap-1 cursor-pointer group pointer-events-auto" onClick={onClick}>
        <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-all active:scale-90 border border-white/10 text-white shadow-lg">
            {React.cloneElement(icon, { size: 28, strokeWidth: 1.5 })}
        </div>
        {label && <span className="text-xs font-bold text-white drop-shadow-md">{label}</span>}
    </div>
);

export default ReelsSection;