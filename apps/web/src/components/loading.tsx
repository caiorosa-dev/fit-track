import { Loader2 } from 'lucide-react';
import { FullScreenPage } from './full-screen-page';

export function Loading() {
  return (
    <FullScreenPage className="flex justify-center items-center">
      <Loader2 className="text-primary animate-spin size-6" />
    </FullScreenPage>
  );
}
