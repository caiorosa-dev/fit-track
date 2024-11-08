import { useAuth } from '@/store/use-auth';
import { useNavigate } from '@tanstack/react-router';

export function useProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate({ to: '/login' });
  }
}
