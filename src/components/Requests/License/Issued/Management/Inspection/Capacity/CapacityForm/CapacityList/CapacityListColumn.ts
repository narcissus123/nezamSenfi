import { CapacityListActions } from "./CapacityListActions";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عامل تولید",
    accessor: "productionFactorIdTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "رقم محصول اصلی",
    accessor: "figureIdTitle",
    disableFilters: true,
  },
  {
    Header: "میزان فعالیت",
    accessor: "activityRate",
    disableFilters: true,
  },
  {
    Header: "تولید به ازای واحد فعالیت در سال",
    accessor: "productionUniPerYear",
    disableFilters: true,
  },
  {
    Header: "تعداد دوره در سال",
    accessor: "periodInYearEnumTitle",
    disableFilters: true,
  },
  {
    Header: "سال تولید",
    accessor: "productionYearNum",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 250,
    Cell: CapacityListActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
      setTableData: props.setTableData,
      setInitialValues: props.setInitialValues,
      setIsInEditMode: props.setIsInEditMode,
      setEditRowID: props.setEditRowID,
      isExpert: props.isExpert,
    }),
  },
];
