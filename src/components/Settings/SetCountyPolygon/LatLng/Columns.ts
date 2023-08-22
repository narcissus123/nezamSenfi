import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عرض جغرافیایی (Lat)",
    accessor: "lat",
    disableFilters: true,
  },
  {
    Header: "طول جغرافیایی (Long)",
    accessor: "lng",
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
      setTableData: props.setTableData,
    }),
  },
];
