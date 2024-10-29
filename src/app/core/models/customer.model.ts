import { Address } from "./address.model"
import { User } from "./user.model"

export interface Customer {
    id?: string
    user?: User
    name: string
    address?: Address
    phone: string
}

export interface NewCustomer {
    user: User
    customer: Customer
}