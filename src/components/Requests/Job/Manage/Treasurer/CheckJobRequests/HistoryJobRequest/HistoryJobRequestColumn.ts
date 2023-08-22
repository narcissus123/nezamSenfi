// import { SecretariatJobRequestsActions } from "../SecretariatJobRequestsActions";

export const columns = [
  {
    Header: "شناسه",
    width: 70,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "createdAt",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "statusTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت پروانه اشتغال",
    accessor: "employmentLicenseStatus",
    disableFilters: true,
  },
  {
    Header: "وضعیت رتبه",
    accessor: "ratingStatus",
    disableFilters: true,
  },
  // {
  //   Header: "عملیات",
  //   accessor: "operations",
  //   disableFilters: true,
  //   width: 120,
  //   Cell: SecretariatJobRequestsActions,
  //   getProps: (props: any) => ({
  //     mutation: props.mutation,
  //     setInitialPage: props.setInitialPage,
  //   }),
  // },
];
