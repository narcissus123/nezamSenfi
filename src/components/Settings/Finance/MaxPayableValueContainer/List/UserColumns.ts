import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "مبلغ سهم پشتیبان ",
    accessor: "supportFee",
    disableFilters: true,
  },
  {
    Header: "درصد سهم کارشناس از کارشناسی های رد شده بعد از بازدید",
    accessor: "inspectorFeeOfRejectedInspection",
    disableFilters: true,
  },
  {
    Header: "درصد علی الحساب ",
    accessor: "interimInterest",
    disableFilters: true,
  },
  {
    Header: "درصد سهم کشور",
    accessor: "mainLocationFee",
    disableFilters: true,
  },
  {
    Header: "درصد سهم استان",
    accessor: "provinceFee",
    disableFilters: true,
  },
  {
    Header: "درصد سهم شهرستان",
    accessor: "countyFee",
    disableFilters: true,
  },
  {
    Header: "درصد سهم اتحادیه",
    accessor: "unionFee",
    disableFilters: true,
  },
  {
    Header: "از تاریخ",
    accessor: "startDateAsShamsi",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: Actions,
    disableFilters: true,
    width: 210,
  },
];
