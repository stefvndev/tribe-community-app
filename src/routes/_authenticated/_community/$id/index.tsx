import { useCommunityData } from '@/api/get'
import DefaultNotFoundComponent from '@/components/notFound/DefaultNotFoundComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_community/$id/')({
  component: () => <RouteComponent />,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data, isError } = useCommunityData(id)

  console.log(data)

  if (isError) return <DefaultNotFoundComponent />

  return (
    <main className="w-full h-full">
      <div className="flex items-center justify-center p-4 mx-auto max-w-1075">
        {data?.name}
      </div>
    </main>
  )
}
