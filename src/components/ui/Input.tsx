import React, { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  const baseStyles = 'rounded-md border bg-parchment-100 border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body';
  const errorStyles = error ? 'border-mahogany-700 focus:border-mahogany-700 focus:ring-mahogany-700' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={clsx(widthClass, className)}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-forest-900 mb-1 font-body"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(baseStyles, errorStyles, widthClass)}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-mahogany-700 font-body">{error}</p>}
    </div>
  );
};