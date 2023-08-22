import { Actions } from "./Actions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "دسته بندی شغل",
    accessor: "jobCategoryTypeTitle",
    disableFilters: true,
  },
  {
    Header: "اسناد ساختمانی",
    accessor: "buildingDocumentStatusTitle",
    disableFilters: true,
  },
  {
    Header: "اسناد تاسیسات",
    accessor: "facilitiesDocumentStatusTitle",
    disableFilters: true,
  },
  {
    Header: "اسناد چاه",
    accessor: "wellDocumentStatusTitle",
    disableFilters: true,
  },

  {
    Header: "اسناد مجوزات فعالیت",
    accessor: "activityLicenseDocumentStatusTitle",
    disableFilters: true,
  },
  {
    Header: "اسناد مالکیتی",
    accessor: "owenerShipDocumentStatusTitle",
    disableFilters: true,
  },
  // {
  //   Header: "عنوان شغل",
  //   accessor: "jobTitle",
  //   disableFilters: true,
  // },
  // {
  //   Header: "عملیات",
  //   accessor: "operations",
  //   disableFilters: true,
  //   width: 220,
  //   Cell: Actions,
  //   getProps: (props: any) => ({
  //     setUnUsedDoc: props.setUnUsedDoc,
  //     setTableData: props.setTableData,
  //   }),
  // },
];
