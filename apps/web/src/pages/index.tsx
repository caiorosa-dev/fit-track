import { FullScreenPage } from '@/components/full-screen-page';
import WelcomeCarouselItem from '@/components/misc/welcome-carousel';
import { Carousel, CarouselContent, CarouselIndicator, CarouselControlledShowComponent, CarouselNext } from '@/components/ui/carousel';
import { Logo } from '@/components/ui/logo';
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import { PublicRoute } from '@/components/auth/public-route';

export const Route = createFileRoute('/')({
  component: () => <IndexPage />
})

function IndexPage() {
  return (
    <PublicRoute>
      <FullScreenPage className='flex justify-center items-center'>
        <Logo className="absolute top-12 left-1/2 -translate-x-1/2" />
        <div className="max-w-xl w-full py-12 px-4 mt-4">
          <Carousel>
            <CarouselContent>
              <WelcomeCarouselItem
                imgSrc="/img/welcome/img_1.svg"
                title="Centralize suas informações de treino"
                description="O Fit-Track permite que você organize todos os detalhes do seu treino em um só lugar, facilitando o acompanhamento e planejamento."
                maxHeight='240px'
              />
              <WelcomeCarouselItem
                imgSrc="/img/welcome/img_2.svg"
                title="Acompanhe seu progresso de carga"
                description="Monitore o aumento de carga ao longo do tempo e veja como você está evoluindo em seus treinos."
                maxHeight='220px'
              />
              <WelcomeCarouselItem
                imgSrc="/img/welcome/img_3.svg"
                title="Organize seus treinos diários"
                description="Planeje e registre seus treinos diários para manter um histórico detalhado e otimizar seus resultados."
                maxHeight='230px'
              />
            </CarouselContent>
            <div className="mt-6 flex justify-center items-center">
              <CarouselIndicator />
            </div>
            <footer className='flex justify-center items-center mt-16 px-8 gap-4 flex-col'>
              <CarouselControlledShowComponent last={true}>
                <Link to="/register" className='w-full'>
                  <Button variant="default" className='w-full' size='rounded'>
                    Criar sua conta
                  </Button>
                </Link>
              </CarouselControlledShowComponent>
              <CarouselControlledShowComponent last={false}>
                <CarouselNext size="rounded" className='w-full' variant="default">
                  Próximo
                </CarouselNext>
              </CarouselControlledShowComponent>
              <CarouselControlledShowComponent last={true}>
                <Link to="/login" className='w-full'>
                  <Button variant="secondary" className='w-full' size='rounded'>
                    Já tenho uma conta
                  </Button>
                </Link>
              </CarouselControlledShowComponent>
            </footer>
          </Carousel>
        </div>
      </FullScreenPage>
    </PublicRoute>
  );
}
