import { SeedlingPreparationCenterContainerActions } from "./SeedlingPreparationCenterContainerActions"

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام نهال / بذر",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "کد نهال / بذر",
    accessor: "code",
    disableFilters: true,
  },
  {
    Header: "وضعیت فعال بودن",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true, 
    width:150,
    Cell: SeedlingPreparationCenterContainerActions,
  }
];
