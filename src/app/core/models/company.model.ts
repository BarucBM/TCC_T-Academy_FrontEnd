import { User } from "./user.model"

export interface Company {
  id?: string
  user?: User
  name: string
  address: string
  phone: string
}