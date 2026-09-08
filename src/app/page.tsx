import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      <section className="hero rounded-box bg-base-100 py-16 shadow-sm">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-primary">Welcome to the Events App</h1>
            <p className="mt-4 text-lg text-base-content/70">Discover and manage events effortlessly.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/events" className="btn btn-primary">View events</Link>
              <Link href="/events/create" className="btn btn-outline">Create event</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
