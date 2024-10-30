import { Address } from "./address.model"
import { Company } from "./company.model"
import { Image, ImageResponse } from "./image.model"

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
    images?: Image[] | ImageResponse[]
    createdAt?: Date | null
    company?: Company
}

export interface CustomerEvent extends Event {
    customerRating: number
    acquisitionDate: Date
}