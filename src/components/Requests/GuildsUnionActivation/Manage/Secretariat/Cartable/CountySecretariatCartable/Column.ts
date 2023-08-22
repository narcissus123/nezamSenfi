import { SecretariatAction } from "../SecretariatAction/SecretariatAction";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "شهرستان",
    accessor: "countyTitle",
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
    Cell: SecretariatAction,
    getProps: (props: any) => ({
      flow: props.flow,
    }),
  },
];
