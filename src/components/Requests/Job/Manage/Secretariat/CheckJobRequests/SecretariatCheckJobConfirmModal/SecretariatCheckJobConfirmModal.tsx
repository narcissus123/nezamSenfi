import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { TextArea } from "../../../../../../common/Form/InputComponents/TextArea/TextArea";
import { validationConfirmModal } from "../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton } from "../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import {
  usePostInvestigateAndAcceptByManager,
  usePostInvestigateAndAcceptBySecretriat,
} from "../../../../../../../core/services/api";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { IsIncludes, showToast } from "../../../../../../../core/utils";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  mutation?: any;
  isManagerCartable?: boolean;
  type?: string;
}

const initialValue = {
  describe: "",
};

const SecretariatCheckJobConfirmModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  mutation,
  type,
  isManagerCartable = false,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();
  const location = useLocation();

  let { id } = useParams<any>();

  const confirmMutation = usePostInvestigateAndAcceptBySecretriat();
  const confirmByManager = usePostInvestigateAndAcceptByManager();

  const onSubmit = (value: any) => {
    const confirmData = {
      positionRequestId: +id,
      description: value.describe,
    };

    if (isManagerCartable) {
      confirmByManager.mutate(confirmData, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد"], "success");
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
            history.push(
              "/ManageCartable/MainLocationExecutiveManagerCartable"
            );
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
          }
          else if (
            IsIncludes(
              location.pathname,
              "/ManageRequests/ViceManagerJobRequestslist/County/"
            )
          ) {
            history.push("/ManageCartable/CountyViceManagerCartable");
          }
          else if (
            IsIncludes(
              location.pathname,
              "/ManageRequests/ViceManagerJobRequestslist/MainLocation/"
            )
          ) {
            history.push("/ManageCartable/MainLocationViceManagerCartable");
          }
          else if (
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
        },
      });
    } else
      confirmMutation.mutate(confirmData, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد"], "success");
          if (type === "Union") {
            history.push("/ManageCartable/UnionJobRequestCartable");
          } else if (type === "County") {
            history.push("/ManageCartable/CountyJobRequestCartable");
          } else if (type === "Province") {
            history.push("/ManageCartable/ProvinceJobRequestCartable");
          } else if (type === "MainLocation") {
            history.push("/ManageCartable/MainLocationJobRequestCartable");
          }
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
            validationSchema={validationConfirmModal}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    placeholder="توضیحات"
                  />

                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={
                        confirmMutation.isLoading || confirmByManager.isLoading
                      }
                      btnText="تایید"
                      clearable
                      clearableDisable={
                        confirmMutation.isLoading || confirmByManager.isLoading
                      }
                      clearableTxt="انصراف"
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

export { SecretariatCheckJobConfirmModal };
