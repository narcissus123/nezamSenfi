import { Action } from "./Action/Action";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "وضعیت اعتبار",
    accessor: "isValidTitle",
    disableFilters: true,
  },
  {
    Header: "موقعیت",
    accessor: "cityOrVillageTitle",
    disableFilters: true,
  },
  {
    Header: "تاریخ شروع",
    accessor: "startDate",
    disableFilters: true,
  },
  {
    Header: "تاریخ پایان",
    accessor: "endDate",
    disableFilters: true,
  },
  {
    Header: "وضعیت کلی پروانه",
    accessor: "finalLicenseStatusEnumTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت پروانه",
    accessor: "licenseRequestStatusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    Cell: Action,
    width: 360,
    getProps: (props: any) => ({
      flow: props.flow,
    }),
  },
];
