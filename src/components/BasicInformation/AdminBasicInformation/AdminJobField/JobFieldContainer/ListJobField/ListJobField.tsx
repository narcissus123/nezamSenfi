import React, { useState } from "react";

import { columns } from "./ListJobFieldColumns";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { JobFieldModal } from "./JobFieldModal";

interface IPropTypes {
  refetch: boolean;
}

const ListJobField: React.FC<IPropTypes> = ({ refetch }) => {
  const [showEditModal, setShowEditModal] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <>
      <JobFieldModal
        data={{}}
        backdrop={true}
        currentId={selectedUser}
        isOpen={showEditModal}
        setSelectedUser={setSelectedUser}
        toggleModal={() => setShowEditModal((val: any) => !val)}
      />

      <ListTable
        isLoading={false}
        columns={columns}
        pageCountList={0}
        tableData={[{ title: "test", id: 1, isNew: true }]}
        onPageChange={({ page, pageSize }) => alert(page + pageSize)}
        getCustomProps={{ setShowEditModal, setSelectedUser }}
      >
        {{ headerTable: <p></p> }}
      </ListTable>
    </>
  );
};

export { ListJobField };
