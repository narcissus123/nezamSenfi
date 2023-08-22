import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { showToast } from "../../../../../../../core/utils";
import { validationRejectModalWithNo } from "../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton, TextArea } from "../../../../../../common/Form";


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  rejectMutation: any;
  refetch: any;
}

const initialValue = {
  describe: "",
  reason: null,
};

const RejectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  rejectMutation,
  refetch,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();

  let { id: req_id } = useParams<any>();

  const rejectMutate = rejectMutation();

  const onSubmit = (value: any) => {
    const rejectData = {
      licenseRequestId: +req_id,
      description: value.describe
    };
    rejectMutate.mutate(rejectData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        history.push("/ManageLicense/IssuingResponsible/MyCartable");
        toggleModal()
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
            validationSchema={validationRejectModalWithNo}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  {/* <BasicSelectOption
                    name="reason"
                    placeHolder="دلیل رد را انتخاب کنید..."
                    data={[]}
                    lableText="دلیل رد"
                    significant
                  /> */}
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    placeholder="توضیحات"
                    significant
                  />
                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={rejectMutate.isLoading}
                      btnText="رد"
                      clearable
                      clearableDisable={rejectMutate.isLoading}
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

export { RejectModal };
