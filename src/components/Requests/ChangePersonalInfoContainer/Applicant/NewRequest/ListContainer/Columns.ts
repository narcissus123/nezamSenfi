import { Action } from "./Action/Action";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "تاریخ ایجاد",
    accessor: "dateTime",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "identityChangeStatusTitle",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: Action,
  },
];
