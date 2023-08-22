import { GuildUserActions } from "../GuildUserActions/GuildUserActions";
import { RolesCell } from "../RolesCell/RolesCell";


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نام",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "کد ملی",
    accessor: "userNationalCode",
    disableFilters: true,
  },
  {
    Header: "نقش",
    accessor: "role",
    disableFilters: true,
    Cell : RolesCell
  },
  {
    Header: "عملیات",
    accessor: "actions",
    Cell: GuildUserActions,
    disableFilters: true,
    width: 250,
    getProps: (props: any) => ({ setTableData: props.setTableData , AllServiceState : props.AllServiceState , noChangeAllServiceState : props.noChangeAllServiceState  }),
  },
];
