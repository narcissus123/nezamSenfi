import React, { useContext, useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import { useDeleteOrganization } from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { SweetAlertCallback } from "../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { EditModal } from "../EditModal/EditModal";



interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name:any };
      original : any
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , name },
      original
    },
  },
}) => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const DeleteServicesById = useDeleteOrganization();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

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
              newEvent.organizationList = !newEvent.organizationList;
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
        color="info"
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
          setShowConfirmation(true);
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

export { Actions };
