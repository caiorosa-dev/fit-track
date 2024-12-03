import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/exercise/')({
  component: () => <div>Hello /exercise/!</div>
})