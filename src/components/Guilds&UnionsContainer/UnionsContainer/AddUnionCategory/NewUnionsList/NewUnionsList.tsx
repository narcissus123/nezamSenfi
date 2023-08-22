import React, { FC, useEffect, useState } from "react";
import { Card, CardTitle, FormGroup } from "reactstrap";

import { ListTable } from "../../../../common/ListTable/ListTable";
import { columns } from "./UnionColumns";
import { useGetAllUnions } from "../../../../../core/services/api";
import { useRefetchState } from "../../../../../core/utils/context/EventContext";
import { SearchButton } from "./SearchButton";

interface IPropTypes {
  initialPage: number;
  setInitialPage: any;
}

const NewUnionsList: FC<IPropTypes> = ({ initialPage, setInitialPage }) => {
  const [tableData, setTableData] = useState([]);

  const [pageSize, setPageSize] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const [title, setTitle] = useState("");

  const unionList = useGetAllUnions();

  const { refetchEvent } = useRefetchState();

  useEffect(() => {
    const obj = {
      page: 1,
      pageSize: pageSize,
      title: title,
    };

    unionList.mutate(obj);
  }, [pageSize, refetchEvent.newUnionList]);

  useEffect(() => {
    if (unionList.data && unionList.data.data) {
      const result = unionList.data.data.result;
      setTableData(result.listItem);
      setPageCount(Math.ceil(result.totalCount / pageSize));
    }
  }, [unionList.isSuccess]);

  const onSearch = () => {
    const obj = {
      page: 1,
      pageSize: pageSize,
      title: title,
    };
    unionList.mutate(obj);
  };

  return (
    <Card>
      <FormGroup>
        <CardTitle>لیست اتحادیه ها</CardTitle>
      </FormGroup>

      <ListTable
        columns={columns}
        isLoading={unionList.isLoading}
        onPageChange={({ page, pageSize }) =>
          unionList.mutate({ page: page, pageSize: pageSize, title: title })
        }
        getCustomProps={{
          reloadData: unionList.mutate,
          obj: {
            pageSize: pageSize,
            title: title,
            page: initialPage + 1,
          },
        }}
        tableData={tableData}
        customPageSize={pageSize}
        setPageSize={(value: number) => setPageSize(value)}
        pageCountList={pageCount}
        initialPage={initialPage}
        setInitialPage={setInitialPage}
      >
        {{
          headerTable: (
            <SearchButton
              inputPlaceHolder="جستجو اتحادیه"
              onSearch={onSearch}
              setInput={(value: any) => setTitle(value)}
            />
          ),
        }}
      </ListTable>
    </Card>
  );
};
export { NewUnionsList };
