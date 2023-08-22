import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عنوان درخت",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عنوان دسته بندی درخت",
    accessor: "baseTreeCategoryTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
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
