import { Actions } from "./Actions/Actions";


export const columns = [
  {
    Header: "نوع پرداختی",
    accessor: "payableValueTypeTitle",
    disableFilters: true,
  },
  {
    Header: "گروه شغلی",
    accessor: "jobCategoryTitle",
    disableFilters: true,
  },
  {
    Header: "سقف مبلغ / درصد",
    accessor: "value",
    disableFilters: true,
  },
  {
    Header: "شماره نامه تعرفه",
    accessor: "tariffLetterNumber",
    disableFilters: true,
  },
  {
    Header: "تاریخ شروع ردیف مالی",
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
