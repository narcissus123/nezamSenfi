
import { Actions } from "./Actions/Actions";
import { DescriptionCell } from "./DescriptionCell/DescriptionCell";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام صنف",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "نام استان",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "توضیحات",
    Cell: DescriptionCell,
    accessor: "provinceDescription",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 100,
    Cell: Actions,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setShowEditModal: props.setShowEditModal,
      setSelectedUser: props.setSelectedUser,
    }),
  },
];
