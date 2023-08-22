import { TreesListActions } from "./TreesListActions";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع درختان",
    accessor: "treeTypeEnumTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "عامل تولید",
    accessor: "productionFactorTitle",
    disableFilters: true,
  },
  {
    Header: "پایه نهال",
    accessor: "seedlingBaseEnumTitle",
    disableFilters: true,
  },
  {
    Header: "مرکز تهیه",
    accessor: "seedlingPreparationCenterIdTitle",
    disableFilters: true,
  },
  {
    Header: "سطح زیر کشت (متر مربع)",
    accessor: "cultivatedArea",
    disableFilters: true,
  },
  {
    Header: "سن درختان",
    accessor: "ageOfTreesEnumTitle",
    disableFilters: true,
  },

  {
    Header: "طول درخت",
    accessor: "treeDimensionsLength",
    disableFilters: true,
  },
  {
    Header: "عرض درخت",
    accessor: "treeDimensionsWidth",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 250,
    Cell: TreesListActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
      setTableData: props.setTableData,
      setInitialValues: props.setInitialValues,
      setEditRowID: props.setEditRowID,
      setIsInEditMode: props.setIsInEditMode,
      isExpert: props.isExpert,
    }),
  },
];
