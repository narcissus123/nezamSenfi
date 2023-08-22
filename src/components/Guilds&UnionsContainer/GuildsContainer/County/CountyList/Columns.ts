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
    Header: "نام صنف",
    accessor: "title",
    disableFilters: true,
    width:140
  },
  {
    Header: "شهرستان",
    accessor: "name",
    disableFilters: true,
    width:140
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    Cell : Actions,
    width:250,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  },
];
