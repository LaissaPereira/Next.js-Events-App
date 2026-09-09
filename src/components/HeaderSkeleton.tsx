export function HeaderSkeleton() {
    return (
        <header className="navbar sticky top-0 z-10 border-b border-base-300 bg-base-100 px-4 shadow-sm">
            <div className="mx-auto flex w-full max-w-6xl">
                <div className="flex-1">
                    <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
                </div>
                <nav className="flex items-center gap-2">
                    <div className="h-9 w-20 animate-pulse rounded bg-zinc-100" />
                    <div className="h-9 w-28 animate-pulse rounded bg-zinc-100" />
                </nav>
            </div>
        </header>
    )
}
