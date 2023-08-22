import { ListActions } from "./ListActions";

export const columns = [
  {
    Header: "شناسه",
    width: 60,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام ماشین",
    accessor: "machineName",
    disableFilters: true,
  },
  {
    Header: "شماره پلاک",
    accessor: "plateNumber",
    disableFilters: true,
  },
  {
    Header: "شماره سریال/مدل",
    accessor: "serialNumberOrModel",
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
