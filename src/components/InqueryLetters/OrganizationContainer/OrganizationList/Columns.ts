import { Actions } from "./Actions/Actions";
import { TextCell } from "./TextCell/TextCell";


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عنوان سازمان",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    Cell: TextCell,
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
