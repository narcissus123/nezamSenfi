import { Action } from "./Action";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع",
    accessor: "boundaryTypeId.label",
    disableFilters: true,
  },
  {
    Header: "نام مالک",
    accessor: "ownerName",
    disableFilters: true,
  },
  {
    Header: "فاصله(متر)",
    accessor: "distance",
    disableFilters: true,
  },
  {
    Header: "جهت جغرافیایی",
    accessor: "geographicalDirection.label",
    disableFilters: true,
  },
  {
    Header: "طول جغرافیایی",
    accessor: "y",
    disableFilters: true,
  },
  {
    Header: "عرض جغرافیایی",
    accessor: "x",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    Cell: Action,
    width: 220,
    getProps: (props: any) => ({
      setDistancesBoundariesList: props.setDistancesBoundariesList,
      setInitialValues: props.setInitialValues,
      isExpert: props.isExpert,
    }),
  },
];
