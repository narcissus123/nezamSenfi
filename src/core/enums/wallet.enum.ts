export enum FinancialTransactionStatusName {
  Succeeded = "موفق",
  NotSucceeded = "ناموفق",
}
export enum FinancialTransactionStatus {
  Succeeded = 1,
  NotSucceeded = 2,
}

export enum FinancialTransactionType {
  ChargeWallet = 1,
  PayFromWallet = 2,
  PayFromBank = 3,
}
export enum FinancialTransactionTypeName {
  ChargeWallet = "شارژ کیف پول",
  PayFromWallet = "پرداخت از کیف پول",
  PayFromBank = "پرداخت از درگاه بانک",
}

export enum FinancialTransactionSection {
  PositionRequest = 1,
  LicensRequest = 2,
  Wallet = 3,
}
export enum FinancialTransactionSectionName {
  PositionRequest = "درخواست سمت",
  LicensRequest = "درخواست پروانه",
  Wallet = "کیف پول",
}
