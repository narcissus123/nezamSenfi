import React, { useEffect, useState } from "react";
import { Card, CardTitle, FormGroup } from "reactstrap";
import { columns } from "./UnionColumns";
import { ListTable } from "../../../common/ListTable/ListTable";
import { useGetAllUnionsNotConfirmByFilter } from "../../../../core/services/api";
import { UnionSearchBox } from "./UnionSearchBox";


const UnionConfirmList = () => {
  const [tableData, setTableData] = useState([]);

  const [pageSize, setPageSize] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const [countyId, setCountyId] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  const getAllUnions = useGetAllUnionsNotConfirmByFilter();

  useEffect(() => {
    const obj = {
      page: 1,
      pageSize: pageSize,
      countyId: countyId,
    };

    getAllUnions.mutate(obj);
  }, [pageSize]);

  useEffect(() => {
    if (getAllUnions.data && getAllUnions.data.data) {
      const result = getAllUnions.data.data.result;
      setTableData(result.countyUnions);
      setPageCount(Math.ceil(result.totalCount / pageSize));
    }
  }, [getAllUnions.isSuccess]);

  return (
    <Card>
      <FormGroup>
        <CardTitle>لیست اتحادیه های تایید نشده</CardTitle>
      </FormGroup>
      <UnionSearchBox
        getAllUnions={getAllUnions.mutate}
        pageSize={pageSize}
        setCountyId={setCountyId}
        isLoading={getAllUnions.isLoading}
      />
      <ListTable
        columns={columns}
        isLoading={getAllUnions.isLoading}
        onPageChange={({ page, pageSize }) =>
          getAllUnions.mutate({
            page: page,
            pageSize: pageSize,
            countyId: countyId,
          })
        }
        tableData={tableData}
        pageCountList={pageCount}
        customPageSize={pageSize}
        getCustomProps={{
          reloadData: getAllUnions.mutate,
          dataObj: {
            page: 1,
            pageSize: pageSize,
            countyId: countyId,
          },
        }}
        setPageSize={(val: any) => setPageSize(val)}
        initialPage={initialPage}
        setInitialPage={setInitialPage}
      >
        {{
          headerTable: <p></p>,
        }}
      </ListTable>
    </Card>
  );
};
export { UnionConfirmList };
