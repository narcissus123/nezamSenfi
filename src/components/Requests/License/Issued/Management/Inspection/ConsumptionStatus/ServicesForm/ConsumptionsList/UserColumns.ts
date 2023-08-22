import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "شغل",
    accessor: "jobTitle",
    disableFilters: true,
  },
  {
    Header: "عامل تولید",
    accessor: "productionFactorTitle",
    disableFilters: true,
  },
  {
    Header: "شماره قطعه",
    accessor: "sectionId",
    disableFilters: true,
  },
  {
    Header: "سال",
    accessor: "year",
    disableFilters: true,
  },
  {
    Header: "میزان فعالیت",
    accessor: "activityRate",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: Actions,
    disableFilters: true,
    getProps: (props: any) => ({
      setInitialValues: props.setInitialValues,
      getConsomptionTabs: props.getConsomptionTabs,
      setConsomptionTabs: props.setConsomptionTabs,
      setUseTypeId: props.setUseTypeId,
    }),
    width: 250,
  },
];
