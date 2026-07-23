import React, { useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../../styles/animations.css';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen w-full bg-[#090d16] text-white flex items-center justify-center overflow-hidden p-4 md:p-8">
      
      {/* Dynamic Animated Gradient Background Blobs */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full animate-glow opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-tr from-cyan-500 to-pink-500 rounded-full animate-glow opacity-40 pointer-events-none" />

      {/* Decorative Floating Elements */}
      <div className="absolute top-12 left-12 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 animate-float-1 hidden lg:flex items-center gap-3 shadow-2xl">
        <div className="p-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl"><Sparkles className="w-5 h-5 text-white" /></div>
        <div>
          <p className="text-xs text-gray-400">Next-Gen UI</p>
          <p className="text-sm font-semibold">3D & Animated</p>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 animate-float-2 hidden lg:flex items-center gap-3 shadow-2xl">
        <div className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl"><ShieldCheck className="w-5 h-5 text-white" /></div>
        <div>
          <p className="text-xs text-gray-400">Security</p>
          <p className="text-sm font-semibold">Encrypted Vault</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="perspective-container w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Hero Showcase */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-medium text-cyan-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> V2.0 Platform Upgrade
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Build Faster. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent">Experience the Pop.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto lg:mx-0">
            Step into a slick interactive dashboard powered by real-time tilt visuals, dynamic light glows, and ultra-fluid responsive components.
          </p>
        </div>

        {/* 3D Interactive Auth Card */}
        <div className="lg:col-span-6 flex justify-center">
          <GlassCard>
            {/* Login / Signup Tabs */}
            <div className="relative flex p-1 bg-black/40 rounded-2xl border border-white/10 mb-8">
              <button onClick={() => setIsLogin(true)} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${isLogin ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:text-white'}`}>
                Sign In
              </button>
              <button onClick={() => setIsLogin(false)} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${!isLogin ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:text-white'}`}>
                Sign Up
              </button>
            </div>

            {/* Dynamic Form Rendering */}
            {isLogin ? <LoginForm /> : <SignupForm />}
          </GlassCard>
        </div>

      </div>
    </div>
  );
}