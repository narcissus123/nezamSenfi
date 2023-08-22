
import { Actions } from "./Actions/Actions";
import { StatusCell } from "./StatusCell/StatusCell";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام اتحادیه",
    accessor: "name",
    disableFilters: true,
  },  
  {
    Header: "نام شهرستان",
    accessor: "countyName",
    disableFilters: true,
    width:120
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:100,
    Cell:Actions ,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
