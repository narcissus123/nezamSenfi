import { Action } from "./Action";

export const columns = [
  {
    Header: "نام کود",
    accessor: "nameOfFertilizerEnum.label",
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
      setIsEditing: props.setIsEditing,
      setEditingAmount: props.setEditingAmount,
      isExpert: props.isExpert,
    }),
  },
];
