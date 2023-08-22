import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useGetMyLicenseRequestCancellationReason } from "../../../../../../core/services/api/cancelation.api";
import { ListTablePaginate } from "../../../../../common/ListTablePaginate/ListTablePaginate";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";


import { columns } from "./Column";

interface IPropTypes {
  refetchFromUpload: boolean;
}

const DocumentsTable: React.FC<IPropTypes> = ({ refetchFromUpload }) => {
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState<any>(10);
  const [tableData, setTableData] = useState<any>([]);

  const { data, isFetching, refetch } = useGetMyLicenseRequestCancellationReason();

  useEffect(() => {
    refetch();
  }, [refetchFromUpload]);

  useEffect(() => {
    let newData: any = [];
    if (data && data.data.result) {
      data.data.result.forEach((doc: any) => {
        newData.push(doc);
      });
      setTableData(newData);
    }
  }, [data]);

  return (
    <>
      {isFetching ? (
        <>
          <FallBackSpinner />
        </>
      ) : (
        <>
          <Row style={{ marginTop: "14px" }}>
            <Col>
              <ListTablePaginate
                columns={columns}
                setPageCountList={setPageCount}
                isLoading={false}
                onPageChange={() => {}}
                pageCountList={pageCount}
                customPageSize={pageSize}
                getCustomProps={{
                  setTableData,
                  tableData,
                  refetch,
                }}
                tableData={tableData}
              >
                {{
                  headerTable: <></>,
                }}
              </ListTablePaginate>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export { DocumentsTable };
