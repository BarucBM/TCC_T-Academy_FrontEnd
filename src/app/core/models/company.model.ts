import { Address } from "./address.model"
import { User } from "./user.model"

export interface Company {
  id?: string
  user?: User
  name: string
  address?: Address
  phone: string
  duns: string
}

export interface NewCompany {
  user: User
  company: Company
}