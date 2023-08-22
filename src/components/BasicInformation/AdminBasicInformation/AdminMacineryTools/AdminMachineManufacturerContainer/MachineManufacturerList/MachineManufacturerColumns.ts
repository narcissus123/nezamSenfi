import { MachineManufacturerActions } from "./MachineManufacturerActions/MachineManufacturerActions";


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام شرکت سازنده",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell:MachineManufacturerActions ,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
