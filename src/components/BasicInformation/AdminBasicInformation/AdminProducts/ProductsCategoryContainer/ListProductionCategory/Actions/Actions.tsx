import React, { useContext, useState } from "react";
import { Edit, FileMinus, Eye } from "react-feather";
import { Button } from "reactstrap";
import { UseMutationResult } from "react-query";
import { useHistory } from "react-router";

import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { useDeleteProductCategory } from "../../../../../../../core/services/api/job.api";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../core/enums";
import { EditModal } from "./EditModal/EditModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number, title: string };
      original : any;
    };
  };
  mutation: UseMutationResult;
  setShowEditModal: (id: any) => void;
  setSelectedUser: (id: any) => void;
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , title },
      original
    },
  },
  setSelectedUser,
  setShowEditModal,
}) => {
  const history = useHistory();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const DeleteProductFigureById = useDeleteProductCategory();

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
              newEvent.productionCategoryList =
                !newEvent.productionCategoryList;
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
        color="primary"
        onClick={() => {
          history.push({
            pathname: "/BasicInformation/Products/ProductsTools",
            state: { productId: id },
          });
        }}
      >
        مشاهده محصول &nbsp;
        <Eye
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
