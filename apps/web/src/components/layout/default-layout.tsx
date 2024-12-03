import { PropsWithChildren } from 'react';
import { MobileNav } from './mobile-nav';
import { FullScreenPage } from '../full-screen-page';
import { Container } from './container';
import { Loading } from '../loading';

export function DefaultLayout({ children, isLoading }: PropsWithChildren & { isLoading?: boolean }) {
  return (
    <FullScreenPage inApp>
      {isLoading && <Loading />}
      {!isLoading && <Container>{children}</Container>}
      <MobileNav />
    </FullScreenPage>
  );
}
