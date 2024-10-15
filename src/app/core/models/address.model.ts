export interface Address {
  id?: string
  fullAddress: string
  postalCode: string
  streetName: string
  streetNumber: string
  addressComplement?: string
  neighborhood?: string
  city: string
  state: string
  country: string
  latitude: string
  longitude: string
}