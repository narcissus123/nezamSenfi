

export const columns = [
  {
    Header: "شناسه",
    accessor: "inspectionTableTypeLandArea",
    disableFilters: true,
    width: 70,
  },
  {
    Header: "مبلغ مبنا",
    accessor: "baseLandAmount",
    disableFilters: true,
    width: 320,
  },
  {
    Header: "تاریخ شروع",
    accessor: "startDateTimeAsShamsi",
    disableFilters: true,
    width: 320,
  },
  {
    Header: "درصد تعرفه هر قطعه اضافی",
    accessor: "extraLandTariffPercentage",
    disableFilters: true,
    width: 320,
  },
  {
    Header: "درصد مبنا محاسبه تعرفه",
    accessor: "baseLandTariffPercentage",
    disableFilters: true,
    width: 320,
  },
  {
    Header: "بازه مساحت",
    accessor: "landAreaModelTitle",
    disableFilters: true,
    width: 320,
  },
  // {
  //   Header: "عملیات",
  //   accessor: "actions",
  //   Cell: Actions,
  //   disableFilters: true,
  //   width: 320,
  // },
];
