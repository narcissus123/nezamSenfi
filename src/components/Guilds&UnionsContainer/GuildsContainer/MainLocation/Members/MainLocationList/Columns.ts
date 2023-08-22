
import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام صنف",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "نقش در صنف",
    accessor: "role",
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
