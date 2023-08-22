import { Formik } from "formik";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { DropZone } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form";
import { FullOptionSel } from "../../../../../core/models";
import * as Yup from "yup";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  accept?: string;
  data: any;
  setFieldValue: any;
  onSubmit?: (val: any) => void;
}

const SelectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  accept,
  setFieldValue,
  data,
  onSubmit: onWrapperSubmit,
}) => {
  const validate = Yup.object().shape({
    file: Yup.array()
      .required("لطفا فایل را انتخاب کنید")
      .test("file", "لطفا یک فایل بارگذاری کنید", (value: any) => value)
      .typeError("فایل انتخاب شده درست نیست"),
    userMachineFileTypeEnum: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  });

  const userMachineFileTypeEnum: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "سند ماشین" },
        { value: 2, label: "کارت ماشین" },
        { value: 3, label: "بیمه نامه" },
        { value: 4, label: "بیمه بدنه" },
      ],
    },
  ];

  const onSubmit = (values: {
    file: File | null;
    userMachineFileTypeEnum: FullOptionSel | null;
  }) => {
    const newData = [];
    if (data) data.forEach((it: any) => newData.push(it));
    newData.push(values);
    setFieldValue(newData);

    toggleModal();
    onWrapperSubmit && onWrapperSubmit(newData);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>انتخاب سند</ModalHeader>

        <Formik
          initialValues={{ file: null, userMachineFileTypeEnum: null }}
          onSubmit={onSubmit}
          validationSchema={validate}
        >
          {({ setFieldValue, submitForm }) => (
            <>
              <ModalBody>
                <BasicSelectOption
                  data={userMachineFileTypeEnum}
                  name="userMachineFileTypeEnum"
                  lableText="نوع سند"
                  onChange={(opt) =>
                    setFieldValue("userMachineFileTypeEnum", opt)
                  }
                  placeHolder="انتخاب کنید..."
                  significant
                />
                <DropZone
                  isSingle
                  lableText="اصل سند"
                  significant
                  name="file"
                  placeholder="اسناد را بکشید و اینجا رها کنید"
                  accept={accept}
                />
              </ModalBody>
              <ModalFooter className="d-flex justify-content-start">
                <SubmitButton
                  isLoading={false}
                  btnText="ثبت"
                  onClick={submitForm}
                  //schema={validate}
                />
              </ModalFooter>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export { SelectModal };
