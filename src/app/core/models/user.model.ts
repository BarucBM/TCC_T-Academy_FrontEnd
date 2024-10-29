import { Address } from "./address.model"

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  COMPANY = 'COMPANY'
}

export interface User {
  id?: string
  email: string
  password?: string
  hasGoogleAuth?: boolean
  role?: UserRole
  image?: any
}

export interface UserProfile {
  name: string,
  email: string,
  image?: any
  role?: UserRole,
  address?: Address
}