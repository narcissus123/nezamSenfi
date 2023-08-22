import { Form, Formik } from "formik";
import React, { FC, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../../core/enums";
import { IsIncludes, isPersianAndNumber, showToast } from "../../../../../../../core/utils";

import { SubmitButton, TextArea } from "../../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  positionRequestId: number;
  statusTitle: string;
  confirmMutation: any;
  type?: string;
}

const ConfirmPaymentModal: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  statusTitle,
  positionRequestId,
  confirmMutation,
  type,
}) => {
  const validation = Yup.object().shape({
    description: Yup.string()
      .matches(isPersianAndNumber(), "لطفا توضیحات را درست وارد کنید")
      .required("لطفا توضیحات را وارد کنید")
      .typeError("لطفا توضیحات را درست وارد کنید"),
  });

  const onSubmit = (values: any) => {
    const archiveObject = {
      description: values.description,
      positionRequestId: positionRequestId,
    };

    confirmMutation.mutate(archiveObject);
  };

  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    if (confirmMutation.isSuccess) {
      showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
      // executive
      if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ExecutiveManagerJobRequestslist/Province/"
        )
      ) {
        history.push("/ManageCartable/ProvinceExecutiveManagerCartable");
      } else if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ExecutiveManagerJobRequestslist/MainLocation/"
        )
      ) {
        history.push("/ManageCartable/MainLocationExecutiveManagerCartable");
      } else if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ExecutiveManagerJobRequestslist/County/"
        )
      ) {
        history.push("/ManageCartable/CountyExecutiveManagerCartable");
      } else if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ExecutiveManagerJobRequestslist/Union/"
        )
      ) {
        history.push("/ManageCartable/UnionExecutiveManagerCartable");
      }
      // vice
      else if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ViceManagerJobRequestslist/Province/"
        )
      ) {
        history.push("/ManageCartable/ProvinceViceManagerCartable");
      } else if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ViceManagerJobRequestslist/County/"
        )
      ) {
        history.push("/ManageCartable/CountyViceManagerCartable");
      } else if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ViceManagerJobRequestslist/MainLocation/"
        )
      ) {
        history.push("/ManageCartable/MainLocationViceManagerCartable");
      } else if (
        IsIncludes(
          location.pathname,
          "/ManageRequests/ViceManagerJobRequestslist/Union/"
        )
      ) {
        history.push("/ManageCartable/UnionViceManagerCartable");
      }
      // manager
      else if (type === "Province") {
        history.push("/ManageCartable/ProvinceManagerCartable");
      } else if (type === "MainLocation") {
        history.push("/ManageCartable/MainLocationManagerCartable");
      } else if (type === "County") {
        history.push("/ManageCartable/CountyManagerCartable");
      } else if (type === "Union") {
        history.push("/ManageCartable/UnionManagerCartable");
      }
    }
  }, [confirmMutation.isSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>{statusTitle} تراکنش</ModalHeader>
      <Formik
        initialValues={{ description: "" }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validation}
      >
        {({ values, errors }) => (
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
                  isLoading={confirmMutation.isLoading}
                  btnText={statusTitle + " تراکنش"}
                  clearable
                  onClear={toggleModal}
                  clearableDisable={confirmMutation.isLoading}
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

export { ConfirmPaymentModal };
