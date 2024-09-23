export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  COMPANY = 'COMPANY'
}
export interface User {
  id?: string
  email: string
  password: string
  googleApiToken?: string
  role?: UserRole
}