import { ManagerAction } from "../ManagerAction/ManagerAction";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "استان",
    accessor: "provinceTitle",
    disableFilters: true,
  },
  {
    Header: "نام صنف",
    accessor: "name",
    disableFilters: true,
  },

  {
    Header: "شناسه ملی",
    accessor: "nationalId",
    disableFilters: true,
  },

  {
    Header: "وضعیت",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: ManagerAction,
    getProps: (props: any) => ({
      flow: props.flow,
    }),
  },
];
