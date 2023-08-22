import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { columns } from "./Column";

interface IPropTypes {
  getHistoriesMutation: any;
  isOpen?: boolean;
}

const RequestHistory: FC<IPropTypes> = ({
  getHistoriesMutation,
  isOpen = true,
}) => {
  const [tableData, setTableData] = useState<any>([]);

  const [pageSize, setPageSize] = useState(8);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);
  const { req_id, id }: any = useParams();

  const getHistories = getHistoriesMutation();

  useEffect(() => {
    if (isOpen)
      getHistories.mutate({
        page: 1,
        pageSize: 10,
        requestId: +req_id ? +req_id : +id,
      });
  }, [isOpen]);

  useEffect(() => {
    if (getHistories.data && getHistories.data.data) {
      try {
        const result = getHistories.data.data.result.items;
        //console.log(result);

        setTableData(result);
        setPageCount(
          Math.ceil(getHistories.data.data.result.totalCount / pageSize)
        );
      } catch (error) {}
    }
  }, [getHistories.isSuccess]);

  return (
    <ListTable
      columns={columns}
      isLoading={getHistories.isLoading}
      onPageChange={({ page, pageSize }) => {
        const serachObject: any = {
          page: page,
          pageSize: pageSize,
          requestId: +req_id ? +req_id : +id,
        };
        getHistories.mutate(serachObject);
      }}
      tableData={tableData}
      pageCountList={pageCountList}
      customPageSize={pageSize}
      setInitialPage={setInitialPage}
      setPageSize={setPageSize}
    >
      {{ headerTable: <p></p> }}
    </ListTable>
  );
};

export { RequestHistory };
