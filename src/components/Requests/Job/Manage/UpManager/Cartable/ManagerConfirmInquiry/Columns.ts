
import { Actions } from "./Actions/Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عنوان استعلام",
    accessor: "inquiryTitle",
    disableFilters: true,
  },
  {
    Header: "عنوان نامه",
    accessor: "letterTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 100,
    Cell: Actions,
    getProps: (props: any) => ({
      status: props.status,
      from : props.from,
      secretariatId : props.secretariatId
    }),
  },
];
