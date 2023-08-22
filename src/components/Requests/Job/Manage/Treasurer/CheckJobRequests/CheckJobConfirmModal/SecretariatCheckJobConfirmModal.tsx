import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { TextArea } from "../../../../../../common/Form/InputComponents/TextArea/TextArea";
import { validationConfirmModal } from "../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton } from "../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { usePostInvestigateAndAcceptBySecretriat } from "../../../../../../../core/services/api";
import { useHistory, useParams } from "react-router-dom";
import { showToast } from "../../../../../../../core/utils";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  mutation?: any;
  type?: string;
}

const initialValue = {
  describe: "",
};

const SecretariatCheckJobConfirmModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  type,
  mutation,
}) => {
  const [state, setState] = useState(initialValue);

  let { id } = useParams<any>();

  const confirmMutation = usePostInvestigateAndAcceptBySecretriat();
  const history = useHistory();

  const onSubmit = (value: any) => {
    const confirmData = {
      positionRequestId: id,
      description: value.describe,
    };

    confirmMutation.mutate(confirmData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        if (type === "Union") {
          history.push("/ManageCartable/UnionTreasurerJobRequestCartable");
        } else if (type === "County") {
          history.push("/ManageCartable/CountyTreasurerJobRequestCartable");
        } else if (type === "Province") {
          history.push("/ManageCartable/ProvinceTreasurerJobRequestCartable");
        } else if (type === "MainLocation") {
          history.push(
            "/ManageCartable/MainLocationTreasurerJobRequestCartable"
          );
        }
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
                  />

                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={confirmMutation.isLoading}
                      btnText="تایید"
                      clearable
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

export { SecretariatCheckJobConfirmModal };
