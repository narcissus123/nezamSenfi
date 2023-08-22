import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { showToast } from "../../../../../../core/utils";
import { secretariatSetNumberAndDateValidate, validationConfirmModal } from "../../../../../../core/validations/secretariat-check-job.validation";
import { ModernDatePicker, SubmitButton, TextArea, TextInput } from "../../../../../common/Form";


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  acceptMutation: any;
}

const initialValue = {
  describe: "",
};

const ConfirmModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  acceptMutation,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();
  const location = useLocation();

  let { id: req_id } = useParams<any>();

  const confirmMutation = acceptMutation();

  const onSubmit = (value: any) => {
    const confirmData = {
      licenseRequestId: +req_id,
      cansellationDate: value.cansellationDate,
      cansellationNumberBySecretriat: value.cansellationNumberBySecretriat
    };
    confirmMutation.mutate(confirmData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        toggleModal();
        history.push("/ManageLicense/Secreteriat/MyCartable");
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
            validationSchema={secretariatSetNumberAndDateValidate}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <ModernDatePicker
                    name="cansellationDate"
                    lableText="تاریخ"
                    placeholder="وارد کنید..."
                    hasMaximum
                  />

                  <TextInput
                    lableText="شماره ثبت"
                    type="cansellationNumberBySecretriat"
                    name="cansellationNumberBySecretriat"
                    placeholder="عدد وارد کنید ..."
                    significant
                  />

                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={confirmMutation.isLoading}
                      btnText="ثبت"
                      clearable
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

export { ConfirmModal };
