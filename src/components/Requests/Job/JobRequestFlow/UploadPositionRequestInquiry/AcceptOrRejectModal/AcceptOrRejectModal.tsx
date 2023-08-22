import { Form, Formik } from "formik";
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../core/enums";
import { isPersianAndNumber, showToast } from "../../../../../../core/utils";
import { SubmitButton, TextArea } from "../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  positionRequestId: number;
  useMutation: any;
  redirectLink?: string;
  status: string;
}

const AcceptOrRejectModal: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  useMutation,
  positionRequestId,
  status,
  redirectLink = "",
}) => {
  const history = useHistory();

  const validation = Yup.object().shape({
    description: Yup.string()
      .matches(isPersianAndNumber(), "لطفا توضیحات را درست وارد کنید")
      .required("لطفا توضیحات را وارد کنید")
      .typeError("لطفا توضیحات را درست وارد کنید"),
  });

  const onSubmit = (values: any) => {
    const mutateObject = {
      description: values.description,
      positionRequestId: positionRequestId,
    };

    useMutation.mutate(mutateObject, {
      onSuccess: () => {
        history.push(redirectLink);
      },
    });
  };

  useEffect(() => {
    if (useMutation.isSuccess) {
      showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
    }
  }, [useMutation.isSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>{status} پاسخ استعلام</ModalHeader>
      <Formik
        initialValues={{ description: "" }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validation}
      >
        {({ values }) => (
          <Form>
            <>
              <ModalBody>
                <TextArea
                  lableText="توضیحات"
                  name="description"
                  placeholder="توضیحات را وارد کنید"
                  significant
                />
              </ModalBody>

              <ModalFooter className="d-flex justify-content-start">
                <SubmitButton
                  isLoading={useMutation.isLoading}
                  btnText={status === "رد" ? "رد درخواست" : "تایید درخواست"}
                  clearable
                  clearableDisable={useMutation.isLoading}
                  onClear={toggleModal}
                  clearableTxt="انصراف"
                  values={values}
                  schema={validation}
                />
              </ModalFooter>
            </>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { AcceptOrRejectModal };
