import { Actions } from "../Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "متقاضی",
    accessor: "userFullName",
    disableFilters: true,
  },
  {
    Header: "استان",
    accessor: "province",
    disableFilters: true,
  },
  {
    Header: "تاریخ ایجاد",
    accessor: "createDate",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: Actions,
    getProps: (props: any) => ({
      flow: props.flow,
    }),
  },
];
