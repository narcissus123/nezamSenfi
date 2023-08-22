import { Actions } from "./Actions/Actions";


export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    disableFilters: true,
    width: 70,
  },
  {
    Header: "عنوان",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "تاریخ شروع تعرفه",
    accessor: "startDateAsShamsi",
    disableFilters: true,
  },
  {
    Header: "تاریخ ورود داده توسط کاربران",
    accessor: "startDateTimeAsShamsi",
    disableFilters: true,
  },
  {
    Header: "شماره نامه",
    accessor: "letterNumber",
    disableFilters: true,
  },
  {
    Header: "تاریخ نامه",
    accessor: "letterDateAsShamsi",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
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
