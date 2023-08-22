import { ColumnFilter } from "../UsersListContainer/ColumnFilter/ColumnFilter";
import { LegalUserActions } from "./LegalUserActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "نام",
    accessor: "name",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "کد اقتصادی",
    accessor: "economicCode",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "نوع شرکت",
    accessor: "companyTypeTitle",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "شناسه ملی",
    accessor: "nationalId",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "موقعیت مکانی",
    accessor: "locationTitle",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "ایمیل",
    accessor: "email",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Filter: ColumnFilter,
    Cell: LegalUserActions,
    disableFilters: true,
  },
];
