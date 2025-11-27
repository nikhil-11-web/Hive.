import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { X, Send, MoreVertical, Phone, Video, Paperclip, Smile, Search, ChevronLeft } from 'lucide-react';
import gsap from 'gsap';

// --- MOCK DATA: CHAT LIST ---
const chatList = [
  { id: 1, name: "Sarah Williams", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100", lastMsg: "Are we ready for the demo?", time: "10:05 AM", unread: 2, active: true },
  { id: 2, name: "Alex Johnson", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100", lastMsg: "Sent you the files.", time: "Yesterday", unread: 0, active: false },
  { id: 3, name: "Design Team", avatar: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100", lastMsg: "Mike: Let's sync at 5.", time: "9:30 AM", unread: 5, active: false },
  { id: 4, name: "Emma Davis", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100", lastMsg: "Loved your recent post! 🔥", time: "Mon", unread: 0, active: true },
  { id: 5, name: "John Smith", avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100", lastMsg: "See you tomorrow.", time: "Sun", unread: 0, active: false },
];

const dummyMessages = [
  { id: 1, text: "Hey! The layout needs to be perfect. 📐", sender: "them", time: "10:00 AM" },
  { id: 2, text: "I completely agree. Let's fix the header spacing.", sender: "me", time: "10:02 AM" },
  { id: 3, text: "It looks much better now! The half-screen view is great.", sender: "them", time: "10:03 AM" },
];

const ChatSection = ({ onClose }) => {
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // STATE
  const [selectedChat, setSelectedChat] = useState(null); // Null means showing list
  const [messages, setMessages] = useState(dummyMessages);
  const [inputValue, setInputValue] = useState("");

  // Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (selectedChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChat]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), text: inputValue, sender: "me", time: "Just now" }]);
    setInputValue("");
  };

  return (
    <div ref={containerRef} className="fixed top-0 right-0 z-[100] h-[100dvh] w-full md:w-[50vw] lg:w-[40vw] bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.7)] flex flex-col font-sans overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] pointer-events-none rounded-full"></div>

      {/* --- VIEW 1: CONVERSATION (If a chat is selected) --- */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col h-full relative z-20">
            {/* Chat Header */}
            <div className="p-4 bg-slate-900/80 border-b border-white/5 flex items-center justify-between backdrop-blur-md pt-6">
                <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedChat(null)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white mr-1">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="relative">
                        <img src={selectedChat.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                        {selectedChat.active && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></span>}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">{selectedChat.name}</h3>
                        <p className="text-xs text-slate-400">{selectedChat.active ? 'Active now' : 'Offline'}</p>
                    </div>
                </div>
                <div className="flex gap-1 text-slate-400">
                    <button className="p-2 hover:bg-white/10 rounded-full"><Phone size={20} /></button>
                    <button className="p-2 hover:bg-white/10 rounded-full"><Video size={20} /></button>
                </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-transparent to-slate-900/30">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-3 text-[14px] leading-relaxed rounded-2xl ${msg.sender === 'me' ? 'bg-violet-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-slate-900/90 border-t border-white/10 flex gap-3 pb-8 md:pb-4">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Message..." className="flex-1 bg-slate-950 border border-white/10 rounded-full px-5 py-3 text-sm text-white outline-none focus:border-violet-500/50" />
                <button type="submit" className="p-3 bg-violet-600 rounded-full text-white hover:scale-105 transition-transform"><Send size={18} /></button>
            </form>
        </div>
      ) : (
        
        // --- VIEW 2: CHAT LIST (Default View) ---
        <div className="flex-1 flex flex-col h-full relative z-20">
            
            {/* List Header */}
            <div className="p-6 pt-8 border-b border-white/5 flex items-center justify-between bg-slate-900/80 backdrop-blur-md">
                <h2 className="text-xl font-bold font-serif text-white tracking-wide">Messages</h2>
                <button onClick={onClose} className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-full text-slate-300 transition-colors"><X size={20} /></button>
            </div>

            {/* Search Chats */}
            <div className="p-4">
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" placeholder="Search conversations..." className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-violet-500/50 transition-all" />
                </div>
            </div>

            {/* Chat List Items */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                {chatList.map((chat) => (
                    <div key={chat.id} onClick={() => setSelectedChat(chat)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group border-b border-white/5 last:border-0">
                        <div className="relative">
                            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-violet-500/50 transition-colors" />
                            {chat.active && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950"></span>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-sm text-slate-200 truncate group-hover:text-white">{chat.name}</h4>
                                <span className="text-[10px] text-slate-500">{chat.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className={`text-xs truncate w-[80%] ${chat.unread > 0 ? 'text-white font-semibold' : 'text-slate-500'}`}>{chat.lastMsg}</p>
                                {chat.unread > 0 && <span className="bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{chat.unread}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default ChatSection;