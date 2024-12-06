import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/workouts/sessions/$id/')({
  component: () => <div>Hello /app/workouts/sessions/$id/!</div>
})
