import { Action } from "./Action/Action";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "اعلان از طریق اس ام اس",
    accessor: "isSmsActive",
    disableFilters: true,
  },
  {
    Header: " اعلان از طریق ایمیل",
    accessor: "isEmailActive",
    disableFilters: true,
  },
  {
    Header: "اعلان از طریق تیکت",
    accessor: "isTicketActive",
    disableFilters: true,
  },
  {
    Header: "از تاریخ",
    accessor: "startDate",
    disableFilters: true,
  },
  {
    Header: "تا تاریخ",
    accessor: "toDate",
    disableFilters: true,
  },
  {
    Header: "نام کاربری فعال کننده",
    accessor: "modifierUserName",
    disableFilters: true,
  },
  // {
  //   Header: "عملیات",
  //   accessor: "actions",
  //   disableFilters: true,
  //   Cell: Action,
  //   width: 180,
  //   getProps: (props: any) => ({
  //     flow: props.flow,
  //   }),
  // },
];
