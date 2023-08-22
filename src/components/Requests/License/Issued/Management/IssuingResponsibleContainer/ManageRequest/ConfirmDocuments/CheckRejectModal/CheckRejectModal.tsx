import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  FullOption,
  FullOptionSel,
  OptionRow,
} from "../../../../../../../../../core/models";
import {
  useGetSelcetOptionOfEnum,
  useRejectAllDocumentByIssuingResponsible,
} from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { validationRejectModalWithTypeReason } from "../../../../../../../../../core/validations/secretariat-check-job.validation";
import { TextArea } from "../../../../../../../../common/Form/InputComponents/TextArea/TextArea";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
}

const CheckRejectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
}) => {
  const [state, setState] = useState({ type: null, describe: "" });
  const history = useHistory();
  const [typeReason, setTypeReason] = useState<FullOptionSel[]>([]);

  let { id } = useParams<any>();

  const rejectMutate = useRejectAllDocumentByIssuingResponsible();
  const getTypeEnum = useGetSelcetOptionOfEnum();

  useEffect(() => {
    getTypeEnum.mutate("LicenseRejectMatchingReasonTypeEnum", {
      onSuccess: (val) => {
        const result = val.data.result;
        let type: FullOptionSel[] = [
          {
            label: "لطفا یک گزینه انتخاب کنید",
            options: [],
          },
        ];
        if (result) {
          result.forEach((item: OptionRow) => {
            type[0].options.push({ value: +item.id, label: item.title });
          });

          setTypeReason(type);
        }
      },
    });
  }, []);

  const onSubmit = (value: any) => {
    const rejectData = {
      licenseRequestId: +id,
      description: value.describe,
      type: value.type.value,
    };
    rejectMutate.mutate(rejectData, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push("/ManageLicense/IssuingResponsible/MyCartable");
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
        <ModalHeader toggle={toggleModal}>رد اسناد</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={state}
            validationSchema={validationRejectModalWithTypeReason}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <BasicSelectOption
                    data={typeReason}
                    name="type"
                    lableText="دلیل رد"
                    isLoading={getTypeEnum.isLoading}
                    hasLabel
                    placeHolder="یک گزینه انتخاب کنید"
                    significant
                  />
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    significant
                    placeholder="توضیحات"
                  />
                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={rejectMutate.isLoading}
                      btnText="تایید"
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

export { CheckRejectModal };
