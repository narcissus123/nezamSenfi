import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { showToast } from "../../../../../../../../../core/utils";
import { validationConfirmModal } from "../../../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton, TextArea } from "../../../../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  acceptMutation: any;
  refetch: any;
}

const initialValue = {
  describe: "",
};

const ExpertizeConfirmModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  acceptMutation,
  refetch,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();
  const location = useLocation();

  let { req_id, status } = useParams<{ req_id: string; status: string }>();

  const confirmMutation = acceptMutation();

  const onSubmit = (value: any) => {
    const confirmData = {
      licenseRequestId: +req_id,
      description: value.describe,
    };
    confirmMutation.mutate(confirmData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        refetch();
        toggleModal();
        history.push(
          `/ManageLicense/IssuingResponsible/Matching/${status}/Draft/${req_id}`
        );
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
                    significant
                  />

                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={confirmMutation.isLoading}
                      btnText="تایید"
                      clearable
                      clearableDisable={confirmMutation.isLoading}
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

export { ExpertizeConfirmModal };
