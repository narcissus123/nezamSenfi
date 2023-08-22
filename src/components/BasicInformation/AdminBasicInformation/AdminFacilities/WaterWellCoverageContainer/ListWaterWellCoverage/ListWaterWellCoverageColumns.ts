import { ListWaterWellCoverageActions } from "./ListWaterWellCoverageActions"


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "کد",
    accessor: "code",
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
    width: 150,
    Cell: ListWaterWellCoverageActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
    }),
  },
];
