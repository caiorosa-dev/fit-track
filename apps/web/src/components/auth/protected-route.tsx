import { useProtectedRoute } from '@/hooks/auth/use-protected-route';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  useProtectedRoute();

  return children;
}
