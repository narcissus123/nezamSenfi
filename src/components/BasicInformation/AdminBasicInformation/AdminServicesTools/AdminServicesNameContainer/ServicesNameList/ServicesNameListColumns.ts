import { ServicesNameActions } from "./ServicesNameActions";


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع خدمات",
    accessor: "agriculturalToolTypeTitle",
    disableFilters: true,
  },  
  {
    Header: "نام خدمات",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell:ServicesNameActions ,
    getProps: (props : any) => ({ mutation: props.mutation,filterState:props.filterState ,setListData:props.setListData, setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
