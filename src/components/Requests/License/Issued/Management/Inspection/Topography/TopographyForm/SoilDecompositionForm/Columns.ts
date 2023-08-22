import { Action } from "./Action";

export const columns = [
  {
    Header: "عمق نمونه گیری",
    //width: 50,
    accessor: "depthOfSampling",
    disableFilters: true,
  },

  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    Cell: Action,
    width: 220,
    getProps: (props: any) => ({
      setSoilDecompositionList: props.setSoilDecompositionList,
      setInitialValue: props.setInitialValue,
      disabled: props.disabled,
    }),
  },
];
