import { ImageCell } from "./ImageCell/ImageCell";
import { ProductionActions } from "./ProductionActions";

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
    Cell: ImageCell,
    disableFilters: true,
  },
  {
    Header: "نام محصول",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "کد زیرکلاس",
    accessor: "productCode",
    disableFilters: true,
  },
  {
    Header: "کد محصول",
    accessor: "concatedCode",
    disableFilters: true,
  },
  {
    Header: "واحد",
    accessor: "productUnitTitle",
    disableFilters: true,
  },
  {
    Header: "نام دسته بندی محصول",
    accessor: "productCategoryTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 360,
    Cell: ProductionActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
    }),
  },
];
