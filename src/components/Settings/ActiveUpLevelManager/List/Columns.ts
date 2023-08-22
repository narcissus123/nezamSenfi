import { Action } from "./Action/Action";

export const columns = [
  {
    Header: "تایید مدیر شهرستانی برای درخواست شغل اتحادیه",
    accessor: "countyUnionIsActive",
    disableFilters: true,
  },
  {
    Header: "تایید مدیر استانی برای درخواست شغل شهرستانی",
    accessor: "countyGuildRoomIsActive",
    disableFilters: true,
  },
  {
    Header: "تایید مدیر کشوری برای درخواست شغل استانی",
    accessor: "provinceGuildRoomIsActive",
    disableFilters: true,
  },
  {
    Header: "از تاریخ",
    accessor: "startDate",
    disableFilters: true,
  },
  {
    Header: "تا تاریخ",
    accessor: "toDate",
    disableFilters: true,
  },
  {
    Header: "نام کاربری فعال کننده",
    accessor: "modifierUserName",
    disableFilters: true,
  },
  // {
  //   Header: "عملیات",
  //   accessor: "actions",
  //   disableFilters: true,
  //   Cell: Action,
  //   width: 180,
  //   getProps: (props: any) => ({
  //     flow: props.flow,
  //   }),
  // },
];
