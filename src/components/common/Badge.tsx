import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary' | 'info';
  className?: string;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className,
  dot = true,
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20',
    warning: 'bg-amber-50 text-amber-700 ring-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20',
    danger: 'bg-rose-50 text-rose-700 ring-rose-200/70 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20',
    primary: 'bg-primary-50 text-primary-700 ring-primary-200/70 dark:bg-primary-500/10 dark:text-primary-300 dark:ring-primary-500/20',
    info: 'bg-sky-50 text-sky-700 ring-sky-200/70 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20',
  };

  const dots = {
    default: 'bg-slate-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    primary: 'bg-primary-500',
    info: 'bg-sky-500',
  };

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ring-1 ring-inset",
      variants[variant],
      className
    )}>
      {dot && <span className={clsx('h-1.5 w-1.5 rounded-full', dots[variant])} />}
      {children}
    </span>
  );
};

export default Badge;