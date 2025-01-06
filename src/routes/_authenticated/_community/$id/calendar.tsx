import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_community/$id/calendar')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/_community/$id/calendar"!</div>
}
