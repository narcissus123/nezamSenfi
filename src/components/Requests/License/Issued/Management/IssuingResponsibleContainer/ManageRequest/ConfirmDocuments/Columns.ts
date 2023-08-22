import { DocumentsList } from "./DocumentsList";

export const columns = [
  {
    Header: "نوع سند",
    width: 50,
    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "عنوان",
    accessor: "actions",
    disableFilters: true,
    Cell: DocumentsList,
    width: 180,
    getProps: (props: any) => ({
      setDocumentIds: props.setDocumentIds,
    }),
  },
];
