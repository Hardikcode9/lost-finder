import React from 'react';

export default function Button({ children, type = 'button', onClick, icon: Icon, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 font-semibold text-white text-sm shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group ${className}`}
    >
      <span>{children}</span>
      {Icon && <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
    </button>
  );
}