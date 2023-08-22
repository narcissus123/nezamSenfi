import React, { FC, useState } from "react";

import { columns } from "./Columns";

import { ListTable } from "../../../../../common/ListTable/ListTable";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { UserRoles } from "../../../../../../core/enums";
import { GetOwnedAdmin } from "./GetOwnedAdmin/GetOwnedAdmin";
import { GetOwnedManager } from "./GetOwnedManager/GetOwnedManager";


interface IPropTypes {
  fetchRefresh: boolean;
  setFetchRefresh: () => void;
}

const CountyList: FC<IPropTypes> = ({ fetchRefresh, setFetchRefresh }) => {

  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(500);
  const [managerLoading, setManagerLoading] = useState<any>(false);
  const [adminLoading, setAdminLoading] = useState<any>(false);

  return (
    <>
      <Can roles={[UserRoles.CountyGuildRoomAdmin]}>
        <GetOwnedAdmin setState={setState} setAdminLoading={setAdminLoading} />
      </Can>
      <Can roles={[UserRoles.CountyGuildRoomManager]}>
        <GetOwnedManager setState={setState} setManagerLoading={setManagerLoading} />
      </Can>
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

export { CountyList };
