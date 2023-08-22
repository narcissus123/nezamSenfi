import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useAcceptLicenseReqestExpertiseByExpert } from "../../../../../../../core/services/api";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { showToast } from "../../../../../../../core/utils";
import { validationConfirmModal, validationConfirmModalAfterVisit } from "../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton, TextArea } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  acceptMutation: any;
  refetch: any;
  isSecondCheck?: boolean;
  isFromAfterVisit? :boolean
}

const initialValue = {
  describe: "",
};

const ExpertCheckLicenseConfirmModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  acceptMutation,
  refetch,
  isSecondCheck = false,
  isFromAfterVisit,
}) => {
  const [state, setState] = useState(initialValue);
  const history = useHistory();
  const location = useLocation();

  const carSupply = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "با کارشناس" },
        { value: 2, label: "با بهره بردار" },
      ],
    },
  ];

  let { id } = useParams<any>();

  const confirmMutation = acceptMutation();

  const onSubmit = (value: any) => {
    const confirmData: any = {
      licenseRequestId: +id,
      description: value.describe,
    };

    if(isFromAfterVisit) {
      confirmData.carSupply = value.CarSupply.value
    }
    
    confirmMutation.mutate(confirmData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        if (isSecondCheck) {
          history.push("/License/SetPrimaryInfo/Issued/" + id);
        } else refetch();
        toggleModal();
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
            validationSchema={
              isFromAfterVisit
                ? validationConfirmModalAfterVisit
                : validationConfirmModal
            }
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

                  {isFromAfterVisit && (
                    <BasicSelectOption
                      data={carSupply}
                      name="CarSupply"
                      lableText="تامین خودرو"
                      significant
                      placeHolder="یک گزینه را انتخاب کنید"
                    />
                  )}
                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={confirmMutation.isLoading}
                      btnText="تایید"
                      clearable
                      clearableDisable={confirmMutation.isLoading}
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

export { ExpertCheckLicenseConfirmModal };
