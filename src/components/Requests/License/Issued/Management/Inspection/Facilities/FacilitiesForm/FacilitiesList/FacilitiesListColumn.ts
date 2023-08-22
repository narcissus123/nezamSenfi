import { FacilitiesListActions } from "./FacilitiesListActions";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع ساختمان",
    accessor: "buildingTypeTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "مساحت کل (متر مربع)",
    accessor: "area",
    disableFilters: true,
  },
  {
    Header: "محیط",
    accessor: "perimeter",
    disableFilters: true,
  },
  {
    Header: "طول جغرافیایی",
    accessor: "centerPointX",
    disableFilters: true,
  },
  {
    Header: "عرض جغرافیایی",
    accessor: "centerPointY",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 250,
    Cell: FacilitiesListActions,
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
