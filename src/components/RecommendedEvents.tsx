
export async function RecommendedEvents(){
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const recommendations = [
    {
      id: "recommendation-1",
      title: "Berlin Tech Meetup",
      location: "Berlin Mitte",
      category: "Technology",
    },
    {
      id: "recommendation-2",
      title: "Next.js Community Night",
      location: "Kreuzberg",
      category: "Development",
    },
    {
      id: "recommendation-3",
      title: "Creative Coding Evening",
      location: "Neukölln",
      category: "Creative Tech",
    },
  ]
     return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {recommendations.map(
        (event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:bg-white hover:shadow-sm"
          >
            <span className="inline-flex rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
              {event.category}
            </span>

            <h3 className="mt-4 text-lg font-semibold">
              {event.title}
            </h3>

            <p className="mt-3 text-sm text-zinc-500">
              📍 {event.location}
            </p>
          </article>
        )
      )}
    </div>
  )
}