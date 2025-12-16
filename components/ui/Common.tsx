import React from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 focus:ring-brand-500",
    secondary: "bg-dark-700 hover:bg-dark-600 text-zinc-100 focus:ring-zinc-500",
    outline: "border border-zinc-700 hover:bg-zinc-800 text-zinc-300 focus:ring-zinc-500",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-zinc-400 mb-1.5 ml-1">
      {label}
    </label>
    <input
      className={`w-full bg-dark-800 border ${error ? 'border-red-500' : 'border-zinc-700'} rounded-xl px-4 py-3.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors ${className}`}
      {...props}
    />
    {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-zinc-400 mb-1.5 ml-1">
      {label}
    </label>
    <textarea
      className={`w-full bg-dark-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors min-h-[100px] resize-none ${className}`}
      {...props}
    />
  </div>
);

interface SelectCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const SelectCard: React.FC<SelectCardProps> = ({ selected, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group
      ${selected 
        ? 'bg-brand-500/10 border-brand-500/50 ring-1 ring-brand-500/50' 
        : 'bg-dark-800 border-zinc-700 hover:border-zinc-500'
      }`}
  >
    <div className="flex items-center gap-4">
      {icon && <div className={`text-2xl ${selected ? 'text-brand-500' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{icon}</div>}
      <span className={`font-medium text-lg ${selected ? 'text-brand-50' : 'text-zinc-300'}`}>
        {children}
      </span>
    </div>
    {selected && <div className="bg-brand-500 rounded-full p-1"><Check size={14} className="text-white" /></div>}
  </button>
);

export const StepHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-center space-y-2">
    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
    {subtitle && <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto">{subtitle}</p>}
  </div>
);

export const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progress = Math.min(100, (current / total) * 100);
  
  return (
    <div className="w-full bg-dark-800 h-1.5 fixed top-0 left-0 z-50">
      <div 
        className="h-full bg-brand-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};