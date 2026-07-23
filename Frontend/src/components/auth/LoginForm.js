import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" icon={Mail} required />
      <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" icon={Lock} required />
      
      <div className="flex justify-end">
        <a href="#forgot" className="text-xs text-cyan-400 hover:underline">Forgot Password?</a>
      </div>
      
      <Button type="submit" icon={ArrowRight}>Welcome Back</Button>
    </form>
  );
}