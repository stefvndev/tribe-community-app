import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_community/$id/members')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_community/$id/members"!</div>
}
