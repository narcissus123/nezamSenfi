export interface IUnionPositionRequest {
  employmentLicenseStatus: number;
  historyOfServiceAfterGraduation: number;
  certificateExaminationStatus: number;
  tradeUnionLicenseStatus: number;
  ratingTitle: string;
  ratingStatus: number;
  countyUnionPositionId: number;
}

export interface IAllUnionPositionRequest {
  page: number;
  pageSize: number;
  status: number;
  employmentLicenseStatus: number;
  historyOfServiceAfterGraduation: number;
  certificateExaminationStatus: number;
  tradeUnionLicenseStatus: number;
  ratingTitle: string;
  ratingStatus: number;
  startCreateDate: string;
  endCreateDate: string;
  countyUnionId: number;
  userId: number;
}
