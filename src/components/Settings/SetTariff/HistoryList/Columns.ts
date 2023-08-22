import { Actions } from "./Actions/Actions";
import { DeleteAction } from "./DeleteAction/DeleteAction";

export const columns = [
  {
    Header: "نام",
    // width: 50,
    accessor: "actions",
    Cell: Actions,
    disableFilters: true,
  },
  {
    Header: "نام کاربری",
    // width: 50,
    accessor: "createdByUsername",
    disableFilters: true,
  },
  {
    Header: "مبلغ",
    accessor: "rate",
    disableFilters: true,
  },
  {
    Header: "تاریخ ایجاد",
    accessor: "createdAt",
    disableFilters: true,
  },
  {
    Header: "تاریخ شروع",
    accessor: "startDate",
    disableFilters: true,
  },
  {
    Header: "تاریخ پایان",
    accessor: "endDate",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "deleteActions",
    Cell: DeleteAction,
    disableFilters: true,
    getProps: (props: any) => ({
      deleteMutation: props.deleteMutation,
      setRefetch: props.setRefetch
    }),
    width: 180,
  },
];
