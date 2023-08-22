import { Action } from "./Action/Action";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "اتحادیه",
    accessor: "unionTitle",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "dateTime",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "identityChangeStatusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    Cell: Action,
    width: 270,
    getProps: (props: any) => ({
      flow: props.flow,
    }),
  },
];
