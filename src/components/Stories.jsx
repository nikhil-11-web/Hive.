import React, { useRef } from 'react';
import { Plus, Camera, Image as ImageIcon } from 'lucide-react';

export default function Stories({ theme, currentUser }) {
  const isDark = theme !== 'light';
  const fileInputRef = useRef(null); // Reference for the hidden file input
  
  // Use data from App.js
  const myImage = currentUser?.image || "https://i.pravatar.cc/150?img=68";

  const storyUsers = [
    { name: "Your Story", img: myImage, isUser: true }, 
    { name: "jessica", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" },
    { name: "travel_mike", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80" },
    { name: "art_daily", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" },
    { name: "tech_guru", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" },
    { name: "foodie", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80" },
  ];

  // Handler for "Your Story" click
  const handleStoryClick = (isUser) => {
    if (isUser) {
      // Trigger the file selection dialog
      fileInputRef.current.click();
    } else {
      // Logic for viewing other people's stories (not implemented yet)
      console.log("View story");
    }
  };

  // Handler for file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Here you would typically upload the file or show a preview modal
      console.log("Selected file:", file);
      alert(`Opening editor for: ${file.name}`);
    }
  };

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide w-full max-w-[470px] mx-auto ${isDark ? 'scrollbar-track-transparent' : ''}`}>
      
      {/* Hidden File Input (Accepts Images & Videos) */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*,video/*" 
        className="hidden" 
        onChange={handleFileChange} 
      />

      {storyUsers.map((user, i) => (
        <div 
          key={i} 
          onClick={() => handleStoryClick(user.isUser)}
          className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group"
        >
          <div className={`w-16 h-16 rounded-full p-[2px] relative 
             ${user.isUser 
                ? '' 
                : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 group-hover:rotate-6 transition-transform duration-300'
             }`}>
             <div className={`w-full h-full rounded-full border-2 ${isDark ? 'border-black bg-black' : 'border-white bg-white'} overflow-hidden relative`}>
               <img src={user.img} alt={user.name} className={`w-full h-full object-cover ${user.isUser ? 'opacity-80' : ''}`} />
               
               {/* Optional: Show camera icon overlay on hover for user */}
               {user.isUser && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white drop-shadow-md" />
                 </div>
               )}
             </div>

             {/* Plus Icon Badge for User */}
             {user.isUser && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-black text-white shadow-md group-hover:bg-blue-600 transition-colors">
                    <Plus size={14} strokeWidth={4} />
                </div>
             )}
          </div>
          <span className={`text-xs truncate w-16 text-center ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{user.name}</span>
        </div>
      ))}
    </div>
  );
}