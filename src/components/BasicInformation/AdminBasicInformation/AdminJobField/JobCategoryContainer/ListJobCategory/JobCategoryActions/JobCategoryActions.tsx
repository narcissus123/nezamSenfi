import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";

import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

import { editJobCategoryValidation } from "../../../../../../../core/validations/admin-job-tools.validation";
import {
  useDeleteJobCategory,
  useEditJobCategory,
} from "../../../../../../../core/services/api";
import { EditJobModal } from "./EditJobModal/EditJobModal";
import { ToastTypes } from "../../../../../../../core/enums";
import { showToast } from "../../../../../../../core/utils";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  refetch: any;
}

const JobCategoryActions: React.FC<IPropTypes> = ({
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
  const DeleteServicesById = useDeleteJobCategory();
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
          schema={editJobCategoryValidation}
          editJobMutation={useEditJobCategory}
          refetch={refetch}
        />
      )}
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

export { JobCategoryActions };
