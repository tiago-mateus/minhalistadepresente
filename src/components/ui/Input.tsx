import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className, ...rest }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-1 text-sm font-medium text-slate-700">
      {label}
      <input
        className={cn(
          'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100',
          error && 'border-red-300 focus:ring-red-100',
          className
        )}
        {...rest}
      />
      {helperText && <span className="text-xs font-normal text-slate-500">{helperText}</span>}
      {error && <span className="text-xs font-normal text-red-500">{error}</span>}
    </label>
  );
}
