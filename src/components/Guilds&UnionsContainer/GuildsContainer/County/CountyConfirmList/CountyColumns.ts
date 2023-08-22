import { CountyActions } from "./CountyActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام صنف",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "شهرستان",
    accessor: "countyTitle",
    disableFilters: true,
  },
  {
    Header: "توضیحات صنف",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: CountyActions,
    disableFilters: true,
    getProps: (props: any) => ({
      reloadData: props.reloadData,
      unionConfirmFilter: props.unionConfirmFilter,
      setInitialPage: props.setInitialPage,
    }),
  },
];
