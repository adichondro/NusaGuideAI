import React from 'react';

export function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: "bg-primary/20 text-primary border border-primary/20",
    secondary: "bg-surface-container text-on-surface border border-outline",
    warning: "bg-hotel/10 text-hotel border border-hotel/20",
    success: "bg-food/10 text-food border border-food/20"
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
