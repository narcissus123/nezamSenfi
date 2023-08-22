import { UnionActions } from "./UnionActions/UnionActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام اتحادیه",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: UnionActions,
    disableFilters: true,
    getProps: (props: any) => ({
      reloadData: props.reloadData,
      dataReload: props.obj,
      setInitialPage: props.setInitialPage,
    }),
  },
];
