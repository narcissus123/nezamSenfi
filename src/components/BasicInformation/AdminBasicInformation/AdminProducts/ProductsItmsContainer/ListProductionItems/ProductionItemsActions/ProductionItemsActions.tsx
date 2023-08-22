import React, { useContext, useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { UseMutationResult } from "react-query";
import { useHistory } from "react-router";

import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { useDeleteJobFigure } from "../../../../../../../core/services/api/job.api";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../core/enums";
import { EditModal } from "./EditModal/EditModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original : any;
    };
  };
  mutation: UseMutationResult;
  setShowEditModal: (id: any) => void;
  setSelectedUser: (id: any) => void;
}

const ProductionItemsActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original
    },
  },
  setSelectedUser,
  setShowEditModal,
}) => {
  const history = useHistory();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const DeleteProductFigureById = useDeleteJobFigure();

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
        mutation={DeleteProductFigureById}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          DeleteProductFigureById.mutate(id, {
            onSuccess: () => {
              setShowConfirmation(false);
              showToast(["با موفقیت انجام شد."], ToastTypes.success);
              const newEvent = { ...refetchEvent };
              newEvent.productionFigureList = !newEvent.productionFigureList;
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
        onClick={() => setOpenModal(true)}
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

export { ProductionItemsActions };

