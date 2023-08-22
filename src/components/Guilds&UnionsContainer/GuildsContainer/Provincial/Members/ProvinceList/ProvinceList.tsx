import React, { FC, useState } from "react";

import { columns } from "./Columns";

import { ListTable } from "../../../../../common/ListTable/ListTable";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { GetOwnedAdmin } from "./GetOwnedAdmin/GetOwnedAdmin";
import { GetOwnedManager } from "./GetOwnedManager/GetOwnedManager";
import { UserRoles } from "../../../../../../core/enums";


interface IPropTypes {
  fetchRefresh: boolean;
  setFetchRefresh: () => void;
}

const ProvinceList: FC<IPropTypes> = ({ fetchRefresh, setFetchRefresh }) => {

  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(500);
  const [managerLoading, setManagerLoading] = useState<any>(false);
  const [adminLoading, setAdminLoading] = useState<any>(false);

  return (
    <>
      <Can roles={[UserRoles.ProvinceGuildRoomAdmin]}>
        <GetOwnedAdmin setState={setState} setAdminLoading={setAdminLoading} />
      </Can>
      <Can roles={[UserRoles.ProvinceGuildRoomManager]}>
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

export { ProvinceList };
