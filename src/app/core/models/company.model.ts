import { Address } from "./address.model"
import { User } from "./user.model"

export interface Company {
  id?: string
  user?: User<Company>
  name: string
  address?: Address
  phone: string
  duns: string
}

export interface NewCompany {
  user: User<Company>
  company: Company
}