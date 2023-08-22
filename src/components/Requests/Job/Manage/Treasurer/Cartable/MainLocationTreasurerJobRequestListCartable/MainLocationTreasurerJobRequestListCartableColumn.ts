import { TreasurerJobRequestsActions } from "../TreasurerJobRequestsActions/TreasurerJobRequestsActions";
import { TreasurerJobRequestsAmount } from "../TreasurerJobRequestsAmount/TreasurerJobRequestsAmount";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "positionRequestId",
    disableFilters: true,
  },
  {
    Header: "متقاضی",
    accessor: "userFullName",
    disableFilters: true,
  },
  {
    Header: "مبلغ",
    accessor: "amount",
    Cell: TreasurerJobRequestsAmount,
    disableFilters: true,
  },
  {
    Header: "تاریخ پرداخت",
    accessor: "payDate",
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
    width: 120,
    Cell: TreasurerJobRequestsActions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
