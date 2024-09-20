import { User } from "./user.model"

export interface Customer {
  id?: string
  user: User
  name: string
  address: string
  phone: string
}

export interface NewCustomer {
  user: User
  customer: Customer
}