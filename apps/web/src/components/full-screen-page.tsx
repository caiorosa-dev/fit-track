import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export function FullScreenPage({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <main className={cn('w-full min-h-screen h-full p-4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-400 via-teal-700 to-stone-400', className)}>
      {children}
    </main>
  );
}
