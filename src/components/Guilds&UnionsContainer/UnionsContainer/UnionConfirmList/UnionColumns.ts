import { UnionActions } from "./UnionActions/UnionActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "شناسه اتحادیه",
    width: 50,
    accessor: "unionId",
    disableFilters: true,
  },
  {
    Header: "نام اتحادیه",
    accessor: "unionTitle",
    disableFilters: true,
  },
  {
    Header: "شهرستان اتحادیه",
    accessor: "contyTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: UnionActions,
    disableFilters: true,
    getProps: (props: any) => ({
      reloadData: props.reloadData,
      dataObj: props.dataObj,
      setInitialPage: props.setInitialPage,
    }),
  },
];
