import { PropsWithChildren } from 'react';
import { MobileNav } from '../ui/mobile-nav';
import { FullScreenPage } from '../full-screen-page';
import { Container } from './container';

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <FullScreenPage>
      <Container>
        {children}
      </Container>
      <MobileNav />
    </FullScreenPage>
  );
}
