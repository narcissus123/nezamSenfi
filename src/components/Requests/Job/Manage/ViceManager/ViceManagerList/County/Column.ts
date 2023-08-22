import { Actions } from "../Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "شناسه متقاضی",
    accessor: "userFullName",
    disableFilters: true,
  },
  {
    Header: "شهرستان",
    accessor: "county",
    disableFilters: true,
    width: 90,
  },
  {
    Header: "تاریخ ایجاد",
    accessor: "createDate",
    disableFilters: true,
    width: 80,
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
