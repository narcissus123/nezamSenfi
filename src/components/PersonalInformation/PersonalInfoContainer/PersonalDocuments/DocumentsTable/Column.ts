import { Actions } from "./Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع سند",
    accessor: "documentTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "شرح سند",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 250,
    Cell: Actions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
      setTableData: props.setTableData,
      setInitialValues: props.setInitialValues,
      refetch: props.refetch
    }),
  },
];
