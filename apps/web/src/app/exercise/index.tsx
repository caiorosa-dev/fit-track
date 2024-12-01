import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/exercise/')({
  component: () => <div>Hello /exercise/!</div>
})