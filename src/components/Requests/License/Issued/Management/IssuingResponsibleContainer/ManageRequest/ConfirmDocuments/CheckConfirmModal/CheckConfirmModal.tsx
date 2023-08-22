import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  useConfirmAllDocumentByIssuingResponsible,
  usePostInvestigateAndAcceptByManager,
  usePostInvestigateAndAcceptBySecretriat,
} from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { validationConfirmModal } from "../../../../../../../../../core/validations/secretariat-check-job.validation";
import { TextArea } from "../../../../../../../../common/Form/InputComponents/TextArea/TextArea";
import { SubmitButton } from "../../../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
}

const initialValue = {
  describe: "",
};

const CheckConfirmModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();
  const location = useLocation();

  const confirmAll = useConfirmAllDocumentByIssuingResponsible();

  let { id } = useParams<{ id: string }>();

  const onSubmit = (values: any) => {
    const confirmObj = {
      licenseRequestId: +id,
      description: values.describe,
    };
    confirmAll.mutate(confirmObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push("/ManageLicense/IssuingResponsible/MyCartable");
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
        <ModalHeader toggle={toggleModal}>تایید نهایی</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={state}
            validationSchema={validationConfirmModal}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    placeholder="توضیحات"
                  />

                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={confirmAll.isLoading}
                      btnText="تایید"
                      clearable
                      clearableDisable={confirmAll.isLoading}
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

export { CheckConfirmModal };
