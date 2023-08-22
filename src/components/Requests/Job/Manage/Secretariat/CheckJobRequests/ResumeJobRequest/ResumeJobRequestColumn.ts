import { ResumeAction } from "./ResumeAction/ResumeAction";

export const columns = [
  {
    Header: "شناسه",
    width: 80,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "استان",
    accessor: "provinceTitle",
    disableFilters: true,
  },
  {
    Header: "شهرستان",
    accessor: "countyTitle",
    disableFilters: true,
  },
  {
    Header: "نوع اشتغال درخواستی",
    accessor: "positionTypeTilte",
    disableFilters: true,
  },
  {
    Header: "نام سازمان",
    accessor: "organizationTitle",
    disableFilters: true,
  },
  {
    Header: "وضعیت بیمه",
    accessor: "inSuranceStatus",
    disableFilters: true,
  },
  {
    Header: "مدت سابقه بیمه ای",
    accessor: "inSuranceDuration",
    disableFilters: true,
  },
  {
    Header: "تاریخ شروغ",
    accessor: "startDate",
    disableFilters: true,
  },
  {
    Header: "نوع ارائه خدمت",
    accessor: "positionTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: ResumeAction,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
