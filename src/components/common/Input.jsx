import React from 'react';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  disabled = false,
  icon = null,
  error = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-3 bg-slate-800 dark:bg-slate-700 border border-slate-700 dark:border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 font-inter';
  
  const errorStyles = error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : '';

  return (
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseStyles} ${errorStyles} ${icon ? 'pl-12' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
    </div>
  );
};

export default Input;
