import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  iconLeft?: ReactNode;
}

export function Button({
  children,
  className,
  variant = 'primary',
  loading,
  iconLeft,
  ...rest
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const styles = {
    primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 focus:ring-primary-300',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-primary-200',
    ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-primary-100',
  };

  return (
    <button className={cn(base, styles[variant], className)} disabled={loading || rest.disabled} {...rest}>
      {loading && <span className="h-2 w-2 animate-ping rounded-full bg-white" />} {iconLeft}
      {children}
    </button>
  );
}
