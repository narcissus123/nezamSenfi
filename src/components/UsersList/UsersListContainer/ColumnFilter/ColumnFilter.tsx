import * as React from 'react';

import Styled from "./ColumnFilter.module.scss"

export interface IPropsType {
  column:any
  setFilter?:any
}
 
const ColumnFilter: React.FC<IPropsType> = ({column}) => {
  const { filterValue, setFilter } = column
  return (  
    <>
      <input className={`${Styled["filter-input"]}`} value={filterValue || ""} onChange={(e) => setFilter(e.target.value)}/>
    </>
  );
}
 
export {ColumnFilter}