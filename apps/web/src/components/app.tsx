import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from './ui/sonner';
import { ThemeProvider } from './theme-context';

const queryClient = new QueryClient();

export function App({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="fit-track-ui-theme">
        {children}
        <Toaster richColors position="top-center" duration={1500} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
