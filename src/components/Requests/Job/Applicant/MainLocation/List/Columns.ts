import { Actions } from "./Actions/Actions";
import { createDateCell } from "./createDateCell/createDateCell";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "تاریخ ایجاد",
    Cell: createDateCell,
    accessor: "createDate",
    disableFilters: true,
  },
    {
    Header: "کشور",
    accessor: "mainLocation",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:180,
    Cell:Actions ,
  }
];
