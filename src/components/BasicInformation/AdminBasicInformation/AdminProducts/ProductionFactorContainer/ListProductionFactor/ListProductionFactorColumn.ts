import { ProductionFactorActions } from "./ProductionFactorActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عنوان عامل تولید",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "کد عامل تولید",
    accessor: "code",
    disableFilters: true,
  },
  {
    Header: "شغل",
    accessor: "jobTitle",
    disableFilters: true,
  },
  {
    Header: "واحد",
    accessor: "activityMeasurementUnitTtile",
    disableFilters: true,
  },
  {
    Header: "امکان تکرار",
    accessor: "possibilityOfRepetitionTitle",
    disableFilters: true,
  },
  {
    Header: "نوع وابستگی",
    accessor: "typeOfDependenceTitle",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
    width: 300,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 440,
    Cell: ProductionFactorActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
    }),
  },
];
