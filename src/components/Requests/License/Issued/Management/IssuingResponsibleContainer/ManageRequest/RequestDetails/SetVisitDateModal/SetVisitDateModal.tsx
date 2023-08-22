import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { useRequestOrginalDocumentByIssuingResponsible } from "../../../../../../../../../core/services/api";
import {
  getCurrentJalaliDate,
  showToast,
} from "../../../../../../../../../core/utils";
import {
  ModernDatePicker,
  SubmitButton,
  TextArea,
} from "../../../../../../../../common/Form";

interface IPropTypes {
  toggleModal: () => void;
  isOpen: boolean;
}

const SetVisitDateModal: FC<IPropTypes> = ({ isOpen, toggleModal }) => {
  const validation = Yup.object().shape({
    description: Yup.string()
      .required("لطفا توضیحات را وارد کنید")
      .typeError("لطفا توضیحات را درست وارد کنید"),

    date: Yup.string().required(" تاریخ نباید خالی باشد"),
  });

  const { id } = useParams<{ id: string }>();

  const setDate = useRequestOrginalDocumentByIssuingResponsible();

  const onSubmit = (values: any) => {
    const setVisitDateObject = {
      description: values.description,
      date: values.date,
      licenseRequestId: +id,
    };

    setDate.mutate(setVisitDateObject, {
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
      <ModalHeader toggle={toggleModal}>اعلام زمان دریافت اسناد</ModalHeader>
      <Formik
        initialValues={{
          description: "",
          date: "",
        }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validation}
      >
        {({ values, errors }) => (
          <Form>
            <>
              <ModalBody>
                <ModernDatePicker
                  lableText="تاریخ"
                  name="date"
                  placeholder="تاریخ"
                  hasMaximum={false}
                  initialValue={values.date}
                  forcePosition="bottom"
                  minimumDate={getCurrentJalaliDate()}
                  significant
                />
                <TextArea
                  lableText="توضیحات"
                  name="description"
                  placeholder="توضیحات را وارد کنید"
                  significant
                />
              </ModalBody>

              <ModalFooter className="d-flex justify-content-start">
                <SubmitButton
                  isLoading={setDate.isLoading}
                  btnText="ثبت"
                  clearable
                  onClear={toggleModal}
                  clearableTxt="انصراف"
                  values={values}
                  clearableDisable={setDate.isLoading}
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

export { SetVisitDateModal };
