import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

export default function SignupForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing up with:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Full Name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" icon={User} required />
      <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" icon={Mail} required />
      <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" icon={Lock} required />
      
      <Button type="submit" icon={ArrowRight}>Create Account</Button>
    </form>
  );
}