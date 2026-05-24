import React from 'react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3"
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent ${sizes[size]} ${className}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
