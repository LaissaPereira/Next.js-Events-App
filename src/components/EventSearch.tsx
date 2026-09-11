"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export function EventSearch(){
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentSearchParams = searchParams.get("search") ?? ""
    const [search, setSearch] = useState(currentSearchParams)

    useEffect(()=>{
        const trimmedSearch = search.trim()
        if(trimmedSearch === currentSearchParams){
            return
        }
        const timeout = setTimeout(() => {
            const params =  new URLSearchParams(searchParams.toString())
            if(trimmedSearch){
                params.set("search", trimmedSearch)
            }else {
                params.delete("search")
            }
            router.replace(`${pathname}?${params.toString()}`)
        }, 400)
        return () =>{ clearTimeout(timeout) }
    }, [search, currentSearchParams, searchParams, pathname, router])
    return(
        <div className="mb-8 max-w-xl">
            <label htmlFor="event-search">Search events</label>
            <input id="event-search" type="search" value={search} onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setSearch(event.target.value)} placeholder="Search by title, description or location"  className="input input-bordered w-full"/>
        </div>
    )
}