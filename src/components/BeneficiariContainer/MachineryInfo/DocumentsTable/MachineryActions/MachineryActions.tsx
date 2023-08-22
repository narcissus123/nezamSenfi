import React, { useState } from "react";
import { UseMutationResult } from "react-query";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { SweetAlertCallback } from "../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { useDeleteUserMachine } from "./../../../../../core/services/api";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
    };
  };
  mutation: UseMutationResult;
  setShowEditModal: (id: any) => void;
  setSelectedUser: (id: any) => void;
  setAllUserMachines: any;
  tableData: any;
}

const MachineryActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
    },
  },
  setAllUserMachines,
  tableData,
  setShowEditModal,
  setSelectedUser,
}) => {
  const history = useHistory();

  const deleteMachin = useDeleteUserMachine();
  const [showConfirmation, setShowConfirmation] = useState<any>(false);
  const [deleteSelected, setDeleteSelected] = useState<any>(null);

  const deleteClickHandler = (id: any) => {
    setDeleteSelected(id);
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <SweetAlertCallback
        mutation={deleteMachin}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          deleteMachin.mutate(id, {
            onSuccess: () => {
              setAllUserMachines(
                tableData.filter((item: any) => item.id !== id)
              );
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
        ویرایش اسناد &nbsp;
      </Button>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => history.push("/Beneficiari/MachineryEdit/" + id)}
      >
        ویرایش &nbsp;
      </Button>
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          deleteClickHandler(id);
        }}
      >
        حذف &nbsp;
      </Button>
    </div>
  );
};

export { MachineryActions };
