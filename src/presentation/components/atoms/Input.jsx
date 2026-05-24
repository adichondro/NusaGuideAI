import React from 'react';

export function Input({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label = '',
  description = '',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      {label && (
        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 text-sm bg-surface-container border border-outline rounded-lg text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
      {description && (
        <span className="text-[11px] text-on-surface-variant leading-normal">
          {description}
        </span>
      )}
    </div>
  );
}
