import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { IOrganization } from '../../../../core/models';
import { usePostGetAllOrganizationByFilter } from '../../../../core/services/api';
import { refetchContext } from '../../../../core/utils/context/EventContext';
import { ListTable } from '../../../common/ListTable/ListTable';
import { columns } from './Columns';

export interface PersonalInfoProps {
  
}
 
const OrganizationList: React.FC<PersonalInfoProps> = () => {
  
  const [state, setState] = useState<Array<IOrganization>>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);
  const [initialPage, setInitialPage] = useState(0);

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const getMutation = usePostGetAllOrganizationByFilter()

   useEffect(() => {
     getMutation.mutate({ page: 1, pageSize: pageSize , title:""});
   }, [pageSize, refetchEvent.organizationList]);

 useEffect(() => {
   if (getMutation.data && getMutation.data.data.result) {
     let newState: any = [];

     getMutation.data.data.result.items.forEach((row: any) => {
       newState.push({
         id: row.id,
         title: row.title,
         description: row.description,
       });
     });
     setState(newState);
     setPageCount(
       Math.ceil(getMutation.data.data.result.totalCount / pageSize)
     );
   }
 }, [getMutation.isSuccess]);

  return (
    <>
      <ListTable
        columns={columns}
        isLoading={getMutation.isLoading}
        onPageChange={({ page, pageSize }) => {
          getMutation.mutate({ page: page, pageSize: pageSize , title:"" });
        }}
        tableData={state}
        pageCountList={pageCountList}
        customPageSize={pageSize}
        setPageSize={(val: any) => setPageSize(val)}
        setInitialPage={setInitialPage}
      >
        {{
          headerTable: <div></div>,
        }}
      </ListTable>
    </>
  );
}
 
export {OrganizationList};