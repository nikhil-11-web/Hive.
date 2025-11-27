import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { X, Image as ImageIcon, MapPin, Smile, ChevronDown, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

const CreatePostModal = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- SCROLL LOCK ---
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // --- ANIMATION ---
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  // --- FILE HANDLERS ---
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };

  const handlePost = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      
      {/* Close Button (Top Right) */}
      <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors z-50">
        <X size={24} />
      </button>

      <div 
        ref={modalRef} 
        className="w-full max-w-4xl h-[80vh] md:h-[70vh] bg-slate-950 border border-white/10 rounded-3xl shadow-2xl shadow-black/50 flex flex-col md:flex-row overflow-hidden relative"
      >
        
        {/* --- LEFT SIDE: IMAGE UPLOAD --- */}
        <div 
            className={`relative flex-1 bg-slate-900/50 border-b md:border-b-0 md:border-r border-white/5 flex flex-col items-center justify-center p-6 transition-colors duration-300 ${isDragging ? 'bg-violet-900/20 border-violet-500/50' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            {selectedFile ? (
                // Preview State
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <img src={selectedFile} alt="Preview" className="max-h-full max-w-full object-contain" />
                    <button 
                        onClick={() => setSelectedFile(null)}
                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-md"
                    >
                        <X size={18} />
                    </button>
                </div>
            ) : (
                // Upload State
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                        <ImageIcon size={40} className="text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Drag photos and videos here</h3>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        hidden 
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                    <button 
                        onClick={() => fileInputRef.current.click()}
                        className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-violet-900/20"
                    >
                        Select from computer
                    </button>
                </div>
            )}
        </div>

        {/* --- RIGHT SIDE: CAPTION & SETTINGS --- */}
        <div className="w-full md:w-[350px] flex flex-col bg-slate-950">
            
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100" className="w-8 h-8 rounded-full object-cover" alt="User" />
                    <span className="font-bold text-sm text-white">your_username</span>
                </div>
                <button 
                    onClick={handlePost}
                    disabled={!selectedFile || isLoading}
                    className={`text-sm font-bold transition-all ${!selectedFile ? 'text-slate-600' : 'text-violet-400 hover:text-violet-300'}`}
                >
                    {isLoading ? 'Sharing...' : 'Share'}
                </button>
            </div>

            {/* Caption Input */}
            <div className="flex-1 p-4">
                <textarea 
                    className="w-full h-48 bg-transparent text-white text-sm placeholder:text-slate-500 outline-none resize-none leading-relaxed"
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                ></textarea>
                
                <div className="flex items-center justify-between mt-2 text-slate-400">
                    <Smile size={20} className="cursor-pointer hover:text-white transition-colors" />
                    <span className="text-xs">{caption.length}/2,200</span>
                </div>
            </div>

            {/* Options List */}
            <div className="border-t border-white/5">
                <div className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 group">
                    <div className="text-sm text-slate-300 group-hover:text-white transition-colors">Add Location</div>
                    <MapPin size={18} className="text-slate-500 group-hover:text-white" />
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 group">
                    <div className="text-sm text-slate-300 group-hover:text-white transition-colors">Accessibility</div>
                    <ChevronDown size={18} className="text-slate-500 group-hover:text-white" />
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer transition-colors group">
                    <div className="text-sm text-slate-300 group-hover:text-white transition-colors">Advanced settings</div>
                    <ChevronDown size={18} className="text-slate-500 group-hover:text-white" />
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default CreatePostModal;