import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  CheckMaximumDate,
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
}

const CreateJahadResponseLetter: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  sendMutation,
  title,
}) => {
  const validation = Yup.object().shape({
    letterToJahadNumber: Yup.string()
      .required("لطفا شماره نامه را وارد کنید")
      .typeError("لطفا شماره نامه را درست وارد کنید"),
    letterToJahadDate: Yup.string()
      .test("letterToJahadDate", "تاریخ را درست وارد کنید", (val: any) => {
        return CheckMaximumDate(val, false, true);
      })
      .required(" تاریخ نباید خالی باشد"),
  });

  const { id } = useParams<{ id: string }>();

  const createJahadLetter = sendMutation();

  const onSubmit = (values: any) => {
    console.log('---jahad test --' );
    const creteJahadLetterObj = {
      letterToJahadNumber: values.letterToJahadNumber,
      letterToJahadDate: values.letterToJahadDate,
      licenseRequestId: +id,
    };

    console.log('---jahad--' , creteJahadLetterObj);
    

    createJahadLetter.mutate(creteJahadLetterObj, {
      onSuccess: () => {
        showToast(
          ["با موفقیت انجام شد.میتوانید نامه جدید را دانلود کنید"],
          ToastTypes.success
        );
        toggleModal();
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
                  isLoading={createJahadLetter.isLoading}
                  btnText="ثبت"
                  clearable
                  onClear={toggleModal}
                  clearableTxt="انصراف"
                  values={values}
                  clearableDisable={createJahadLetter.isLoading}
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

export { CreateJahadResponseLetter };
