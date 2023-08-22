import { ManagerJobRequestsActions } from "../ManagerJobRequestsActions";

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
    Header: "شهرستان",
    accessor: "county",
    disableFilters: true,
    width: 70,
  },
  {
    Header: "تاریخ ایجاد",
    accessor: "createDate",
    disableFilters: true,
    width: 70,
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
    width: 200,
    Cell: ManagerJobRequestsActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
