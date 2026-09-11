import { Suspense } from "react"
import { RecommendedEvents } from "@/components/RecommendedEvents"
import { RecommendedEventsSkeleton } from "@/components/RecommendedEventsSkeleton"
import { EventCardSkeleton } from "@/components/EventCardSkeleton"
import { countEvents, listEvents, PAGE_SIZE } from "@/server/services/event.service"
import { sortDateEvents } from "@/utils/sortDateEvents"
import { EventsList } from "@/components/EventsList"
import { getCurrentUser } from "@/server/auth/current-user"
import { EventSearch } from "@/components/EventSearch"
import { Pagination } from "@/components/Pagination"


type EventsPageProps = { 
    searchParams: Promise<{
        search?: string
        page?: string
    }>

}



export default function EventsPage({searchParams}: EventsPageProps){
    return (
        <main>
            <section className="mx-auto max-w-2xl p-4 text-center">
                <h1 className="text-3xl font-bold mt-4">Events</h1>
                <p className="mt-2 text-base-content/70">Browse the list of upcoming events below.</p>
            </section>
            
            <Suspense fallback={<EventsContentSkeleton />}>
                <EventsContent searchParams={searchParams} />
            </Suspense>
            <section className="mt-16">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Discover
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Recommended Events
          </h2>
        </div>
           
            <Suspense fallback={<RecommendedEventsSkeleton />}>
                <RecommendedEvents />
            </Suspense>

             </section>
        </main>
    )
}

async function EventsContent({searchParams}: EventsPageProps){
   const { search, page } = await searchParams
   const currentPage = Math.max(Number(page) || 1, 1)
   const [events, totalCount, user] = await Promise.all([
      listEvents({search, page: currentPage}),
      countEvents({search}),
      getCurrentUser(),
   ])
   const transformedEvents = events.map(event => ({
      ...event,
      date: event.date.toString()
   }))
   const sortedEvents = sortDateEvents(transformedEvents)

   if(sortedEvents.length === 0){
      return (
         <div className="mx-auto mt-8 max-w-md rounded-box bg-base-100 p-8 text-center shadow-sm">
            <p className="text-base-content/70">No events yet. Create your first one!</p>
         </div>
      )
   }

   return (
      <>
         <EventSearch />
         <EventsList events={sortedEvents} currentUser={user ? {id: user.id, role: user.role} : null} />
         <Pagination currentPage={currentPage} totalPages={Math.ceil(totalCount / PAGE_SIZE)} />
      </>
   )
}

function EventsContentSkeleton(){
   return (
      <div className="mx-auto mt-8 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
         {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
         ))}
      </div>
   )
}