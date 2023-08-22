import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { TextArea } from "../../../../../../common/Form/InputComponents/TextArea/TextArea";
import { SubmitButton } from "../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { validationRejectModal } from "../../../../../../../core/validations/secretariat-check-job.validation";
import { useHistory, useParams } from "react-router-dom";
import {
  usePostRejectBySecretriat,
  usePostRejectByManager,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";

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
  rejectReasons: { value: 0, label: "انتخاب کنید" },
  describe: "",
};

const SecretariatCheckJobRejectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  mutation,
  isManagerCartable = false,
  type,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();

  let { id } = useParams<any>();

  const rejectMutation = usePostRejectBySecretriat();
  const regectByManager = usePostRejectByManager();

  const onSubmit = (value: any) => {
    const rejectData = {
      positionRequestId: id,
      description: value.describe,
    };

    if (isManagerCartable) {
      regectByManager.mutate(rejectData, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد"], "success");
          if (type === "Province") {
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
      rejectMutation.mutate(rejectData, {
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
            validationSchema={validationRejectModal}
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
                        rejectMutation.isLoading || regectByManager.isLoading
                      }
                      btnText="تایید"
                      clearable
                      clearableDisable={
                        rejectMutation.isLoading || regectByManager.isLoading
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

export { SecretariatCheckJobRejectModal };
