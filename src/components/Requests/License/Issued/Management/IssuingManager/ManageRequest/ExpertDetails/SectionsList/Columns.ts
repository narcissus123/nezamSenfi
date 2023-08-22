import { Action } from "./Action";;

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    width: 70,
    disableFilters: true,
  },
  {
    Header: "نام مزرعه",
    accessor: "farmName",
    width: 70,
    disableFilters: true,
  },
  {
    Header: "مساحت",
    accessor: "area",
    width: 70,
    disableFilters: true,
  },
  {
    Header: "محیط",
    accessor: "perimeter",
    width: 70,
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    width: 100,
    Cell: Action,
  },
];
