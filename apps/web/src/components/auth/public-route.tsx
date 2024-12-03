import { usePublicRoute } from '@/hooks/auth/use-public-route';

export function PublicRoute({ children }: { children: React.ReactNode }) {
  usePublicRoute();

  return children;
}
