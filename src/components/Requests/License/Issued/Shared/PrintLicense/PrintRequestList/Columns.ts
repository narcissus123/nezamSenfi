// import { Action } from "./Action";;

import { SectionCell } from "./SectionCell/SectionCell";

export const columns = [
  {
    Header: "ردیف",
    accessor: "id",
    width: 60,
    disableFilters: true,
  },
  {
    Header: "عنوان قطعه",
    accessor: "farmName",
    width: 120,
    disableFilters: true,
  },
  {
    Header: "گزارش",
    accessor: "roundedArea",
    width: 400,
    disableFilters: true,
    Cell: SectionCell,
    getProps: (props: any) => ({ reqId: props.reqId, isSecretariat: props.isSecretariat }),
  },
];
