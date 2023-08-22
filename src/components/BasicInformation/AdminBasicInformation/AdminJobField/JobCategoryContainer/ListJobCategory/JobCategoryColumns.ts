import { JobCategoryActions } from "./JobCategoryActions";

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
    Header: "کد",
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
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 150,
    Cell: JobCategoryActions,
    getProps: (props: any) => ({
      refetch: props.refetch,
    }),
  },
];
