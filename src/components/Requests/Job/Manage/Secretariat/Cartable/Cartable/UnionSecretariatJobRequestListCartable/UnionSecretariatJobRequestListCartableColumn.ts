import { SecretariatJobRequestsActions } from "../SecretariatJobRequestsActions";

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
    Header: "اتحادیه",
    accessor: "union",
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
    width: 200,
    Cell: SecretariatJobRequestsActions,
    getProps: (props: any) => ({
      flow: props.flow,
    }),
  },
];
