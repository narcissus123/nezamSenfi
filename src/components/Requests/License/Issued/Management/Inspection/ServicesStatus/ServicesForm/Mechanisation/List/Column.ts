import { Actions } from "./Actions";
import { UsersCell } from "./UsersCell/UsersCell";

export const columns = [
  {
    Header: "شناسه",
    width: 90,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام ماشین",
    accessor: "machineryIdTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "نام ادوات و خدمات",
    accessor: "agriculturalToolsAndServicesIdTitle",
    disableFilters: true,
  },
  {
    Header: "تعداد ادوات و خدمات",
    accessor: "agriculturalToolsAndServicesNumber",
    disableFilters: true,
  },
  // {
  //   Header: "نام کشاورزان خدمات گیرنده",
  //   accessor: "usersIds",
  //   disableFilters: true,
  //   Cell: UsersCell,
  // },
  {
    Header: "موقعیت",
    accessor: "cityOrVillageIdTitle",
    disableFilters: true,
  },
  {
    Header: "مدت روز های اقامت در مهاجرت",
    accessor: "daysOfTarriance",
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
      setClientNamesList: props.setClientNamesList,
      onClientAddClick: props.onClientAddClick,
      setNoClientNamesList: props.setNoClientNamesList,
    }),
  },
];
