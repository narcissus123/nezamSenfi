import { ProgressAnimated } from "./ProgressAnimated";
import { Action } from "./Action";

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    width: 90,
    disableFilters: true,
  },
  {
    Header: "نام مزرعه",
    accessor: "farmName",
    disableFilters: true,
  },
  {
    Header: "مساحت (متر مربع)",
    accessor: "roundedArea",
    width: 210,
    disableFilters: true,
  },
  {
    Header: "محیط (متر)",
    accessor: "roundedPerimeter",
    width: 210,
    disableFilters: true,
  },
  {
    Header: "مختصات مرکز(عرض)",
    accessor: "centerX",
    width: 180,
    disableFilters: true,
  },
  {
    Header: "مختصات مرکز(طول)",
    accessor: "centerY",
    width: 180,
    disableFilters: true,
  },
  {
    Header: "پیشرفت ثبت اطلاعات",
    accessor: "progressBar",
    width: 220,
    Cell: ProgressAnimated,
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "actions",
    disableFilters: true,
    width:350,
    Cell: Action,
    getProps: (props: any) => ({
      status: props.status,
      rejectStatus: props.rejectStatus,
      setSectionIds: props.setSectionIds
    }),
  },
];
