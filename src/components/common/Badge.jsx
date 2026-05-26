import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  const variants = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400',
    success: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400',
    warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400',
    danger: 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400',
    slate: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
