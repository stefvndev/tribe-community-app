import AppLayout from '@/components/layout/AppLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_community/$id/about')({
  component: () => (
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  ),
})

function RouteComponent() {
  return <div>Hello "/_community/$id/about"!</div>
}
