export type Event = {
    id: string
    title: string
    description: string
    date: string
    location: string
    organizerId?: string
}

export type EventsResponse = {
    totalCount: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    results: Event[]
}

export type CreateEventFormData = {
    title: string
    description: string
    location: string
    date: string
}

export type UpdateEventFormData =  CreateEventFormData & {
    id: string
}