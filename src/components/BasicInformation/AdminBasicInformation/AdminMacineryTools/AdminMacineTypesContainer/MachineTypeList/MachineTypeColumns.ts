import { MachineTypeActions } from "./MachineTypeActions/MachineTypeActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع ماشین",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell:MachineTypeActions ,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
