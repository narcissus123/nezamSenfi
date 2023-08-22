import { ProductionActions } from "./ProductionActions/ProductionActions"


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام واحد",
    accessor: "title",
    disableFilters: true,
  },
    {
    Header: "کلمه اختصاری",
    accessor: "abbreviation",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell: ProductionActions,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
