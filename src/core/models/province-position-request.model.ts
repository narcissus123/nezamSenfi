export interface IProvincePositionRequest {
  employmentLicenseStatus: number;
  historyOfServiceAfterGraduation: number;
  certificateExaminationStatus: number;
  tradeUnionLicenseStatus: number;
  ratingTitle: string;
  ratingStatus: number;
  provinceGuildRoomPositionId: number;
}

export interface IAllProvincePositionRequest {
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
  provinceId: number;
  userId: number;
}
