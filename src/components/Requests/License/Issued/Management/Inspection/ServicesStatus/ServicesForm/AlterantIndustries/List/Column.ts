import { Actions } from "./Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام ماشین آلان و تجهیزات",
    accessor: "machineryIdTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "شرکت سازنده",
    accessor: "machineManufacturerIdTitle",
    disableFilters: true,
  },
  {
    Header: "مدل ماشین و تجهیزات",
    accessor: "productionYearNumTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت مصرف انرژی ماشین آلات",
    accessor: "consumptionStatusEnum",
    disableFilters: true,
  },
  {
    Header: "وضعیت بهداشتی واحد",
    accessor: "unitHealthStatusEnumTitle",
    disableFilters: true,
  },
  {
    Header: "شماره مجوز",
    accessor: "licenseNumber",
    disableFilters: true,
  },
  {
    Header: "تاریخ صدور",
    accessor: "issueDate",
    disableFilters: true,
  },
  {
    Header: "مدت اعتبار",
    accessor: "validityDuration",
    disableFilters: true,
  },
  {
    Header: "کد بهداشتی",
    accessor: "healthCode",
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
