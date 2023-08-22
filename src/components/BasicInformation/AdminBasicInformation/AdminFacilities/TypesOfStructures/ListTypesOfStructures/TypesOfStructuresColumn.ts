import { TypesOfStructuresActions } from "./TypesOfStructuresActions"


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "کد",
    accessor: "code",
    disableFilters: true,
  },
  {
    Header: "وضعیت فعال بودن",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell: TypesOfStructuresActions,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
