import React from 'react';

export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`tilt-card w-full max-w-md bg-white/[0.07] backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden ${className}`}>
      {/* Ambient Inner Card Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/30 rounded-full blur-3xl pointer-events-none" />
      {children}
    </div>
  );
}