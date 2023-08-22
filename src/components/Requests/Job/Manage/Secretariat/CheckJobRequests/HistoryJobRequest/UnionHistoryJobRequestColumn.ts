// import { SecretariatJobRequestsActions } from "../SecretariatJobRequestsActions";

import { HistoryAction } from "./HistoryAction/HistoryAction";

export const unionColumns = [
  {
    Header: "شناسه",
    width: 70,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "entityCreatedAt",
    disableFilters: true,
  },
  {
    Header: "متقاضی",
    accessor: "userNationalCode",
    disableFilters: true,
  },
  {
    Header: "شهرستان",
    accessor: "countyTilte",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
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
    width: 120,
    Cell: HistoryAction,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
