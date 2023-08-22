import { HistoryAction } from "./HistoryAction/HistoryAction";

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "visitDate",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "عنوان فعالیت اقتصادی",
    accessor: "jobTitle",
    disableFilters: true,
  },
  {
    Header: "نوع کاربری",
    accessor: "useTypeTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: HistoryAction,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
