import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { UseMutationResult } from "react-query";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback";
import { useDeleteMachineTypeById } from "./../../../../../../../core/services/api";
import { useMachineTypeContext } from "./../../AdminMacineTypesContainer";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
    };
  };
  mutation: UseMutationResult;
  setShowEditModal: (id: any) => void;
  setSelectedUser: (id: any) => void;
}

const MachineTypeActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
    },
  },
  setSelectedUser,
  setShowEditModal,
}) => {
  const {
    listData,
    mutation,
    filterState,
    setInitialPage,
  } = useMachineTypeContext();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const DeleteMachineType = useDeleteMachineTypeById();

  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <SweetAlertCallback
        mutation={DeleteMachineType}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          DeleteMachineType.mutate(id, {
            onSuccess: () => {
              if (listData.length === 1) {
                let lastPage = 0;
                setInitialPage((page: number) => {
                  lastPage = page - 1;
                  return lastPage === -1 ? 0 : lastPage;
                });
                mutation.mutate({
                  ...filterState,
                  page: lastPage === -1 ? 1 : lastPage + 1,
                });
              } else {
                let lastPage = 0;
                setInitialPage((page: number) => {
                  lastPage = page;
                  return lastPage;
                });
                mutation.mutate({ ...filterState, page: lastPage + 1 });
              }
              setShowConfirmation(false);
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از پاک کردن این داده مطمئنید؟
      </SweetAlertCallback>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          setSelectedUser(id);
          setShowEditModal(true);
        }}
      >
        ویرایش &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          deleteClickHandler();
        }}
      >
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { MachineTypeActions };