import React from "react";
import { TreeSpecificationsForm } from "./TreeSpecificationsForm";

interface IPropTypes {
  tableData: any;
  setTableData: any;
  treeData: any;
  refetch: any;
  isExpert: boolean;
}

const TreeSpecifications: React.FC<IPropTypes> = ({
  tableData,
  setTableData,
  treeData,
  refetch,
  isExpert,
}) => {
  return (
    <>
      <TreeSpecificationsForm
        refetch={refetch}
        treeData={treeData}
        tableData={tableData}
        setTableData={setTableData}
        isExpert={isExpert}
      />
    </>
  );
};

export { TreeSpecifications };
