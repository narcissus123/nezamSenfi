import React, { useContext, useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { UseMutationResult } from "react-query";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { useDeleteEnginePower } from "../../../../../../../core/services/api/parts-and-facilities.api";
import { EditModal } from "../EditModal/EditModal";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../core/enums";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original : any
    };
  };
  mutation: UseMutationResult;
}

const TypesOfStructuresActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id }, 
      original
    },
  },
}) => {

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const DeleteServicesById = useDeleteEnginePower();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      {openModal && (
        <EditModal
          backdrop
          isOpen={openModal}
          currentId={id}
          toggleModal={() => setOpenModal(false)}
          data={original}
        />
      )}
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
              const newEvent = { ...refetchEvent };
              newEvent.engineMotorList = !newEvent.engineMotorList;
              setRefetchEvent(newEvent);

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
          setOpenModal(true);
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

export { TypesOfStructuresActions };
