import type { Event } from "@/types/event"

export function sortDateEvents(events: Event[]): Event[] {
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}