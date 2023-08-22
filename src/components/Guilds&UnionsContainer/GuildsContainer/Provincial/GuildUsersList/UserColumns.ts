import { GuildUserActions } from "./GuildUserActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "کد ملی",
    accessor: "userNationalCode",
    disableFilters: true,
  },
  {
    Header: "نقش",
    accessor: "role",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: GuildUserActions,
    disableFilters: true,
    width:250,
    getProps: (props : any) => ({isAdmin : props.isAdmin})
  },
];
