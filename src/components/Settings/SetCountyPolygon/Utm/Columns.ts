export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "UTM Easting (x)",
    accessor: "easting",
    disableFilters: true,
  },
  {
    Header: "UTM Northing (y)",
    accessor: "northing",
    disableFilters: true,
  },
  {
    Header: "Zone",
    accessor: "zone",
    disableFilters: true,
  },
  {
    Header: "عرض جغرافیایی (Lat)",
    accessor: "lat",
    disableFilters: true,
  },
  {
    Header: "طول جغرافیایی (Long)",
    accessor: "lng",
    disableFilters: true,
  },
  // {
  //   Header: "عملیات",
  //   accessor: "operations",
  //   disableFilters: true,
  //   width: 150,
  //   Cell: Actions,
  //   getProps: (props: any) => ({
  //     setShowEditModal: props.setShowEditModal,
  //     setSelectedUser: props.setSelectedUser,
  //   }),
  // },
];
