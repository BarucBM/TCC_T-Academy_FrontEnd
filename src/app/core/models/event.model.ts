import { Image } from "./image.model"

export interface Event{
    id?: string
    title: string
    description: string
    location: string
    startTime: Date | null
    endTime: Date | null
    images?: Image[]
    createdAt?: Date | null
    weatherImpact: boolean
}