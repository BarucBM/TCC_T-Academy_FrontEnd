export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  COMPANY = 'COMPANY'
}
export interface User {
  email: string
  googleApiToken?: string
  role?: UserRole
}