
import { Actions } from "./Actions/Actions";
import { SeenCell } from "./SeenCell/SeenCell";
import { TextCell } from "./TextCell/TextCell";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "پیام",
    accessor: "text",
    Cell:TextCell,
    disableFilters: true,
  },
  {
    Header: "تاریخ ایجاد",
    accessor: "createAt",
    disableFilters: true,
  },  
  {
    Header: "مشاهده شده",
    accessor: "isRead",
    Cell : SeenCell,
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:100,
    Cell:Actions ,
  }
];
