import React from 'react';
import { motion } from 'framer-motion';
import { buttonHoverScale } from '../../utils/animations.js';

const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  isLoading = false,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-inter';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 disabled:bg-slate-600',
    secondary: 'bg-slate-700 dark:bg-slate-600 text-white hover:bg-slate-800 dark:hover:bg-slate-700 disabled:bg-slate-600',
    ghost: 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:text-slate-500',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 disabled:bg-slate-600',
    success: 'bg-success-500 text-white hover:bg-success-600 disabled:bg-slate-600',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      {...buttonHoverScale}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClassName}
      type={type}
      {...props}
    >
      {isLoading && (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
