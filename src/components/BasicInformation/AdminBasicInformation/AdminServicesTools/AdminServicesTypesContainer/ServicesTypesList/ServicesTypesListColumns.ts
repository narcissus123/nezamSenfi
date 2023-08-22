import { ServicesTypesActions } from "./ServicesTypesActions";


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع خدمات",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell:ServicesTypesActions ,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
