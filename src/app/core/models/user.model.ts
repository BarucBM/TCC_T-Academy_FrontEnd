export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  COMPANY = 'COMPANY'
}

export interface User {
  email: string
  password?: string
  hasGoogleAuth?: boolean
  role?: UserRole
}