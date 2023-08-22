import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { showToast } from "../../../../../../../../../core/utils";
import { validationRejectModal } from "../../../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton, TextArea } from "../../../../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  rejectMutation: any;
  req_id: number;
}

const initialValue = {
  describe: "",
};

const RejectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  rejectMutation,
  req_id,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();

  const rejectMutate = rejectMutation();

  const onSubmit = (value: any) => {
    const rejectData = {
      licenseRequestId: req_id,
      description: value.describe,
    };
    rejectMutate.mutate(rejectData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        // refetch();
        toggleModal();
        history.push("/ManageLicense/IssuingManager/MyCartable");
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={state}
            validationSchema={validationRejectModal}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    placeholder="توضیحات"
                    significant
                  />
                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={rejectMutate.isLoading}
                      btnText="رد"
                      clearable
                      clearableDisable={rejectMutate.isLoading}
                      clearableTxt="انصراف"
                      onClear={toggleModal}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export { RejectModal };
