import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function InputField({ label, type = 'text', name, value, onChange, placeholder, icon: Icon, required = false }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-300 font-medium">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />}
        <input
          type={currentType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-black/30 border border-white/10 rounded-xl py-2.5 ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-10' : 'pr-4'} text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}