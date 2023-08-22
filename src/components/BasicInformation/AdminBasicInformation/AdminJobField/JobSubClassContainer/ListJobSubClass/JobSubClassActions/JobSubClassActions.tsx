import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  useDeleteJobSubClass,
  useEditJobSubClass,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { editJobSubClassValidation } from "../../../../../../../core/validations/admin-job-tools.validation";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { EditJobModal } from "./EditJobModal/EditJobModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  refetch: any;
}

const JobSubClassActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  refetch,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const DeleteServicesById = useDeleteJobSubClass();
  //const {setFetchRefresh} = useServicesTypesContext()

  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
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
              showToast(["با موفقیت حذف شد"], ToastTypes.success);
              setShowConfirmation(false);
              refetch();
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از پاک کردن این داده مطمئنید؟
      </SweetAlertCallback>

      {openModal && (
        <EditJobModal
          backdrop
          isOpen={openModal}
          toggle={() => setOpenModal(false)}
          job={original}
          schema={editJobSubClassValidation}
          editJobMutation={useEditJobSubClass}
          refetch={refetch}
        />
      )}
      {original && original.code !== "0" && (
        <>
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
        </>
      )}
    </div>
  );
};

export { JobSubClassActions };
