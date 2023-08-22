import { Actions } from "./Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "وضعیت رتبه",
    accessor: "ratingStatusEnumTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "وضعیت پروانه اشتغال",
    accessor: "employmentLicenseStatusEnumTitle",
    disableFilters: true,
  },
  {
    Header: "نوع خدمات قابل ارائه",
    accessor: "serviceTypeTitle",
    disableFilters: true,
  },
  {
    Header: "زمینه ارائه خدمات",
    accessor: "useTypeIdTitle",
    disableFilters: true,
  },
  {
    Header: "ابزار های تحت اختیار",
    accessor: "ownToolsTitle",
    disableFilters: true,
  },
  {
    Header: "تسلط نرم افزاری",
    accessor: "softwareSkilsTitle",
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
      setEditRowID: props.setEditRowID,
      setIsInEditMode: props.setIsInEditMode,
      isExpert: props.isExpert,
    }),
  },
];
