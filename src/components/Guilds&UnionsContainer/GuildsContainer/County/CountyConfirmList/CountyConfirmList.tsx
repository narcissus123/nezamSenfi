import React, { useEffect, useState } from "react";
import { Button, Card, CardTitle, FormGroup, Input } from "reactstrap";
import { columns } from "./CountyColumns";
import { Search } from "react-feather";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { useGetAllWatingForConfirmationCountyGuildRoomByFilter } from "../../../../../core/services/api";


const CountyConfirmList = () => {
  const [tableData, setTableData] = useState([]);

  const [pageSize, setPageSize] = useState(8);

  const [pageCount, setPageCount] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  const [title, setTitle] = useState("");

  const unConfirmList = useGetAllWatingForConfirmationCountyGuildRoomByFilter();

  useEffect(() => {
    const obj = {
      page: 1,
      pageSize: pageSize,
      title: title,
    };
    unConfirmList.mutate(obj);
  }, [pageSize]);

  useEffect(() => {
    if (unConfirmList.data && unConfirmList.data.data) {
      const result = unConfirmList.data.data.result;

      setTableData(result.countyGuildRooms);
      setPageCount(Math.ceil(result.totalCount / pageSize));
    }
  }, [unConfirmList.isSuccess]);

  const onSearch = () => {
    const obj = {
      page: 1,
      pageSize: pageSize,
      title: title,
    };
    unConfirmList.mutate(obj);
  };

  return (
    <Card>
      <FormGroup>
        <CardTitle>لیست اصناف شهرستانی تایید نشده</CardTitle>
      </FormGroup>

      <ListTable
        columns={columns}
        isLoading={unConfirmList.isLoading}
        onPageChange={({ page, pageSize }) => {
          unConfirmList.mutate({ page: page, pageSize: pageSize, title: "" });
        }}
        tableData={tableData}
        getCustomProps={{
          reloadData: unConfirmList.mutate,
          unionConfirmFilter: { page: 1, pageSize: pageSize, title: title },
        }}
        pageCountList={pageCount}
        customPageSize={pageSize}
        setPageSize={(val: any) => setPageSize(val)}
        initialPage={initialPage}
        setInitialPage={setInitialPage}
      >
        {{
          headerTable: (
            <div className="d-flex flex-wrap justify-content-left">
              <div className="position-relative has-icon-left mb-1">
                <Input
                  placeholder="جستوجو صنف"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="form-control-position">
                  <Search size="15" />
                </div>
              </div>

              <FormGroup>
                <Button
                  onClick={onSearch}
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  جستوجو
                </Button>
              </FormGroup>
            </div>
          ),
        }}
      </ListTable>
    </Card>
  );
};
export { CountyConfirmList };
