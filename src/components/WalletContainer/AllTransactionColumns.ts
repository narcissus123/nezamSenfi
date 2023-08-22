import { TransactionEvent } from "./TransactionEvent/TransactionEvent";
import { TransactionUserInfo } from "./TransactionUserInfo/TransactionUserInfo";

export const columns = [
  {
    Header: "وضعیت",
    //width: 50,
    accessor: "statusTitle",
    //Cell: TransactionEvent,
    disableFilters: true,
  },
  {
    Header: "کاربر",
    accessor: "username",
    Cell: TransactionUserInfo,
    disableFilters: true,
  },
  {
    Header: "نوع تراکنش",
    accessor: "type",
    disableFilters: true,
  },
  {
    Header: "مبلغ",
    accessor: "amount",
    disableFilters: true,
  },
  {
    Header: "بخش",
    accessor: "transactionSection",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "محل",
    accessor: "locationTitle",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "createdDateTime",
    disableFilters: true,
  },
];
