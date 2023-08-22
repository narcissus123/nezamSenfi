import { Form, Formik } from "formik";
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../../core/enums";
import { isPersianAndNumber, showToast } from "../../../../../../../core/utils";

import {
  ModernDatePicker,
  SubmitButton,
  TextArea,
  TextInput,
} from "../../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  positionRequestId: number;
  archiveMutation: any;
  type?: string;
}

const ArchiveRequestModal: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  archiveMutation,
  positionRequestId,
  type,
}) => {
  const validation = Yup.object().shape({
    description: Yup.string()
      .matches(isPersianAndNumber(), "لطفا توضیحات را درست وارد کنید")
      .required("لطفا توضیحات را وارد کنید")
      .typeError("لطفا توضیحات را درست وارد کنید"),
    archiveNumber: Yup.string()
      .required("لطفا شماره آرشیو را وارد کنید")
      .typeError("لطفا شماره آرشیو را درست وارد کنید"),
    indicatorDate: Yup.string().required(" تاریخ نباید خالی باشد"),
  });

  const onSubmit = (values: any) => {
    const archiveObject = {
      description: values.description,
      positionRequestId: positionRequestId,
      archiveNumber: values.archiveNumber,
      indicatorDate: values.indicatorDate,
    };

    archiveMutation.mutate(archiveObject);
  };

  const history = useHistory();

  useEffect(() => {
    if (archiveMutation.isSuccess) {
      showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
      if (type === "Province") {
        history.push("/ManageCartable/ProvinceJobRequestCartable");
      } else if (type === "MainLocation") {
        history.push("/ManageCartable/MainLocationJobRequestCartable");
      } else if (type === "County") {
        history.push("/ManageCartable/CountyJobRequestCartable");
      } else if (type === "Union") {
        history.push("/ManageCartable/UnionJobRequestCartable");
      }
    }
  }, [archiveMutation.isSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>بایگانی درخواست شغل</ModalHeader>
      <Formik
        initialValues={{
          description: "",
          archiveNumber: "",
          indicatorDate: "",
        }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validation}
      >
        {({ values, errors }) => (
          <Form>
            <>
              <ModalBody>
                <TextInput
                  name="archiveNumber"
                  placeholder="شماره آرشیو را وارد کنید"
                  hasLabel
                  lableText="شماره آرشیو"
                  significant
                />
                <ModernDatePicker
                  lableText="تاریخ"
                  name="indicatorDate"
                  placeholder="تاریخ"
                  hasMaximum={false}
                  initialValue={values.indicatorDate}
                  significant
                  forcePosition="bottom"
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
                  isLoading={archiveMutation.isLoading}
                  btnText="تایید"
                  clearable
                  onClear={toggleModal}
                  clearableTxt="انصراف"
                  values={values}
                  clearableDisable={archiveMutation.isLoading}
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

export { ArchiveRequestModal };
