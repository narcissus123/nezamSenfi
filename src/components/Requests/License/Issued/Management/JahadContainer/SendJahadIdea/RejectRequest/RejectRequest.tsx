import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { useRejectByJahad } from "../../../../../../../../core/services/api";

import { showToast } from "../../../../../../../../core/utils";
import {
  validationConfirmModal,
  validationRejectModal,
} from "../../../../../../../../core/validations/secretariat-check-job.validation";
import { TextArea } from "../../../../../../../common/Form/InputComponents/TextArea/TextArea";
import { SubmitButton } from "../../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
}

const initialValue = {
  describe: "",
};

const RejectRequest: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();
  const location = useLocation();

  let { id } = useParams<{ id: string }>();

  const rejectMutation = useRejectByJahad();

  const onSubmit = (values: any) => {
    const confirmObj = {
      licenseRequestId: +id,
      description: values.describe,
    };
    rejectMutation.mutate(confirmObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push("/ManageLicense/JahadCenterManager/MyCartable");
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
        <ModalHeader toggle={toggleModal}>رد درخواست</ModalHeader>
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
                      isLoading={rejectMutation.isLoading}
                      btnText="رد"
                      clearable
                      clearableDisable={rejectMutation.isLoading}
                      clearableTxt="انصراف"
                      onClear={toggleModal}
                      schema={validationRejectModal}
                      values={values}
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

export { RejectRequest };
