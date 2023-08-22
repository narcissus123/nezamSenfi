import { ListActions } from "./ListActions";

export const columns = [
  {
    Header: "شناسه",
    width: 60,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "وضعیت اشتغال",
    accessor: "employmentStatusTitle",
    width: 250,
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 150,
    Cell: ListActions,
    getProps: (props: any) => ({
      setTableData: props.setTableData,
    }),
  },
];
