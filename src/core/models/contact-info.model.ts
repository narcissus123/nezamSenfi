export interface ISetRealContactInfo {
  email: string;
  addresses: {
    locationId: number;
    homePhone: string;
    postalCode: string;
    address: string;
  }[];
}
