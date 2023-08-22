import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عنوان دسته بندی",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "وضعیت دسته بندی",
    accessor: "isActive",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 150,
    Cell: Actions,
  },
];
