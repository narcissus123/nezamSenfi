import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { showToast } from "../../../../../../../../core/utils";

import { SubmitButton, TextArea } from "../../../../../../../common/Form";
import { validationRejectModal } from "../../../../../../../../core/validations/secretariat-check-job.validation";


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  mutation?: any;
  isManagerCartable?: boolean;
  type?: string;
  rejectMutation:any
}

const initialValue = {
  rejectReasons: { value: 0, label: "انتخاب کنید" },
  describe: "",
};

const UpManagerCheckJobRejectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  mutation,
  isManagerCartable = false,
  type,
  rejectMutation: UpManagerRejectMutation
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();

  let { id } = useParams<any>();

  const rejectMutation = UpManagerRejectMutation();

  const onSubmit = (value: any) => {
    const rejectData = {
      positionRequestId: id,
      description: value.describe,
    };

    rejectMutation.mutate(rejectData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        if (type === "Union") {
          history.push("/ManageCartable/UnionUpManagerJobRequestCartable");
        } else if (type === "County") {
          history.push("/ManageCartable/CountyUpManagerJobRequestCartable");
        } else if (type === "Province") {
          history.push("/ManageCartable/ProvinceUpManagerJobRequestCartable");
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
                        rejectMutation.isLoading
                      }
                      btnText="تایید"
                      clearable
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

export { UpManagerCheckJobRejectModal };
