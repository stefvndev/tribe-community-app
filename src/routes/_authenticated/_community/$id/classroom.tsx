import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_community/$id/classroom',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_community/$id/classroom"!</div>
}
