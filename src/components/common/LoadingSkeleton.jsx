import React from 'react';

const LoadingSkeleton = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <div className={`${width} ${height} bg-slate-700 dark:bg-slate-600 rounded-lg animate-pulse ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 space-y-3 animate-pulse">
    <LoadingSkeleton height="h-6" />
    <LoadingSkeleton height="h-4" width="w-3/4" />
    <LoadingSkeleton height="h-4" width="w-1/2" />
  </div>
);

export default LoadingSkeleton;
