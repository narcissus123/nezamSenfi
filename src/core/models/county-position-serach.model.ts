export interface ICountyPositionSearch {
  page: number;
  pageSize: number;
  status: number | null;
  employmentLicenseStatus: number | null;
  historyOfServiceAfterGraduation: number | null;
  certificateExaminationStatus: number | null;
  tradeUnionLicenseStatus: number | null;
  ratingTitle: string;
  ratingStatus: number | null;
  startCreateDate: string;
  endCreateDate: string;
  countyId: number | null;
}