import { MachineActions } from "./MachineActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام ماشین",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "نوع ماشین",
    accessor: "typeMachineTitle",
    disableFilters: true,
  },
  {
    Header: "نوع ساخت ماشین",
    accessor: "productionTypeTitle",
    disableFilters: true,
  },
  {
    Header: "شرکت سازنده",
    accessor: "machineManufacturerTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 150,
    Cell: MachineActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
    }),
  },
];
