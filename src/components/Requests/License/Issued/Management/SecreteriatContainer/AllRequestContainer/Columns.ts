import { Action } from "./Action/Action";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "شغل",
    accessor: "unionUseTypeJobTitle",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "createDate",
    disableFilters: true,
  },
  {
    Header: "موقعیت",
    accessor: "cityOrVillageTitle",
    disableFilters: true,
  },
  {
    Header: "نوع واحد صنفی",
    accessor: "fixedOrMobieTypeTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    Cell: Action,
    width: 180,
  },
];
