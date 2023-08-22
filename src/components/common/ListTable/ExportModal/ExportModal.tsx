import { Form, Formik } from "formik";
import React, { FC } from "react";
import {
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { SubmitButton, TextInput } from "../../Form";
import * as Yup from "yup";
import BasicSelectOption from "../../Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  handleExport: (fileName: string, fileFormat: any) => void;
  exportPDF: (fileName: string) => void;
}

const ExportModal: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  handleExport,
  exportPDF,
}) => {
  const validate = Yup.object().shape({
    name: Yup.string()
      .required("نام فایل را وارد کنید")
      .typeError("نام فایل را وارد کنید"),
    fileType: Yup.object()
      .test(
        "filterType",
        "یک گزینه را انتخاب کنید",
        (val: any) => val && val.value > 0
      )
      .required("یک گزینه را انتخاب کنید")
      .typeError("یک گزینه را انتخاب کنید"),
  });

  const fileTypeOption = [
    {
      label: "انتخاب کنید",
      options: [
        { value: 1, label: "خروجی اکسل" },
        { value: 2, label: "خروجی pdf" },
      ],
    },
  ];

  const onSubmit = (value: any) => {
    value.fileType.value === 1
      ? handleExport(value.name, "csv")
      : exportPDF(value.name);
    toggleModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>دریافت فایل لیست</ModalHeader>

      <Formik
        initialValues={{ name: "", fileType: null }}
        onSubmit={onSubmit}
        validationSchema={validate}
      >
        {({ values }) => (
          <Form>
            <ModalBody>
              <FormGroup>
                <TextInput
                  name="name"
                  placeholder="نام فایل را وارد کنید"
                  hasLabel
                  lableText="نام فایل"
                  significant
                />
              </FormGroup>
              <FormGroup>
                <BasicSelectOption
                  data={fileTypeOption}
                  name="fileType"
                  hasLabel
                  lableText="نوع فایل"
                  placeHolder="انتخاب نوع فایل..."
                  significant
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter className="d-flex justify-content-start">
              <SubmitButton
                isLoading={false}
                btnText="دریافت فایل"
                clearable
                clearableTxt="انصراف"
                onClear={toggleModal}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { ExportModal };
