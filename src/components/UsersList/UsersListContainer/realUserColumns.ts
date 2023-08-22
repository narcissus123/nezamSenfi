import { ColumnFilter } from "./ColumnFilter/ColumnFilter";
import {RealUserListActions} from "./RealUserActions/RealUserActions"
export const columns = [
  {
    Header: 'شناسه',
    width: 50,
    accessor: "id",
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'نام',
    accessor: 'name',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'نام خانوادگی',
    accessor: 'lastName',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'کد ملی',
    accessor: 'nationalCode',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'موقعیت مکانی',
    accessor: 'locationTitle',
    Filter: ColumnFilter,
    disableFilters: true
  },    
  {
    Header: 'ایمیل',
    accessor: 'email',
    Filter: ColumnFilter,
    disableFilters: true
  }, 
  {
    Header: 'عملیات',
    accessor: 'actions',
    Filter: ColumnFilter,
    Cell:RealUserListActions,
    disableFilters: true,
    disableResizing: true
  },
           
]
