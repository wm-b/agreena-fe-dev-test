export interface Certificates {
  errors: any[]
  result: Result
  success: boolean
}

export interface Result {
  data: Certificate[]
  meta: Meta
}

export interface Certificate {
  id: number
  combinedCertificates?: Certificate[]
  uniqueNumber: string
  status: Status
  ownershipStatus: "owned" | string
  vintageYear: number[]
  methodologyVersion: string[]
  countryCode: string
  companyName: string
  standard: string
  tonnes: number
  issuanceDate: string
  deployment: string
  validity: Validity
  replenishment: null
  carbonCertificateNft: null
  carbonField: CarbonField
  carbonUser: CarbonUser
  carbonCertificateOwnerAccount: CarbonCertificateOwnerAccount
}

export interface CarbonCertificateOwnerAccount {
  id: number
  carbonUser: CarbonUser
}

export interface CarbonUser {
  id: number
  user: User
  company: Company
}

export interface Company {
  id: number
  name: string
  address: Address
}

export interface Address {
  id: number
  country: string
}

export interface User {
  id: number
}

export interface CarbonField {
  id: number
  carbonFarm: CarbonFarm
}

export interface CarbonFarm {
  id: number
  carbonAddress: CarbonAddress
}

export interface CarbonAddress {
  id: number
  carbonCountry: string
}

export enum Status {
  Consolidated = "consolidated",
  Transferable = "transferable"
}

export enum Validity {
  Valid = "valid"
}

export interface Meta {
  currentPage: number
  itemCount: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
