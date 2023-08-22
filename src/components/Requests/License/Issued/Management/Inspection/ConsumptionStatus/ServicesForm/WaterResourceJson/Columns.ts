import { Action } from "./Action";

export const columns = [
  {
    Header: "منبع تامین",
    accessor: "waterSupplyCenter.label",
    disableFilters: true,
  },

  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    Cell: Action,
    getProps: (props: any) => ({
      setTableData: props.setTableData,
      setListInitialValue: props.setListInitialValue,
      isExpert: props.isExpert,
    }),
  },
];
