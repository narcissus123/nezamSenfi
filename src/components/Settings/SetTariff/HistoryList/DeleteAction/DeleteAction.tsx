import React, { useContext, useState } from "react";
import { FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import { showToast } from "../../../../../core/utils";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { SweetAlertCallback } from "../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IPropTypes {
  cell: {
    row: {
      values: any;
      original: {id: any}
    };
  };
  deleteMutation: any;
  setRefetch: any
}

const DeleteAction: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values,
      original: { id },
    },
  },
  deleteMutation,
  setRefetch,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  const DeleteServicesById = deleteMutation();

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <SweetAlertCallback
        mutation={DeleteServicesById}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          DeleteServicesById.mutate(id, {
            onSuccess: () => {
              setShowConfirmation(false);
              showToast(["با موفقیت انجام شد."], ToastTypes.success);
              setRefetch((prev: boolean) => !prev);
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

export { DeleteAction };
