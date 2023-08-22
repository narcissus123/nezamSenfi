import React, { useState } from "react";
import { Card } from "reactstrap";

import { ListTable } from "../../../common/ListTable";
import { columns } from "./DocumentsTableColumn";
import { MachineryModal } from "./MachineryModal/MachineryModal";

interface IPropTypes {
  tableData: any;
  isLoading: boolean;
  mutation: any;
  setAllUserMachines: any;
}

const DocumentsTable: React.FC<IPropTypes> = ({
  tableData,
  isLoading,
  mutation,
  setAllUserMachines,
}) => {
  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <>
      {showEditModal && (
        <MachineryModal
          backdrop={true}
          currentId={selectedUser}
          isOpen={showEditModal}
          data={tableData}
          setSelectedUser={setSelectedUser}
          toggleModal={() => setShowEditModal((val: any) => !val)}
        />
      )}
      <Card style={{ marginTop: "14px" }}>
        <ListTable
          isLoading={isLoading}
          columns={columns}
          pageCountList={0}
          tableData={tableData}
          onPageChange={() => null}
          getCustomProps={{
            setAllUserMachines,
            tableData,
            setShowEditModal,
            setSelectedUser,
          }}
        ></ListTable>
      </Card>
    </>
  );
};

export { DocumentsTable };
