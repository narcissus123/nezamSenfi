import { DocumentsList } from "./DocumentsList";
import { User } from "./User";

export const columns = [
  {
    Header: "آیدی درخواست",
    width: 50,
    accessor: "licenseRequestId",
    disableFilters: true,
  },
  {
    Header: "نام",
    width: 70,
    accessor: "name",
    Cell: User,
    disableFilters: true,
  },
  {
    Header: "کد ملی",
    width: 70,
    accessor: "nationalCode",
    disableFilters: true,
  },
  {
    Header: "وضعیت",
    accessor: "actions",
    disableFilters: true,
    Cell: DocumentsList,
    width: 180,
    getProps: (props: any) => ({
      setIntersectId: props.setIntersectId,
    }),
  },
];
