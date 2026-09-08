import { z } from "zod"


export const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: z.string().min(2, "Location is required"),
    date: z.string().min(1, "Date is required").refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date"),
})

export type EventInput = z.infer<typeof eventSchema>