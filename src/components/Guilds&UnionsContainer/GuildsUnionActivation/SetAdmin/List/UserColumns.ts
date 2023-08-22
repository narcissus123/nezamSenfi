import { Actions } from "./Actions/Actions";

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
    Header: "ایمیل",
    accessor: "email",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: Actions,
    disableFilters: true,
    width: 250,
    getProps: (props: any) => ({ isAdminMainLocation: props.isAdminMainLocation , removeAdminMutation : props.removeAdminMutation , isAdminProvince : props.isAdminProvince , isAdminCounty : props.isAdminCounty }),
  },
];
