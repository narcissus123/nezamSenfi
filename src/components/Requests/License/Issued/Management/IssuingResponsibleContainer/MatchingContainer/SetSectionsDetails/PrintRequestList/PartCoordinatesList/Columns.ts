// import { Action } from "./Action";;

// import { SectionCell } from "./SectionCell/SectionCell";

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    width: 60,
    disableFilters: true,
  },
  {
    Header: "طول",
    accessor: "lat",
    // width: 120,
    disableFilters: true,
  },
  {
    Header: "عرض",
    accessor: "lng",
    // width: 400,
    disableFilters: true,
    // Cell: SectionCell,
  },
  {
    Header: "UTM",
    accessor: "utm",
    // width: 400,
    disableFilters: true,
    // Cell: SectionCell,
  },
  {
    Header: "فاصله",
    accessor: "distance",
    // width: 400,
    disableFilters: true,
    // Cell: SectionCell,
  },
];
