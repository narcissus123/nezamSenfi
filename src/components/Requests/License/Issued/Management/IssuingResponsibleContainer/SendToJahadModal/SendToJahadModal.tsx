import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../../core/enums";
import { useSendToJahad } from "../../../../../../../core/services/api";
import {
  getCurrentJalaliDate,
  showToast,
} from "../../../../../../../core/utils";
import {
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";

interface IPropTypes {
  toggleModal: () => void;
  isOpen: boolean;
  sendMutation: any;
  title: string;
  isRedirect?: boolean;
}

const SendToJahadModal: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  sendMutation,
  title,
  isRedirect = true,
}) => {
  const validation = Yup.object().shape({
    letterToJahadNumber: Yup.string()
      .required("لطفا توضیحات را وارد کنید")
      .typeError("لطفا توضیحات را درست وارد کنید"),
    letterToJahadDate: Yup.string().required(" تاریخ نباید خالی باشد"),
  });

  const { id } = useParams<{ id: string }>();

  const sendToJahadMutation = sendMutation();

  const onSubmit = (values: any) => {
    const sendToJahadObj = {
      letterToJahadNumber: values.letterToJahadNumber,
      letterToJahadDate: values.letterToJahadDate,
      licenseRequestId: +id,
    };

    sendToJahadMutation.mutate(sendToJahadObj, {
      onSuccess: () => {
        if (isRedirect) {
          showToast(["با موفقیت انجام شد"], ToastTypes.success);
          history.push(
            "/ManageLicense/IssuingResponsible/Cartable/DetailsRequest/" + id
          );
        } else {
          showToast(
            ["با موفقیت انجام شد.برای دریافت نامه جدید، دانلود نامه را بزنید"],
            ToastTypes.success
          );
          toggleModal();
        }
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
          date: "",
        }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validation}
      >
        {({ values, errors, submitForm }) => (
          <Form>
            <>
              <ModalBody>
                <ModernDatePicker
                  lableText="تاریخ ارسال"
                  name="letterToJahadDate"
                  placeholder="تاریخ"
                  hasMaximum={false}
                  initialValue={values.date}
                  forcePosition="bottom"
                  minimumDate={getCurrentJalaliDate()}
                  significant
                />
                <TextInput
                  lableText="شماره نامه"
                  name="letterToJahadNumber"
                  placeholder="شماره نامه را وارد کنید ..."
                  significant
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

export { SendToJahadModal };
