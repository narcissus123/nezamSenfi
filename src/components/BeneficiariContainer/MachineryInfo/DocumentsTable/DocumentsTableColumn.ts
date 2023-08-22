import { MachineryActions } from "./MachineryActions";


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام ماشین",
    accessor: "machineName",
    disableFilters: true,
  },
  {
    Header: "شماره پلاک",
    accessor: "plateNumber",
    disableFilters: true,
  },
  {
    Header: "شماره سریال/مدل",
    accessor: "serialNumberOrModel",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:300,
    Cell:MachineryActions ,
    getProps: (props : any) => ({setShowEditModal:props.setShowEditModal,setAllUserMachines:props.setAllUserMachines, tableData:props.tableData})
  }
];
