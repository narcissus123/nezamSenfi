import { HistoryAction } from "./HistoryAction";

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام اتاق",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "entityCreatedAt",
    disableFilters: true,
  },
  {
    Header: "کد اقتصادی",
    accessor: "economicCode",
    disableFilters: true,
    width:180
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
    width: 220,
    Cell: HistoryAction,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
