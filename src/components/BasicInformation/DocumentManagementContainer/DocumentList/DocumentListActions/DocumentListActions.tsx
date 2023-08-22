import React, { useState } from "react";
import { FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { UseMutationResult } from "react-query";

import { useDeleteDocumentById } from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { SweetAlertCallback } from "../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
    };
  };
  mutation: UseMutationResult;
  setShowEditModal: (id: any) => void;
  setSelectedUser: (id: any) => void;
  setrefetchDocumnts: any;
}

const DocumentListActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
    },
  },
  setrefetchDocumnts,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const deleteDocumentByIdMutation = useDeleteDocumentById();

  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <SweetAlertCallback
        mutation={deleteDocumentByIdMutation}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          deleteDocumentByIdMutation.mutate(id, {
            onSuccess: (val: any) => {
              setrefetchDocumnts();
              setShowConfirmation(false);
              showToast([".با موفقیت حذف شد"], "success");
            },
            onError: (err: any) => {
              showToast(["مشکلی پیش آمد!"], "error");
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

export { DocumentListActions };
