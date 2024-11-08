import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export function FullScreenPage({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <main className={cn('w-full min-h-screen h-full p-4', className)}>
      {children}
    </main>
  );
}
