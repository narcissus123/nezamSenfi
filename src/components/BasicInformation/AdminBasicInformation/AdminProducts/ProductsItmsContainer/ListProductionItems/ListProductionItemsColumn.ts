import { ImageCell } from "./ImageCell/ImageCell";
import { ProductionItemsActions } from "./ProductionItemsActions"


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "تصویر",
    width: 50,
    accessor: "images",
    Cell : ImageCell,
    disableFilters: true,
  },
  {
    Header: "عنوان",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عنوان محصول",
    accessor: "productTitle",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
  },
  
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell: ProductionItemsActions,
    getProps: (props : any) => ({ mutation: props.mutation , setShowEditModal : props.setShowEditModal , setSelectedUser : props.setSelectedUser})
  }
];
