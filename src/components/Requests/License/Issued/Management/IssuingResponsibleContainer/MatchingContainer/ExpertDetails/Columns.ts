import { Action } from "./Action";
import { IntersectUserName } from "./IntersectUserName";
import { SectionsDetails } from "./SectionsDetails";

export const columns = [
  {
    Header: "نام",
    accessor: "fullName",
    width: 70,
    Cell: IntersectUserName,
    disableFilters: true,
  },
  {
    Header: "کد ملی",
    accessor: "nationalCode",
    width: 70,
    disableFilters: true,
  },
  {
    Header: "مشخصات همپوشانی",
    accessor: "sections",
    // width: 220,
    Cell: SectionsDetails,
    disableFilters: true,
  },
  // {
  //   Header: "عملیات",
  //   accessor: "actions",
  //   disableFilters: true,
  //   width: 100,
  //   Cell: Action,
  // },
];
