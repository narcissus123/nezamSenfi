export interface ICountyPositionRequest {
  employmentLicenseStatus: number;
  historyOfServiceAfterGraduation: number;
  certificateExaminationStatus: number;
  tradeUnionLicenseStatus: number;
  ratingTitle: string;
  ratingStatus: number;
  countyGuildRoomPositionId: number;
}

export interface IAllCountyPositionRequest {
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
  countyId: number;
  userId: number;
}
