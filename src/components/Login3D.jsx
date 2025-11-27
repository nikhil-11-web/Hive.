import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Mail, Lock, ArrowRight, Loader2, User, AtSign } from 'lucide-react';
import Hive3DBackground from './Hive3DBackground';

const Login3D = ({ onLogin, theme = 'dark' }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Signup
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
      password: ''
  });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would register the user here
      onLogin(); 
    }, 1500);
  };

  const toggleMode = () => {
      setIsLogin(!isLogin);
      // Reset form on toggle if needed
  };

  // Animation Config
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] font-sans">
      
      {/* --- 3D BACKGROUND --- */}
      <Hive3DBackground theme={theme} />

      {/* --- GLASS CARD --- */}
      <motion.div 
        layout // This prop makes the height animate smoothly when switching modes
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        {/* Glass Effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 transition-all duration-500"></div>
        
        <div className="relative z-20 p-8 flex flex-col items-center text-center">
            
            {/* Header Section */}
            <div className="mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#FF4F18] to-fuchsia-600 p-[2px] shadow-lg shadow-orange-500/20">
                     <div className="w-full h-full rounded-2xl bg-[#050505] flex items-center justify-center">
                         <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-fuchsia-400">H.</span>
                     </div>
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? "login-title" : "signup-title"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h1 className="text-2xl font-bold font-serif text-white mb-1 tracking-tight">
                            {isLogin ? "Welcome To Hive.." : "Create Account"}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {isLogin ? "Enter the collective." : "Join the Hive community."}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                
                <AnimatePresence>
                    {!isLogin && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                        >
                            {/* Full Name Input */}
                            <div className="group relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FF4F18] transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4F18]/70 focus:bg-black/50 transition-all duration-300"
                                    required={!isLogin}
                                />
                            </div>

                            {/* Username Input */}
                            <div className="group relative">
                                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FF4F18] transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4F18]/70 focus:bg-black/50 transition-all duration-300"
                                    required={!isLogin}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Email Input (Always Visible) */}
                <div className="group relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FF4F18] transition-colors" size={18} />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4F18]/70 focus:bg-black/50 transition-all duration-300"
                        required
                    />
                </div>

                {/* Password Input (Always Visible) */}
                <div className="group relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FF4F18] transition-colors" size={18} />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4F18]/70 focus:bg-black/50 transition-all duration-300"
                        required
                    />
                </div>

                {/* Login Options (Only for Login) */}
                {isLogin && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        className="flex items-center justify-between text-xs text-slate-400 pt-1"
                    >
                        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-300 transition-colors">
                            <input type="checkbox" className="rounded border-white/10 bg-black/30 text-[#FF4F18] focus:ring-0" />
                            Remember me
                        </label>
                        <button type="button" className="hover:text-[#FF4F18] transition-colors">Forgot password?</button>
                    </motion.div>
                )}

                 {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#FF4F18] to-[#ff7b00] hover:to-[#FF4F18] text-white font-bold rounded-xl shadow-lg shadow-orange-900/30 transform active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative group"
                >
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                    
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <span className="flex items-center gap-2">
                            {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
                        </span>
                    )} 
                </button>

            </form>

             {/* Footer Toggle */}
            <div className="mt-8 text-sm text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                    onClick={toggleMode}
                    className="ml-2 font-bold text-white hover:text-[#FF4F18] transition-colors focus:outline-none"
                >
                    {isLogin ? "Sign up now" : "Log in"}
                </button>
            </div>

        </div>
      </motion.div>
      
       {/* Footer Credits */}
      <div className="absolute bottom-6 text-[10px] text-slate-600 uppercase tracking-widest mix-blend-plus-lighter pointer-events-none">
        © 2025 Hive Collective.
      </div>

    </div>
  );
};

export default Login3D;