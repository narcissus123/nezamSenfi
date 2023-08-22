import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "قیمت - از (ریال)",
    accessor: "from1",
    disableFilters: true,
  },
  {
    Header: "قیمت - از (ریال)",
    accessor: "from2",
    disableFilters: true,
  },
  {
    Header: "حالات قیمت",
    accessor: "opratorTitle",
    disableFilters: true,
  },
  {
    Header: "قسمت مورد استفاده",
    accessor: "typeTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: Actions,
    disableFilters: true,
    width: 320,
  },
];
