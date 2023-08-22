import React, { useEffect, useState } from "react";
import { columns } from "./Columns";

import { usePostGetAllMyTicketFilter } from "../../../../core/services/api";
import { ListTable } from "../../../common/ListTable/ListTable";
import { ITicketList } from "../../../../core/models";

const TicketList = () => {

  const [state, setState] = useState<Array<ITicketList>>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);
  const [initialPage, setInitialPage] = useState(0);


  const getTicketsMutation = usePostGetAllMyTicketFilter()

  useEffect(() => {
    getTicketsMutation.mutate({ page: 1, pageSize: pageSize });
  }, [ pageSize]);

  useEffect(() => {
    if (
      getTicketsMutation.data &&
      getTicketsMutation.data.data.result
    ) {
      let newState: any = [];
      
      
       getTicketsMutation.data.data.result.items.forEach(
         (row: any) => {
           newState.push({
             id: row.id,
             createAt: row.createAt,
             isRead: row.isRead,
             text: row.text,
           });
         }
       );
      setState(newState);
      setPageCount(
        Math.ceil(
          getTicketsMutation.data.data.result.totalCount / pageSize
        )
      );
    }
  }, [getTicketsMutation.isSuccess]);

  return (
    <>
      <ListTable
        columns={columns}
        isLoading={getTicketsMutation.isLoading}
        onPageChange={({ page, pageSize }) => {
          getTicketsMutation.mutate({ page: page, pageSize: pageSize });
        }}
        tableData={state}
        pageCountList={pageCountList}
        customPageSize={pageSize}
        setPageSize={(val: any) => setPageSize(val)}
        setInitialPage={setInitialPage}
      >
        {{
          headerTable: <div style={{ width: "200px" }}></div>,
        }}
      </ListTable>
    </>
  );
};

export { TicketList };
