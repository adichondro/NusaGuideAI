import React from 'react';

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed gap-2";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20",
    secondary: "bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20",
    link: "bg-transparent text-primary hover:underline p-0"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
