import React, { FC, useState } from "react";

import { columns } from "./Columns";

import { ListTable } from "../../../../../common/ListTable/ListTable";


interface IPropTypes {
  fetchRefresh: boolean;
  setFetchRefresh: () => void;
}

const MainLocationList: FC<IPropTypes> = ({ fetchRefresh, setFetchRefresh }) => {

  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(500);
  const [managerLoading, setManagerLoading] = useState<any>(false);
  const [adminLoading, setAdminLoading] = useState<any>(false);

  return (
    <>

      <ListTable
        columns={columns}
        isLoading={managerLoading || adminLoading}
        onPageChange={({ page, pageSize }) => {
        }}
        tableData={state}
        pageCountList={pageCountList}
        customPageSize={pageSize}
      
      >
        {{
          headerTable: <div style={{ width: "200px" }}></div>,
        }}
      </ListTable>
    </>
  );
};

export { MainLocationList };
