import { Actions } from "./Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "وضعیت امکانات حمل و نقل",
    accessor: "transportationStatusEnumTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "وضعیت لوازم و تجهیزات بسته بندی اولیه",
    accessor: "packingStatusEnumTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت نیروی انسانی تحت مدیریت",
    accessor: "manPowerStatusEnumTitle",
    disableFilters: true,
  },
  {
    Header: "تعداد نیروی انسانی کارگری موقت",
    accessor: "temporaryManPower",
    disableFilters: true,
  },
  {
    Header: "تعداد نیروی انسانی کارگری دائم",
    accessor: "permanentManpower",
    disableFilters: true,
  },
  {
    Header: "تعداد نیروی انسانی متخصص دائم",
    accessor: "permanentExpertManpower",
    disableFilters: true,
  },
  {
    Header: "تعداد نیروی انسانی متخصص موقت",
    accessor: "temporaryExpertManPower",
    disableFilters: true,
  },
  {
    Header: "وضعیت نام تجاری و برند",
    accessor: "brandStatusEnumTitle",
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
