import React, { FC, useEffect, useState } from "react";
import { fullOption } from "../../../../../../../core/utils";
import { ListTable } from "../../../../../../common/ListTable/ListTable";

import { columns } from "./MemberColumns";

interface IPropTypes {
  data : any;
  noChangeAllServiceState : any
}


const MemberListDetails: FC<IPropTypes> = ({data , noChangeAllServiceState }) => {

  const [tableData , setTableData ] = useState<any>([]);

  useEffect(() => {
    if (data.users) {
      

      data.users.forEach((row: any) => {
        let newSelectedRoles: any = [];
        row.roles.forEach((el: any) => {
          newSelectedRoles.push(`${fullOption(el, noChangeAllServiceState)?.label},`);
        });
        let newFormObject = {
          id: row.userId,
          name: `${row.name} ${row.lastName}`,
          userNationalCode: row.nationalCode,
          role: newSelectedRoles,
        };
        setTableData((prev: any) => {
          return [...prev, newFormObject];
        });
      });
    }
  }, []);


  return (
    <ListTable
      isLoading={false}
      columns={columns}
      onPageChange={({ page, pageSize }) => {}}
      pageCountList={0}
      customPageSize={10}
      tableData={tableData}
      initialPage={0}
    >
      {{ headerTable: <p></p> }}
    </ListTable>
  );
};

export { MemberListDetails };
