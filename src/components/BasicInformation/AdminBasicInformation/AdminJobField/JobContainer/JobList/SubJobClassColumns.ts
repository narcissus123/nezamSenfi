import { JobSubClassActions } from "./JobSubClassActions/JobSubClassActions";

export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "عنوان",
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "کد آیسیک",
    accessor: "concatedCode",
    disableFilters: true,
  },
  {
    Header: "کد عنوان فعالیت",
    accessor: "code",
    disableFilters: true,
  },
  {
    Header: "بخش",
    accessor: "jobSectionTitle",
    disableFilters: true,
  },
  {
    Header: "قسمت",
    accessor: "jobSubSectionTitle",
    disableFilters: true,
  },
  {
    Header: "گروه",
    accessor: "jobCategoryTitle",
    disableFilters: true,
  },
  {
    Header: "طبقه",
    accessor: "jobClassTitle",
    disableFilters: true,
  },
  {
    Header: "زیر طبقه",
    accessor: "jobSubClassTitle",
    disableFilters: true,
  },
  {
    Header: "نوع کاربری",
    accessor: "useTypeTitle",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 320,
    Cell: JobSubClassActions,
    getProps: (props: any) => ({
      refetch: props.refetch,
    }),
  },
];
