import React, { FC } from "react";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { columns } from "./MemberColumns";

interface IPropTypes {
  tableData : any;
  setTableData : any
  AllServiceState : any
  noChangeAllServiceState : any
}


const MemberList: FC<IPropTypes> = ({tableData , setTableData , AllServiceState , noChangeAllServiceState }) => {
  return (
    <ListTable
      isLoading={false}
      columns={columns}
      onPageChange={({ page, pageSize }) => {}}
      pageCountList={0}
      customPageSize={10}
      tableData={tableData}
      getCustomProps={{setTableData : setTableData , AllServiceState : AllServiceState , noChangeAllServiceState : noChangeAllServiceState}}
      initialPage={0}
    >
      {{ headerTable: <p></p> }}
    </ListTable>
  );
};

export { MemberList };
