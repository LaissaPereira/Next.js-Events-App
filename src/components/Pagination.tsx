"use client"

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

type PaginationProps = {
  currentPage: number
  totalPages: number
}

export function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function goToPage(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    if (page <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }

    const query = params.toString()

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname
    )
  }

  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  return (
    <nav
      aria-label="Events pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() =>
          goToPage(currentPage - 1)
        }
        disabled={currentPage <= 1}
        className="btn btn-sm btn-outline"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          aria-current={
            page === currentPage
              ? "page"
              : undefined
          }
          className={
            page === currentPage
              ? "btn btn-sm btn-primary"
              : "btn btn-sm btn-ghost"
          }
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() =>
          goToPage(currentPage + 1)
        }
        disabled={
          currentPage >= totalPages
        }
        className="btn btn-sm btn-outline"
      >
        Next
      </button>
    </nav>
  )
}