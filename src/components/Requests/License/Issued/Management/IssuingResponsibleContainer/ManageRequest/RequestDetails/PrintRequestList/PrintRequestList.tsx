import React, { FC } from "react";
import { FormDivider } from "../../../../../../../../common/Form";
import { ListTable } from "../../../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";

interface IPropTypes {
  sections: any;
}

const PrintRequestList: FC<IPropTypes> = ({ sections }): JSX.Element => {
  return (
    <FormDivider textHeader="لیست قطعات">
      <ListTable
        columns={columns}
        isLoading={false}
        onPageChange={() => {}}
        pageCountList={0}
        customPageSize={1000}
        tableData={sections}
      >
        {{
          headerTable: <></>,
        }}
      </ListTable>
    </FormDivider>
  );
};

export { PrintRequestList };
