

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    disableFilters: true,
    width: 70,
  },
  {
    Header: "نوع پرداختی",
    accessor: "payableValueTypeTitle",
    disableFilters: true,
  },
  {
    Header: "نقش",
    accessor: "roleTitle",
    disableFilters: true,
  },
  {
    Header: "لحاظ در تسهیم",
    accessor: "inSharingTitle",
    disableFilters: true,
  },
  {
    Header: "شماره نامه تعرفه",
    accessor: "tariffLetterNumber",
    disableFilters: true,
  },

  // {
  //   Header: "عملیات",
  //   accessor: "actions",
  //   Cell: Actions,
  //   disableFilters: true,
  //   width: 320,
  // },
];
