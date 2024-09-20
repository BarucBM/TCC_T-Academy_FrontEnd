export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}
export interface User {
  id?: string
  email: string
  password: string
  googleApiToken: string
  role?: UserRole
}