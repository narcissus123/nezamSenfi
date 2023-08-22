import { DocumentListActions } from "./DocumentListActions";

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
    Header: "جزئیات",
    accessor: "description",
    disableFilters: true,
  },
  {
    Header: "عنوان سند",
    accessor: "categoryTitle",
    disableFilters: true,
  },
  {
    Header: "گروه شغلی",
    accessor: "jobCategoryEnums",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 150,
    Cell: DocumentListActions,
    getProps: (props: any) => ({
      setrefetchDocumnts: props.setrefetchDocumnts,
    }),
  },
];
