import { EmploymentLicenseStatusCell } from "./EmploymentLicenseStatusCell/EmploymentLicenseStatusCell";
import { HistoryAction } from "./HistoryAction/HistoryAction";
import { HistoryOfServiceAfterGraduationCell } from "./HistoryOfServiceAfterGraduationCell/HistoryOfServiceAfterGraduation";
import { RatingStatusCell } from "./RatingStatusCell/RatingStatusCell";

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "entityCreatedAt",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت پروانه اشتغال",
    accessor: "employmentLicenseStatus",
    Cell: EmploymentLicenseStatusCell,
    disableFilters: true,
    width:180
  },
  {
    Header: "سابقه خدمت پس از تحصیل",
    accessor: "historyOfServiceAfterGraduation",
    Cell: HistoryOfServiceAfterGraduationCell,
    disableFilters: true,
    width:180
  },
  {
    Header: "موضوع رتبه یا پروانه اشتغال",
    accessor: "ratingTitle",
    disableFilters: true,
    width:180
  },
  {
    Header: "وضعیت رتبه",
    accessor: "ratingStatus",
    Cell: RatingStatusCell,
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: HistoryAction,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
