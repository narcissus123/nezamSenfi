import { Actions } from "./Actions/Actions";

export const EditColumns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام سازمان",
    accessor: "companyName",
    disableFilters: true,
  },
  {
    Header: "استان",
    accessor: "province",
    disableFilters: true,
  },
  {
    Header: "شهرستان",
    accessor: "county",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 150,
    Cell: Actions,
    getProps: (props: any) => ({
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
    }),
  },
];
