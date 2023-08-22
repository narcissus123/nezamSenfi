import React, { useContext, useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { UseMutationResult } from "react-query";
import { useHistory } from "react-router";

import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { useDeleteWaterWellWall } from "../../../../../../../core/services/api/parts-and-facilities.api";
import { showToast } from "../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { ToastTypes } from "../../../../../../../core/enums";
import { EditModal } from "../EditModal/EditModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original:any
    };
  };
  mutation: UseMutationResult;
}

const ListWaterWellCoverageActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
}) => {
  const history = useHistory();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const DeleteServicesById = useDeleteWaterWellWall();

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
              newEvent.waterWellList = !newEvent.waterWellList;
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

export { ListWaterWellCoverageActions };
