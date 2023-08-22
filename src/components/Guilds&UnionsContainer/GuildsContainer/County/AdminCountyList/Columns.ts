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
    accessor: "guild",
    disableFilters: true,
    width:130
  },
  {
    Header: "نام شهرستان",
    accessor: "name",
    disableFilters: true,
    width:70
  },
  
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
    width:100
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    Cell : Actions,
    width:140,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  },
];
