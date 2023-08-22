import { Actions } from "./Actions/Actions"


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام دسته بندی محصول",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "کد CPC",
    accessor: "cpcCode",
    disableFilters: true,
  },
  {
    Header: "کد CPC+",
    accessor: "cpcCodePlus",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 150,
    Cell: Actions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
    }),
  },
];
