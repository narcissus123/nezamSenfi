import React, { useState } from "react";
import { Edit, File, FileMinus, List } from "react-feather";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  useDeleteJob,
  useEditJob,
  useEditJobSubClass,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import {
  editJobSubClassValidation,
  editJobValidation,
} from "../../../../../../../core/validations/admin-job-tools.validation";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { EditJobModal } from "./EditJobModal/EditJobModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; title: string };
      original: any;
    };
  };
  refetch: any;
}

const JobSubClassActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id, title },
      original,
    },
  },
  refetch,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const DeleteServicesById = useDeleteJob();
  //const {setFetchRefresh} = useServicesTypesContext()

  const history = useHistory();

  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center flex-wrap">
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
          schema={editJobValidation}
          editJobMutation={useEditJob}
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
      {/* <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={() => {
          history.push(
            "/BasicInformation/FieldJob/Job/AddDocument/Issued/" +
              id +
              "?title=" +
              title
          );
        }}
      >
        اسناد صدور &nbsp;
        <List
          style={{ position: "relative", top: "0px" }}
          size={12}
          color="white"
        />
      </Button>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={() => {
          history.push(
            "/BasicInformation/FieldJob/Job/AddDocument/Cancellation/" +
              id +
              "?title=" +
              title
          );
        }}
      >
        اسناد ابطال &nbsp;
        <List
          style={{ position: "relative", top: "0px" }}
          size={12}
          color="white"
        />
      </Button> */}
    </div>
  );
};

export { JobSubClassActions };
