import { App } from '@/components/app';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: () => (
    <App>
      <Outlet />
      {/* {import.meta.env.DEV && <TanStackRouterDevtools />} */}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </App>
  ),
});
