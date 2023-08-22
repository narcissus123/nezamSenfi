import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../../../core/enums";
import { showToast } from "../../../../../../../../core/utils";
import { SubmitButton, TextArea } from "../../../../../../../common/Form";




interface IPropTypes {
  toggleModal: () => void;
  isOpen: boolean
  sendMutation: any
  title: string
}

const ConfirmJahadIdea: FC<IPropTypes> = ({ isOpen, toggleModal , sendMutation , title}) => {
  const validation = Yup.object().shape({
    description: Yup.string()
      .required("لطفا توضیحات را وارد کنید")
      .typeError("لطفا توضیحات را درست وارد کنید"),
  });

  const { id } = useParams<{ id: string }>();

  const sendToJahadMutation = sendMutation();

  const onSubmit = (values: any) => {
    const sendToJahadObj = {
      description: values.description,
      licenseRequestId: +id,
    };

    sendToJahadMutation.mutate(sendToJahadObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push("/ManageLicense/IssuingResponsible/MyCartable");
      },
    });
  };

  const history = useHistory();

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
      <Formik
        initialValues={{
          description: "",
        }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validation}
      >
        {({ values, errors, submitForm }) => (
          <Form>
            <>
              <ModalBody>
                <TextArea
                  lableText="توضیحات"
                  name="description"
                  placeholder="توضیحات"
                />
              </ModalBody>

              <ModalFooter className="d-flex justify-content-start">
                <SubmitButton
                  type="button"
                  isLoading={sendToJahadMutation.isLoading}
                  btnText="ثبت"
                  clearable
                  onClear={toggleModal}
                  clearableTxt="انصراف"
                  values={values}
                  clearableDisable={sendToJahadMutation.isLoading}
                  schema={validation}
                  onClick={() => submitForm()}
                />
              </ModalFooter>
            </>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { ConfirmJahadIdea };
