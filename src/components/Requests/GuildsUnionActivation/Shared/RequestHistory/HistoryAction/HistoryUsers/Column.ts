import { RolesCell } from "./RolesCell/RolesCell";

export const columns = [
  {
    Header: "شناسه",
    accessor: "userInfoId",
    disableFilters: true,
  },
  {
    Header: "نام",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "نام خانوادگی",
    accessor: "lastName",
    disableFilters: true,
  },
  {
    Header: "کد ملی",
    accessor: "nationalCode",
    disableFilters: true,
  },
  {
    Header: "نقش",
    accessor: "posts",
    disableFilters: true,
    Cell: RolesCell,
  },
];
