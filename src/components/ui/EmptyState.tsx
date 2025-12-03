import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-8 text-center text-slate-600">
      <div className="text-3xl">🎁</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
      {action}
    </div>
  );
}
