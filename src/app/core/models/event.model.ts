import { Address } from "./address.model"
import { Image } from "./image.model"

export interface Event {
    id?: string
    title: string
    description: string
    address: Address
    startTime: Date | null
    endTime: Date | null
    freeEntry: boolean
    ticketUnitPrice: number
    ticketTax: number
    images?: Image[]
    createdAt?: Date | null
    weatherImpact: boolean
}